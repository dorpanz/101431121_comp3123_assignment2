import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';  

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const toLogin = () =>{
        navigate("/");
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

    try {
        const response = await axios.post("http://localhost:5000/api/v1/user/login", formData);
        setLoading(false);
        setMessage("Login successful!");
        localStorage.setItem("authToken", response.data.token);
        navigate("/employees");
    } catch (error) {
        setLoading(false);
        setMessage(error.response?.data?.message || "An error occurred while logging in.");
        }
    };

    return (
        <div className="container_login">
        <h2>Login</h2>
        {message && <p>{message}</p>}
        <form className="login_input" onSubmit={handleSubmit}>
            <div className="input_field">
                <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className="input_field">
                <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={8} />
            </div>
            <button type="submit" disabled={loading} className="login_button">
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
        <div className="register_prompt">
                <p  className="register_button" onClick={toLogin}>Do not have an account? Register now</p>
            </div>
    </div>
    );
};

export default Login;
