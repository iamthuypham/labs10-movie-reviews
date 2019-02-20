import React from 'react';
import { Container, Row, Col, Nav, NavLink, NavItem } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    console.log("form state", this.state)
    return (
      <Container className="mt-5">
        <Row>
          <Col sm="3">
            <Nav className="border" vertical>
              <NavItem>
                <NavLink href="#">Documents</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Billing</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Settings</NavLink>
              </NavItem>
            </Nav>
          </Col>
          
          <Col sm="9">
            <h1>Billing</h1>
            <div className="border">
              <>

              </>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}