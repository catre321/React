import { Routes, Route, Link } from "react-router-dom";
import { Col, Container, Row, Nav } from "react-bootstrap";

import { AddCard } from "./component/add_function/AddCard";
import { AddCustomer } from "./component/add_function/AddCustomer";
import { AddGate } from "./component/add_function/AddGate";
import { AddTicketType } from "./component/add_function/AddTicketType";
import { AddReader } from "./component/add_function/AddReader";
import { AddTicketTypeGate } from "./component/add_function/AddTicketTypeGate";
import { AddCustomerCardTicketType } from "./component/add_function/AddCustomerCardTicketType";

import { CardList } from "./component/GetCard";
import { GateList } from "./component/GetGate";

function App() {
  return (
    <Container>
      <Row>
        <Col lg={3} md={12}>
          <Nav className="flex-column">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/addCard">Add Card</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/addCustomer">Add Customer</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/addGate">Add Gate</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/addTicketType">Add Ticket Type</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/addReader">Add Reader</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/addTicketTypeGate">Map Ticket Type-Gate</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/addCustomerCardTicketType">
                Map Customer-Card-Ticket Type
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/getData/getCardList">Card List</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/getData/getGateList">Gate List</Link>
            </Nav.Link>
          </Nav>
        </Col>

        <Col lg={9} md={12}>
          <Routes>
            <Route path="/" element={<div>Hello</div>} />
            <Route path="/addCard" element={<AddCard />} />
            <Route path="/addCustomer" element={<AddCustomer />} />
            <Route path="/addGate" element={<AddGate />} />
            <Route path="/addTicketType" element={<AddTicketType />} />
            <Route path="/addReader" element={<AddReader />} />
            <Route path="/addTicketTypeGate" element={<AddTicketTypeGate />} />
            <Route
              path="/addCustomerCardTicketType"
              element={<AddCustomerCardTicketType />}
            />
            <Route path="/getData/getCardList" element={<CardList />} />
            <Route path="/getData/getGateList" element={<GateList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
