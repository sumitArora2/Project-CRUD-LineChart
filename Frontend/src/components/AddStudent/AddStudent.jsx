import React, { Component } from "react";
import './AddStudent.css';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddStudent extends Component {
  state = {
    name: "",
    email: "",
    steps: "",
    response: ""
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  addStudent = async e => {
    e.preventDefault();
    try {
      const newStudent = await axios.post("/api/customers/", {
          firstName: this.state.firstName,
          lastName:this.state.lastName,
          mobile:this.state.mobile,
          email: this.state.email,
          avg_steps: this.state.avg_steps,
          avg_sleep:this.state.avg_sleep,
          avg_calories:this.state.avg_calories,
          mobile:this.state.mobile,
          dob:this.state.mobile,
          goal:this.state.goal
        }
      );

      toast("Student " + newStudent.data.newCustomer.firstName + " created successfully" ,{ type: toast.TYPE.SUCCESS, autoClose: 3000 });
    } catch (err) {
      toast(err.message ,{ type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    return (
      <div className="AddStudent-Wrapper">
        <h1>Add Customer:</h1>
        <form onSubmit={this.addStudent}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            placeholder="Enter the name of the students here"
            name="firstName"
            onChange={this.onChangeHandler}
            ref="firstName"
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
            id="firstName"
          />
           <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            placeholder="Enter the lastName of the customers here"
            name="lastName"
            onChange={this.onChangeHandler}
            ref="lastName"
            className="Add-Student-Input"
            required
            minLength="3"
            maxLength="33"
            id="lastName"
          />
          <label htmlFor="mobile">Mobile: </label>
          <input
            type="number"
            name="mobile"
            onChange={this.onChangeHandler}
            ref="mobile"
            className="Add-Student-Input"
            required
            id="mobile"
          />
          <label htmlFor="email">Email: <b>(must be a valid email)</b></label>
          <input
            type="text"
            placeholder="enter your email here"
            name="email"
            onChange={this.onChangeHandler}
            ref="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            className="Add-Student-Input"
            required
            id="email"
          />
           <label htmlFor="dob">DOB: </label>
          <input
            type="string"
            name="dob"
            onChange={this.onChangeHandler}
            ref="dob"
            className="Add-Student-Input"
            required
            id="dob"
          />
          <label htmlFor="avg_steps">Avg Steps: </label>
          <input
            type="number"
            name="avg_steps"
            onChange={this.onChangeHandler}
            ref="avg_steps"
            className="Add-Student-Input"
            required
            id="avg_steps"
          />
           <label htmlFor="avg_sleep">Avg Sleep: </label>
          <input
            type="number"
            name="avg_sleep"
            onChange={this.onChangeHandler}
            ref="avg_sleep"
            className="Add-Student-Input"
            required
            id="avg_sleep"
          />
           <label htmlFor="avg_calories">Avg Calories: </label>
          <input
            type="number"
            name="avg_calories"
            onChange={this.onChangeHandler}
            ref="avg_calories"
            className="Add-Student-Input"
            required
            id="avg_calories"
          />
           <label htmlFor="goal">Goal: </label>
          <input
            type="number"
            name="goal"
            onChange={this.onChangeHandler}
            ref="goal"
            className="Add-Student-Input"
            required
            id="goal"
          />
          <button type="submit" className="Add-Student-Submit fa fa-plus"></button>
          <button type="reset" className="Add-Student-Reset fa fa-refresh"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default AddStudent;
