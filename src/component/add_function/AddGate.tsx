import React, { useState } from "react";
import server from "../../Server";

export function AddGate() {
  const [gateName, setGateName] = useState("");
  const [gateStatus, setGateStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleGateNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGateName(event.target.value);
  };

  const handleGatetatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGateStatus(event.target.value);
  };

  const handleCreatedByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedBy(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await server.post("/addGate", {
        gateName: gateName,
        gateStatus: gateStatus,
        createdBy: createdBy,
      });

      // Set the response message from the backend
      setResponseMessage(response.data);
    } catch (error) {
      // Handle error
      setResponseMessage("Error sending data");
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <h1>AddGate PAGE</h1>
      <div>
        <label>Gate name:</label>
        <input type="text" value={gateName} onChange={handleGateNameChange} />
      </div>
      <div>
        <label>Gate Status:</label>
        <input
          type="text"
          value={gateStatus}
          onChange={handleGatetatusChange}
        />
      </div>
      <div>
        <label>Created By:</label>
        <input type="text" value={createdBy} onChange={handleCreatedByChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <p>{responseMessage}</p>
    </div>
  );
}