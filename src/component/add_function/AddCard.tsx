import React, { useState } from "react";
import server from "../../Server";

export function AddCard() {
  const [cardCode, setCardCode] = useState("");
  const [cardStatus, setCardStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCardCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardCode(event.target.value);
  };

  const handleCardStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardStatus(event.target.value);
  };

  const handleCreatedByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedBy(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await server.post("/addCard", {
        cardCode: cardCode,
        cardStatus: cardStatus,
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
      <h1>AddCard PAGE</h1>
      <div>
        <label>Card Code:</label>
        <input type="text" value={cardCode} onChange={handleCardCodeChange} />
      </div>
      <div>
        <label>Card Status:</label>
        <input
          type="text"
          value={cardStatus}
          onChange={handleCardStatusChange}
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
