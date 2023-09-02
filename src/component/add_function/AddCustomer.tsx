import React, { useState } from "react";
import server from "../Server";

export function AddCustomer() {
  const [customerName, setCustomerName] = useState("");
  const [customerStatus, setCustomerStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCustomerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(event.target.value);
  };

  const handleCustomertatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerStatus(event.target.value);
  };

  const handleCreatedByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedBy(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await server.post("/addCustomer", {
        customerName: customerName,
        customerStatus: customerStatus,
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
      <h1>AddCustomer PAGE</h1>
      <div>
        <label>Customer name:</label>
        <input type="text" value={customerName} onChange={handleCustomerNameChange} />
      </div>
      <div>
        <label>Customer Status:</label>
        <input
          type="text"
          value={customerStatus}
          onChange={handleCustomertatusChange}
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
