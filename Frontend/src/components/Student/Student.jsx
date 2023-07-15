import React from 'react';
import './Student.css';
import { Link } from 'react-router-dom';

const Student = ({ _id, firstName,lastName, email,mobile,sleep, steps,dob,calories, removeStudent }) => {

  return(
    <tr>
      <td>{ firstName }</td>
      <td>{ lastName }</td>
      <td>{ email }</td>
      <td>{ mobile }</td>
      <td>{ dob }</td>
      <td>{ calories }</td>
      <td>{ sleep }</td>
      <td>{ steps }</td>
      <td>
        <button onClick={ () => removeStudent(_id) } className="Action-Button fa fa-trash"></button>
        <Link to={{ pathname: '/edit', search: _id }}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>

    </tr>
  );
};

export default Student;
