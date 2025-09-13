import React from "react";
import "./workerLogin.css";

export default function WorkerLogin({ value, onChange, onSubmit }) {
    return (
        <>
            <div className="passwordContainer">
                <div className="Header">
                    <h1>Enter your 10-digit id</h1>
                </div>
                <div className="inputContainer">
                    <input
                        type="text"
                        className="inputField"
                        placeholder="10-digit-Id"
                        value={value}
                        onChange={e => onChange(e.target.value)}
                    />
                </div>
                <div className="buttonContainer">
                    <button className="submitButton" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
}
