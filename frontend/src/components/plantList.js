import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Plant = (props) => (
  <tr>
    <td>{props.plant.name}</td>
    <td>{props.plant.type}</td>
    <td>{props.plant.description}</td>
    <td>
      <button className="btn btn-primary"><Link style={{color: "white", "textDecoration": "none"}}to={"/edit/" + props.plant.id}>Edit</Link></button>
      <button className="btn btn-danger" style={{ "marginLeft": "2px"}}
        onClick={() => {
          props.deletePlant(props.plant.id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class PlantList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deletePlant = this.deletePlant.bind(this);
    this.state = { plants: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    this.getPlants();
  }

  getPlants() {
    axios
      .get("")
      .then((response) => {
        this.setState({ plants: response.data.plants });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // This method will delete a record based on the method
  deletePlant(id) {
    console.log('DELETE');
    axios.delete("" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      plants: this.state.plants.filter((el) => el.id !== id),
    });
  }

  // This method will map out the users on the table
  plantsList() {
    return this.state.plants.map((plant) => {
      return (
        <Plant
          plant={plant}
          deletePlant={this.deletePlant}
          key={plant.id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div>
        <h3 style={{marginTop: "10px"}}align="center">My plants</h3>
        <table className="table table-striped dark" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.plantsList()}</tbody>
        </table>
      </div>
    );
  }
}