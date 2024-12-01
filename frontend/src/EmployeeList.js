import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeList.css";

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [department, setDepartment] = useState("");

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/emp/employees");
            setEmployees(response.data);
        } catch (err) {
            setError("Error fetching employees");
        }
    };

    const fetchFilteredEmployees = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/search`, {
                params: { department },
            });
            setEmployees(response.data);
        } catch (err) {
            setError("Error fetching filtered employees");
        }
    };

    const handleSearch = () => {
        if (department.trim() === "") {
            fetchEmployees();
        } else {
            fetchFilteredEmployees();
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const deleteEmployee = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`);
                setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id));
            } catch (err) {
                alert("Error deleting employee");
            }
        }
    };


    return (
        <div className="employee-container">
            <div className="header-container">
                <h1>Employee Management</h1>
                <button className="add-employee-button" onClick={() => navigate("/employees/add")}>
                    Add Employee
                </button>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee._id}</td>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                            <td>{employee.position}</td>
                            <td>{employee.salary.toFixed(2)}</td>
                            <td>
                                <button 
                                    className="view-button" 
                                    onClick={() => navigate(`/employees/view`, { state: { employee } })}
                                >
                                    View
                                </button>
                                <button 
                                    className="update-button" 
                                    onClick={() => navigate(`/employees/update`, { state: { employee } })}
                                >
                                    Update
                                </button>
                                <button 
                                    className="delete-button" 
                                    onClick={() => deleteEmployee(employee._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};