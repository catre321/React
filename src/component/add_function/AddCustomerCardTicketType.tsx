import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { TicketType } from "../../Interface";
import server from "../../Server";

export function AddCustomerCardTicketType(){
  const [customerName, setCustomerName] = useState<string | undefined>();
  const [customerCardCode, setCustomerCardCode] = useState<string | undefined>();
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [selectedTicketType, setSelectedTicketType] = useState<number | undefined>();
  const [customerTicketTypeName, setCustomerTicketTypeName] = useState<string | undefined>();
  const [createdBy, setCreatedBy] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCustomerName  = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(event.target.value);
  }
  const handleCustomerCardCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerCardCode(event.target.value);
  }
  const handleCreatedByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedBy(event.target.value);
  }

  useEffect(() => {
    // Fetch Ticket Types
    server
      .get("/getTicketTypeList")
      .then((response) => {
        setTicketTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ticket types:", error);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const selectedTicketTypeObj = ticketTypes.find(
        (type) => type.id === selectedTicketType
      );
      setCustomerTicketTypeName(selectedTicketTypeObj?.name);

      if (!customerName || !customerCardCode || !customerTicketTypeName || !createdBy) {
        setResponseMessage("Please fill in all fields");
        return; // Exit the function if any field is empty
      }
  
      const response = await server.post("/addCustomerCardTicketType", {
        customerName: customerName,
        customerCardCode: customerCardCode,
        customerTicketTypeName: customerTicketTypeName,
        createdBy: createdBy
      });
      setResponseMessage(response.data);

    } catch (error) {
      // Handle error
      setResponseMessage(`Error: ${error}`);
    }
  };

  return (
    <Form>
        <div>
        <label>Customer name:</label>
        <input
            type="text"
            value={customerName}
            onChange={handleCustomerName}
        />
        </div>

        <div>
        <label>Card code::</label>
        <input
            type="text"
            value={customerCardCode}
            onChange={handleCustomerCardCode}
        />
        </div>

        <Form.Group controlId="ticketType">
            <Form.Label>Ticket Type:</Form.Label>
            <Form.Control
            as="select"
            value={selectedTicketType}
            onChange={(event) =>
                setSelectedTicketType(parseInt(event.target.value))
            }
            >
            <option value={undefined}>Select Ticket Type</option>
            {ticketTypes.map((ticketType) => (
                <option key={ticketType.id} value={ticketType.id}>
                {ticketType.name}
                </option>
            ))}
            </Form.Control>
        </Form.Group>

        <div>
            <label>Created By: </label>
            <input
            type="text"
            value={createdBy}
            onChange={handleCreatedByChange}
            />
        </div>

        <Button variant="primary" onClick={handleSubmit}>
            Submit
        </Button>
        <p>{responseMessage}</p>
        </Form>
  );
}