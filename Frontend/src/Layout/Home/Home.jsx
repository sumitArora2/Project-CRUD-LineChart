import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Student from "../../components/Student/Student";
import SearchStudents from "../../components/SearchStudent/SearchStudents";

class Home extends Component {
  state = {
    data: null,
    allStudents: null,
    error: ""
  };

  async componentDidMount() {
    try {
      const customers = await axios("/api/customers/");
      this.setState({ data: customers.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeStudent = async id => {
    try {
      const studentRemoved = await axios.delete(`/api/customers/${id}`);
      const students = await axios("/api/customers/");
      this.setState({ data: students.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchStudents = async username => {
    let allStudents = [...this.state.data.students];
    if (this.state.allStudents === null) this.setState({ allStudents });

    let students = this.state.data.students.filter(({ name }) =>
      name.toLowerCase().includes(username.toLowerCase())
    );
    if (students.length > 0) this.setState({ data: { students } });

    if (username.trim() === "")
      this.setState({ data: { students: this.state.allStudents } });
  };

  render() {
    let customers;

    if (this.state.data)
      customers =
        this.state.data.customers &&
        this.state.data.customers.map(student => (
          <Student key={student._id} {...student} removeStudent={this.removeStudent} />
        ));
    else return <div className="Spinner-Wrapper"> <PropagateLoader color={'#333'} /> </div>;

    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.customers.length)
        return <h1 className="No-Customers">No customers!</h1>;

    return (
      <div className="Table-Wrapper">
        <h1>Customers:</h1>
        <SearchStudents searchStudents={this.searchStudents} />
        <table className="Table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>Calories</th>
              <th>Sleep</th>
              <th>Steps</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{customers}</tbody>
        </table>
      </div>
    );
  }
}

export default Home;
