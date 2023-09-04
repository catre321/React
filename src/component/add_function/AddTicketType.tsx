import React, { useState } from "react";
import server from "../../Server";

export function AddTicketType() {
  const [ticketTypeName, setTicketTypeName] = useState("");
  const [ticketTypeStatus, setTicketTypeStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleTicketTypeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicketTypeName(event.target.value);
  };

  const handleTicketTypeStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicketTypeStatus(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  }

  const handleCreatedByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedBy(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const cleanedDuration = duration.replace(/\s/g, '');
      const response = await server.post("/addTicketType", {
        ticketTypeName: ticketTypeName,
        ticketTypeStatus: ticketTypeStatus,
        duration: cleanedDuration,
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
      <h1>AddTicketType PAGE</h1>
      <div>
        <label>TicketType name:</label>
        <input type="text" value={ticketTypeName} onChange={handleTicketTypeNameChange} />
      </div>
      <div>
        <label>TicketType Status:</label>
        <input
          type="text"
          value={ticketTypeStatus}
          onChange={handleTicketTypeStatusChange}
        />
      </div>
      <div>
        <label>TicketType Duration: (PT12H)</label>
        <input
          type="text"
          value={duration}
          onChange={handleDurationChange}
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