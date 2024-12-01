import { useState } from "react";
import axios from "axios";
import './Login.css';
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 
        navigate("/login");
        try {
            const res = await axios.post('http://localhost:5000/api/v1/user/signup', { username, email, password });
            console.log('User registered:', res.data);
        } catch (error) {
            console.error('Error registering user:', error.response?.data?.message || error.message);
            setErrorMessage(error.response?.data?.message || "Registration failed!"); 
        }
    };

    const toLogin = () =>{
        navigate("/login");
    }

    return (
        <div className="container_login">
            <h2>Register</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <form className="login_input" onSubmit={handleSubmit}>
                <div className="input_field">
                    <label>Enter your Username:</label>
                    <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} required
                    />
                </div>

                <div className="input_field">
                    <label>Enter your Email:</label>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required
                    />
                </div>
                <div className="input_field">
                    <label>Enter your Password:</label>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required minLength={8}
                    />
                </div>
                <button type="submit" className="login_button">SIGN UP</button>
            </form>

            <div className="register_prompt">
                <p className="register_button" onClick={toLogin}>Have an account? Login now</p>
            </div>
        </div>
    );
};
