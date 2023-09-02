import React, { useState } from "react";
import server from "../Server";

export function AddReader() {
  const [gateType, setReaderType] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [gateName, setReaderName] = useState("");
  const [gateStatus, setReaderStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleReaderTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReaderType(event.target.value);
  };

  const handleSerialNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSerialNumber(event.target.value);
  }

  const handleReaderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReaderName(event.target.value);
  }

  const handleReaderStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReaderStatus(event.target.value);
  };

  const handleCreatedByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedBy(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await server.post("/addReader", {
        gateType: gateType,
        serialNumber: serialNumber,
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
      <h1>AddReader PAGE</h1>
      <div>
        <label>Reader Type:</label>
        <input type="text" value={gateType} onChange={handleReaderTypeChange} />
      </div>
      <div>
        <label>Reader Serial Number:</label>
        <input type="text" value={serialNumber} onChange={handleSerialNumberChange} />
      </div>
      <div>
        <label>Reader Name:</label>
        <input type="text" value={gateName} onChange={handleReaderNameChange} />
      </div>
      <div>
        <label>Reader Status:</label>
        <input
          type="text"
          value={gateStatus}
          onChange={handleReaderStatusChange}
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