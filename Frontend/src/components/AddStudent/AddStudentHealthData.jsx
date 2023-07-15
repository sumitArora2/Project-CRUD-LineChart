import React, { Component } from "react";
import './AddStudent.css';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddStudentHealthData extends Component {
  state = {
    customerId: "",
    date: "",
    steps: "",
    customerData:[],
    response: ""
  };

  async componentDidMount() {
    try {
      const customers = await axios("/api/customers/");
      this.setState({ customerData: customers.data.customers });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  addStudent = async e => {
    e.preventDefault();
    try {
      const newStudent = await axios.post("/api/customers/health", {
          customerId: this.state.customerId,
          date: this.state.date,
          steps: this.state.steps
        }
      );

      toast("Customer " + newStudent.data.newCustomer.customerId + " created successfully" ,{ type: toast.TYPE.SUCCESS, autoClose: 3000 });
    } catch (err) {
      toast(err.message ,{ type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    return (
      <div className="AddStudent-Wrapper">
        <h1>Add Customer Health Data:</h1>
        <form onSubmit={this.addStudent}>
          <label htmlFor="customerId">Customer Id:</label>
          <br></br>
          <select className="Add-Student-Input" onChange={this.onChangeHandler} name="customerId">
            {this.state?.customerData.length > 0 && this.state?.customerData.map((item)=>(
            <option value={item._id}>{item.firstName}</option>
            ))}
          </select>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            placeholder="enter your date here"
            name="date"
            onChange={this.onChangeHandler}
            ref="date"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            className="Add-Student-Input"
            required
            id="date"
          />
          <label htmlFor="steps">Steps: </label>
          <input
            type="number"
            placeholder="0 to 120"
            name="steps"
            onChange={this.onChangeHandler}
            ref="steps"
            className="Add-Student-Input"
            required
            id="steps"
          />
          <button type="submit" className="Add-Student-Submit fa fa-plus"></button>
          <button type="reset" className="Add-Student-Reset fa fa-refresh"></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default AddStudentHealthData;
