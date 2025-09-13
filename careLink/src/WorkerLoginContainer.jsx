import React, { useState } from "react";
import WorkerLogin from "./workerLogin";

export default function WorkerLoginContainer() {
    const [workerId, setWorkerId] = useState("");
    const [authResult, setAuthResult] = useState(null);
    const [workerDetails, setWorkerDetails] = useState(null);

    const authenticateWorker = async () => {
        setAuthResult(null);
        setWorkerDetails(null);
        try {
            const response = await fetch("http://localhost:5000/api/worker/workerId", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ workerId })
            });

             if (!response.ok) {
                setAuthResult(`Server error: ${response.status} ${response.statusText}`);
                setWorkerDetails(null);
                return;
            }

            const data = await response.json();

            if (data.success) {
                setAuthResult("Authenticated");
                console.log(data);
                setWorkerDetails({
                    name: data.name,
                    age: data.age,                                  
                    phone: data.phone,
                    workerId: data.workerId
                });
            } else {
                setAuthResult("Invalid UID");
            }
        } catch (error) {
            setAuthResult(error.message || "Server error");
        }
    };

    return (
        <>
            <WorkerLogin
                value={workerId}
                onChange={setWorkerId}
                onSubmit={authenticateWorker}
            />
            {authResult && <div>{authResult}</div>}
            {authResult === "Authenticated" && workerDetails && (
                <div>
                    <h1>Name: {workerDetails.name}</h1>
                    <h2>Age: {workerDetails.age}</h2>
                    <h3>Unique ID: {workerDetails.workerId}</h3>
                    <h3>Phone : {workerDetails.phone}</h3>
                </div>
            )}
        </>
    );
}