import React, { Component } from "react";

import axios from 'axios';
import { withRouter } from "react-router";

class PlantEdition extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangePlantName = this.onChangePlantName.bind(this);
    this.onChangePlantType = this.onChangePlantType.bind(this);
    this.onChangePlantDescription = this.onChangePlantDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      plantName: "",
      plantType: "",
      plantDescription: "",
      records: [],
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          plantName: response.data.plant.name,
          plantType: response.data.plant.type,
          plantDescription: response.data.plant.description,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // These methods will update the state properties.
  onChangePlantName(e) {
    this.setState({
      plantName: e.target.value,
    });
  }

  onChangePlantType(e) {
    this.setState({
      plantType: e.target.value,
    });
  }

  onChangePlantDescription(e) {
    this.setState({
      plantDescription: e.target.value,
    });
  }

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const newEditedPlant = {
      name: this.state.plantName,
      type: this.state.plantType,
      description: this.state.plantDescription,
    };
    console.log(newEditedPlant);

    // This will send a post request to update the data in the database.
    axios
      .put(
        "https://vmwjxpvp20.execute-api.us-east-1.amazonaws.com/develop/api/plants/" + this.props.match.params.id,
        newEditedPlant
      )
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/");
      });

  }

  render() {
    return (
      <div>
        <h3 align="center">Update Plant</h3>
        <form align="center" onSubmit={this.onSubmit}>
          <div className="form-group" align="center">
            <label>Plant Name </label>
            <input
              type="text"
              className="form-control"
              value={this.state.plantName}
              style={{width: "200px", "text-align": "center"}}
              onChange={this.onChangePlantName}
            />
          </div>
          <div className="form-group" align="center">
            <label>Plant Description </label>
            <input
              type="text"
              className="form-control"
              style={{width: "200px", "text-align": "center"}}
              value={this.state.plantDescription}
              onChange={this.onChangePlantDescription}
            />
          </div>
          <div className="form-group">
          <label>Plant type </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Jazmin"
                checked={this.state.plantType === "Jazmin"}
                onChange={this.onChangePlantType}
              />
              <label className="form-check-label">Jazmin</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Rosa"
                checked={this.state.plantType === "Rosa"}
                onChange={this.onChangePlantType}
              />
              <label className="form-check-label">Rosa</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="Girasol"
                checked={this.state.plantType === "Girasol"}
                onChange={this.onChangePlantType}
              />
              <label className="form-check-label">Girasol</label>
            </div>
          </div>
          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update plant"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(PlantEdition);