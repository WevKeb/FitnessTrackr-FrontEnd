import React from "react";
import { useState } from "react";
import "./RegisterUser.css";

import { registerUser } from "../api/auth";

const Register = ({setToken}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAuth, setPasswordAuth] = useState("");
    const [passwordError, setPasswordError] = useState("");

    return (
        <div className="register-bar">
            <h2>Please register below to create your account!</h2>
            <form
                className="register-form"
                onSubmit={async (e) => {
                if (password.length > 7) {
                    try {
                        if (password === passwordAuth) {
                            e.preventDefault();
                            console.log(password, username);
                            const token = await registerUser(username, password);
                            if (token) {
                            setToken(token);
                            console.log(token);
                            localStorage.setItem("token", token);
                            setUsername("");
                            setPassword("");
                            setPasswordAuth("");
                            setPasswordError("");
                            } else {
                                e.preventDefault();
                                setPasswordError("Error: Username already exists.")
                            }
                        } else {
                            e.preventDefault();
                            setPasswordError("Error: Passwords do not match.")
                        }
                    }   catch(error)   {
                        console.error()
                    }} else {
                        e.preventDefault();
                        setPasswordError("Error: Password must be at least 8 characters.")
                    }
               }}
            >
                <label htmlFor="username">New Username: </label>
                <input 
                  value={username}
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                ></input>

                <label htmlFor="password">New Password: </label>
                <input 
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>

                <label htmlFor="password">Confirm New Password: </label>
                <input 
                  value={passwordAuth}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setPasswordAuth(e.target.value)}
                ></input>

                <button type="submit">Submit</button>
                <div className="passwordError">{passwordError}</div>
            </form>
        </div>
    );
};

export default Register