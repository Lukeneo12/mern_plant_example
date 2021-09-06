import React, { Component } from "react";

import axios from "axios";

export default class PlantCreation extends Component {
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
      plantDescription: ""
    };
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

    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newPlant = {
      name: this.state.plantName,
      type: this.state.plantType,
      description: this.state.plantDescription,
    };

    axios
      .post(
        "",
        newPlant
      )
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/")
      });

    // We will empty the state after posting the data to the database
    this.setState({
      plantName: "",
      plantType: "",
      plantDescription: "",
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3 align="center">Create New Record</h3>
        <form align="center" onSubmit={this.onSubmit}>
          <div className="form-group" align="center">
            <label>Plant name</label>
            <input
              type="text"
              className="form-control"
              style={{width: "200px", "text-align": "center"}}
              value={this.state.plantName}
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
            <div style={{marginLeft: "10px"}}className="form-check form-check-inline">
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
          <div className="form-group">
            <input
              type="submit"
              value="Create plant"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    );
  }
}
