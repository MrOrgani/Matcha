import React, { Component } from "react";
import FormComponent from "./FormComponent";
import Noeuds from "./Noeuds";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      destination: "",
      isVegan: false,
      isKosher: false,
      isLactoseFree: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({
          [name]: checked
        })
      : this.setState({
          [name]: value
        });
  }

  render() {
    return (
      <div>
        <FormComponent handleChange={this.handleChange} data={this.state} />
        <Noeuds />
      </div>
    );
  }
}

export default Form;
