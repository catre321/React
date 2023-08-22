import { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import { Card } from "../Interface";
import { ModifyModal } from "./ModifyModal";
import server from "../Server";

export function CardList() {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [refreshTable, setRefreshTable] = useState(false); // Add this state

  useEffect(() => {
    // Fetch card list data
    server
      .get("/getCardList")
      .then((response) => {
        setCardList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching card list:", error);
      });
  }, [refreshTable]);

  const handleSave = async (updatedCard: Card) => {
    try {
      const response = await server.put("/updateCard", {
        cardCode: updatedCard.code,
        cardStatus: updatedCard.status,
        cardNote: updatedCard.note,
        updatedBy: updatedCard.updatedBy,
      });

      // Set the response message from the backend
      // setResponseMessage(response.data);
      setRefreshTable(!refreshTable);
    } catch (error) {
      // Handle error
      // setResponseMessage("Error sending data");
      console.error("Error sending data:", error);
    }
  };

  cardList.sort((a, b) => a.id - b.id);

  return (
    <>
      <h2>Card List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Status</th>
            <th>Note</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Created By</th>
            <th>Updated By</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {cardList.map((card: Card) => (
            <tr key={card.id}>
              <td>{card.id}</td>
              <td>{card.code}</td>
              <td>{card.status}</td>
              <td>{card.note}</td>
              <td>{new Date(card.createdAt).toLocaleString()}</td>
              <td>{new Date(card.updatedAt).toLocaleString()}</td>
              <td>{card.createdBy}</td>
              <td>{card.updatedBy}</td>
              <td>
                <ModifyModal selectedCard={card} onSave={handleSave} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
