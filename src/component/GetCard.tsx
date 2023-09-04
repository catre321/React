import { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import { Card } from "../Interface";
import { ModifyModal } from "./ModifyModalCard";
import server from "../Server";
import _ from 'lodash' //library of usually use function.

export function CardList() {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [responseMessage, setResponseMessage] = useState("");
  
  const [refreshTable, setRefreshTable] = useState(false); // Add this state

  const getCardList = async () => {
    try {
      const response = await server.get("/getCardList");
      setCardList(_.orderBy(response.data as Card[], 'id'));
    } catch (error) {
      console.error("Error fetching card list:", error);
    }
  }

  useEffect(() => {
    getCardList();
  }, [refreshTable]);


  const handleSave = async (updatedCard: Card) => {
    try {
      const response = await server.put("/updateCard", {
        cardId: updatedCard.id,
        cardCode: updatedCard.code,
        cardStatus: updatedCard.status,
        cardNote: updatedCard.note,
        updatedBy: updatedCard.updatedBy,
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
      <p>{responseMessage}</p>
    </>
  );
}
