import { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import { Gate } from "../Interface";
import { ModifyModal } from "./ModifyModalCard";
import server from "../Server";
import _ from 'lodash' //library of usually use function.

export function GateList() {
  const [gateList, setGateList] = useState<Gate[]>([]);
  const [responseMessage, setResponseMessage] = useState("");
  
  const [refreshTable, setRefreshTable] = useState(false); // Add this state

  const getGateList = async () => {
    try {
      const response = await server.get("/getGateList");
      setGateList(_.orderBy(response.data as Gate[], 'id'));
    } catch (error) {
      console.error("Error fetching gate list:", error);
    }
  }

  useEffect(() => {
    getGateList();
  }, [refreshTable]);


  const handleSave = async (updatedGate: Gate) => {
    try {
      const response = await server.put("/updateGate", {
        gateId: updatedGate.id,
        gateCode: updatedGate.name,
        gateStatus: updatedGate.status,
        gateNote: updatedGate.note,
        updatedBy: updatedGate.updatedBy,
      });

      // Set the response message from the backend
      setResponseMessage(response.data);
      setRefreshTable(!refreshTable);
    } catch (error) {
      // Handle error
      // setResponseMessage("Error sending data");
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <h2>Gate List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Created By</th>
            <th>Updated By</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {gateList.map((gate: Gate) => (
            <tr key={gate.id}>
              <td>{gate.id}</td>
              <td>{gate.name}</td>
              <td>{gate.status}</td>
              <td>{new Date(gate.createdAt).toLocaleString()}</td>
              <td>{new Date(gate.updatedAt).toLocaleString()}</td>
              <td>{gate.createdBy}</td>
              <td>{gate.updatedBy}</td>
              <td>
                {/* <ModifyModal selectedGate={gate} onSave={handleSave} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>{responseMessage}</p>
    </>
  );
}