import React from 'react';
import { Container, Row, Col, Nav, NavLink, NavItem, Card, CardTitle, CardText, Button, CardHeader, CardBody, Badge } from 'reactstrap';
import './billing.css';
import BillingButton from "./BillingButton";

const BillingView = () => {

  const subInfo = {
    oneYear: {
      header: "Yearly Subscription",
      priceTitle: "$9.99",
      totalCents: 999,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    oneMonth: {
      header: " Monthly Subscription",
      priceTitle: "$0.99",
      totalCents: 99,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  }
    
  return (
    <Container className="mt-5">
      <Row>
        <Col sm="2">
          <Nav vertical>
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
        
        <Col sm="10">
          <h1 className="display-4 main-title">Subscriptions</h1>
          <div className="card-container">
            <Row>
              <Col sm="6">
                <Card className="card">
                  <CardHeader tag="h3">Yearly Subscription</CardHeader>
                  <CardBody>
                    <CardTitle className="">$0.99</CardTitle>
                    <CardText className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CardText>
                    <BillingButton 
                      header = {subInfo.oneYear.header}
                      priceTitle = {subInfo.oneYear.priceTitle}
                      totalCents = {subInfo.oneYear.totalCents}
                    />
                  </CardBody>
                </Card>
              </Col>

              <Col sm="6">
                <Card className="sub-card">
                  <CardHeader tag="h3">Monthly Subscription</CardHeader>
                  <CardBody>
                    <CardTitle>$9.99</CardTitle>
                    <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CardText>
                    <BillingButton 
                      header = {subInfo.oneMonth.header}
                      priceTitle = {subInfo.oneMonth.priceTitle}
                      totalCents = {subInfo.oneMonth.totalCents}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default BillingView;