import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Gate, TicketType } from "../../Interface";
import server from "../../Server";

export function AddTicketTypeGate(){
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [gates, setGates] = useState<Gate[]>([]);
  const [selectedTicketType, setSelectedTicketType] = useState<number | undefined>();
  const [selectedGate, setSelectedGate] = useState<number | undefined>();
  const [ticketTypeName, setTicketTypeName] = useState<string | undefined>();
  const [gateName, setGateName] = useState<string | undefined>();
  const [maxEntry, setMaxEntry] = useState("");
  const [status, setStatus] = useState<string | undefined>();
  const [createdBy, setCreatedBy] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleMaxEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxEntry(event.target.value);
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

    // Fetch Gates
    server
      .get("/getGateList")
      .then((response) => {
        setGates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gates:", error);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const selectedTicketTypeObj = ticketTypes.find(
        (type) => type.id === selectedTicketType
      );
      const selectedGateObj = gates.find(
        (gate) => gate.id === selectedGate
      );
      setTicketTypeName(selectedTicketTypeObj?.name);
      setGateName(selectedGateObj?.name);

      if (!setTicketTypeName || !setGateName || !status || !maxEntry || !createdBy) {
        setResponseMessage("Please fill in all fields");
        return;
      }
  
      const response = await server.post("/addTicketTypeGate", {
        ticketTypeName: ticketTypeName,
        gateName: gateName,
        maxEntry: maxEntry,
        status: status,
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

      <Form.Group controlId="gate">
        <Form.Label>Gate:</Form.Label>
        <Form.Control
          as="select"
          value={selectedGate}
          onChange={(event) => setSelectedGate(parseInt(event.target.value))}
        >
          <option value={undefined}>Select Gate</option>
          {gates.map((gate) => (
            <option key={gate.id} value={gate.id}>
              {gate.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <div>
        <label>Max entry for this gate per day: </label>
        <input
          type="text"
          value={maxEntry}
          onChange={handleMaxEntryChange}
        />
      </div>

      <Form.Group controlId="status">
        <Form.Label>Status:</Form.Label>
        <Form.Control
          as="select"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value={undefined}>Select status</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
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