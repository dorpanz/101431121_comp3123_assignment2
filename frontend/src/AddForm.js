import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./AddForm.css";

const AddForm = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        department: "",
        position: "",
        date_of_joining: "",
        salary: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const dataToSubmit = {
            ...formData,
            department: formData.department || "Not Stated",
            position: formData.position || "Not Stated",
            date_of_joining: formData.date_of_joining || Date.now(),
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/emp/employees",
                dataToSubmit
            );
            setMessage("Employee added successfully!");
            alert("Employee added successfully!");
            navigate("/employees"); 
        } catch (error) {
            setMessage(
                error.response?.data?.message || "An error occurred while adding the employee."
            );
        }
    };

    return (
        <div className="container-add">
            <h3>Add Employee</h3>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" name="first_name" onChange={handleChange} required />

                <label>Last Name:</label>
                <input type="text" name="last_name" onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} required />

                <label>Department:</label>
                <input type="text" name="department" onChange={handleChange} />

                <label>Position:</label>
                <input type="text" name="position" onChange={handleChange} />

                <label>Date of Joining:</label>
                <input type="date" name="date_of_joining" onChange={handleChange} />

                <label>Salary:</label>
                <input type="number" name="salary" onChange={handleChange} required />

                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddForm;
