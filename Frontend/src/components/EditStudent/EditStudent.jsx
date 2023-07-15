import React, { Component } from "react";
import './EditStudent.css';
import axios from "axios";
import { withRouter } from 'react-router'
import {toast, ToastContainer} from "react-toastify";
import LineChart from "../LineChart";

class EditStudent extends Component {
  state = {
    id: '',
    firstName: "",
    lastName:"",
    email: "",
    avg_steps: "",
    mobile:"",
    avg_calories:"",
    goal:"",
    chartData:{},
    response: ""
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    try {
    let search =  this.props.location.search,
      id = search.substring(1, search.length);
    const updateStudent = await axios(`/api/customers/${id}`);
    const { firstName, email, avg_steps,avg_calories,goal,mobile,lastName,dob,avg_sleep } = updateStudent.data.customer;
    let {date_wise_steps}= updateStudent.data;
    let data ={
      labels: date_wise_steps.map((data) => data._id),
      datasets: [
        {
          label: "Users Gained ",
          data: date_wise_steps.map((data) => data.totalSteps),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0"
          ],
          borderColor: "black",
          borderWidth: 2
        }
      ]
    }
    this.setState({ id, firstName, email, avg_steps,avg_calories,goal,mobile,lastName,dob,avg_sleep,
    chartData: data });
    } catch (err) {
      this.setState({ response: "Student not found!" })
    }
  };

  updateStudentHandler = async (e) => {
    e.preventDefault();
    try {
      const student = await axios.put(`/api/customers/${this.state.id}`, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        dob: this.state.dob,
        avg_sleep: this.state.avg_sleep,
        mobile: this.state.mobile,
        email: this.state.email,
        avg_steps: this.state.avg_steps,
        goal: this.state.goal,
        avg_calories:this.state.avg_calories
      });
      toast(student.data.message ,{ type: toast.TYPE.INFO, autoClose: 3000 });

    } catch (err) {
      toast(err.message ,{ type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };
 

  render() {
    if (this.state.response === "Customer not found!")
      return <h1>Customer not found!</h1>
    return (
      <div className="Edit-Student-Wrapper">
        <h1>Edit page</h1>
        <form onSubmit={this.updateStudentHandler}>
        <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            placeholder="Enter the name of the students here"
            name="firstName"
            value={ this.state.firstName }
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
            value={ this.state.lastName }
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
            value={ this.state.mobile }
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
            value={ this.state.email }
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
            value={ this.state.dob }
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
            value={ this.state.avg_steps }
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
            value={ this.state.avg_sleep }
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
            value={ this.state.avg_calories }
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
            value={ this.state.goal }
            onChange={this.onChangeHandler}
            ref="goal"
            className="Add-Student-Input"
            required
            id="goal"
          />
          <button type="submit" className="Edit-Student-Submit fa fa-pencil"></button>
        </form>
        <ToastContainer />
      {Object.keys(this.state.chartData).length > 0  && <LineChart chartData={this.state.chartData} />}
      </div>
    );
  }
}

export default withRouter(EditStudent);
