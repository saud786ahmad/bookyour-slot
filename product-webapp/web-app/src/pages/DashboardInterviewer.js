import React, { useState } from 'react';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// import {navigate } from "hookrouter";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/dashboardInterviewer.css'
ChartJS.register(ArcElement, Tooltip, Legend);

function DashBoardInterviewer() {

  const data = {
    labels: ['Sample 1', 'Sample 2', 'Sample 3'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3,],
        backgroundColor: [
          'rgb(153, 221, 255)',
          'rgb(102, 255, 51)',
          'rgba(0, 0, 0, 0.8)',
        ],
        borderColor: [
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <Row>
        <Col>
          <h3>
            <h3 className="dashboard">Dashboard-Interviewer</h3>
          </h3>
        </Col>

      </Row>
      <h3 className="dashboard1">
        <Row>
          <Col className="col-md-4"><h3 className="dashboard3">Booked</h3></Col>
          <Col className="col-md-4"><h3 className="dashboard4">Completed</h3></Col>

          <Col className="col-md-4"><h3 className="dashboard5">Cancelled</h3></Col>


        </Row>
      </h3>
      <Container>
        <Row>
          <Col className="col-md-8">
            <h3 className="dashboard2">DashBoard</h3>
            <Card className='maincard'>
              <Row>
                <Col className="col-md-6">
                  <Card className='card-item'>
                    HTML,CSS
                    <br></br><br></br>
                    <p style={{ color: "red" }}>Front End Development</p>

                    <b>Date: 23/06/2022</b>

                    <b>Slot: 10AM - 11AM</b>

                    <b>Status:<b style={{ color: "red" }}> CANCELLED</b></b>
                  </Card>
                </Col>
                <Col className="col-md-6">
                  <Card className='card-item'>
                    BOOTSTRAP
                    <br></br><br></br>
                    <p style={{ color: "red" }}>Front End Development</p>

                    <b>Date: 23/06/2022</b>

                    <b>Slot: 10AM - 11AM</b>

                    <b>Status:<b style={{ color: "red" }}> CANCELLED</b></b>
                  </Card>
                </Col>
                <Col className="col-md-6">
                  <Card className='card-item'>
                    HTML,CSS
                    <br></br><br></br>
                    <p style={{ color: "red" }}>Front End Development</p>

                    <b>Date: 23/06/2022</b>

                    <b>Slot: 10AM - 11AM</b>

                    <b>Status:<b style={{ color: "red" }}> CANCELLED</b></b>
                  </Card>
                </Col>
                <Col className="col-md-6">
                  <Card className='card-item'>
                    BOOTSTRAP
                    <br></br><br></br>
                    <p style={{ color: "red" }}>Front End Development</p>

                    <b>Date: 23/06/2022</b>

                    <b>Slot: 10AM - 11AM</b>

                    <b>Status:<b style={{ color: "red" }}> CANCELLED</b></b>
                  </Card>
                </Col>
              </Row>

            </Card>

          </Col>

          <Col className="col-md-4">
            <Card className='minicard position-relative'>
              <span style={{ position: 'absolute', fontWeight: 'bold', top: "-8px", color: 'white', left: "40%", zIndex: 10, padding: "5px 15px", backgroundColor: 'blue' }}>Filter</span>
              <Row>
                <Col>
                  <Form.Group className="mb-2 position-relative" controlId="formBasicEmail">
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-2 position-relative" controlId="formBasicEmail">
                    <Form.Label>Start Date  </Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-2 position-relative" controlId="formBasicEmail">
                    <Form.Label>End Date  </Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
              </Row>
            </Card>

            <div style={{ width: "320px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: "200px" }}>
                <Pie data={data} height="200px" width="200px" />
            
              </div>

            </div>
          </Col>
        </Row>
      </Container>


    </div>
  );
}

export default  DashBoardInterviewer;
