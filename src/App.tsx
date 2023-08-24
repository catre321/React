import { Routes, Route, Link } from "react-router-dom";
import { AddCard } from "./component/AddCard";
import * as GetData from "./component/GetData";
import { AddCustomer } from "./component/AddCustomer";
import { AddGate } from "./component/AddGate";
import { Col, Container, Row } from "react-bootstrap";
import { AddTicketType } from "./component/AddTicketType";
import { AddReader } from "./component/AddReader";
import { AddTicketTypeGate } from "./component/AddTicketTypeGate";

function App() {
  return (
    <Container>
      <Row>
        <Col>
        <nav>
          <ul>
            <li>
              <button>
                <Link to="/">Home</Link>
              </button>
            </li>
            <li>
              <button>
                <Link to="/addCard">AddCard</Link>
              </button>
            </li>
            <li>
              <button>
                <Link to="/addCustomer">Add Customer</Link>
              </button>
            </li>
            <li>
              <button>
                <Link to="/addGate">Add Gate</Link>
              </button>
            </li>
            <li>
              <button>
                <Link to="/addTicketType">Add Ticket Type</Link>
              </button>
            </li>
            <li>
              <button>
                <Link to="/addReader">Add Reader</Link>
              </button>
            </li>
            <li>
              <button>
                <Link to="/addTicketTypeGate">Map Ticket type-Gate</Link>
              </button>
            </li>
            <li>
              <button>
                <Link to="/getData/getCardList">Card list</Link>
              </button>
            </li>
          </ul>
        </nav>
        </Col>

        <Col>
        <Routes>
          <Route path="/" element={<div>Hello</div>} />
          <Route path="/addCard" element={<AddCard />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/addGate" element={<AddGate />} />
          <Route path="/addTicketType" element={<AddTicketType />} />
          <Route path="/addReader" element={<AddReader />} />
          <Route path="/addTicketTypeGate" element={<AddTicketTypeGate />} />
          <Route path="/getData/getCardList" element={<GetData.CardList />} />
        </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
