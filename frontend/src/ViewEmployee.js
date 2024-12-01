import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewEmployee.css";

const ViewEmployee = () => {
    const location = useLocation();
    const employee = location.state?.employee;
    const navigate = useNavigate();

    if (!employee) {
        return <p>No employee data available</p>;
    }

    return (
        <div className="container-view">
            <div>
                <h3>Employee Details</h3>
            </div>
            <p className="info"><strong>ID:</strong> {employee._id}</p>
            <p className="info"><strong>First Name:</strong> {employee.first_name}</p>
            <p className="info"><strong>Last Name:</strong> {employee.last_name}</p>
            <p className="info"><strong>Email:</strong> {employee.email}</p>
            <p className="info"><strong>Department:</strong> {employee.department}</p>
            <p className="info"><strong>Position:</strong> {employee.position}</p>
            <p className="info"><strong>Salary:</strong> {employee.salary.toFixed(2)}</p>
            <p className="info"><strong>Joined:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
            <p className="info"><strong>Employee data created:</strong> {new Date(employee.created_at).toLocaleDateString()}</p>
            <p className="info"><strong>Employee data updated:</strong> {new Date(employee.updated_at).toLocaleDateString()}</p>
        </div>
    );
};

export default ViewEmployee;
