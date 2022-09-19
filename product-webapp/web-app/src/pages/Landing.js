import React from 'react';
import { Navbar,Container, Row, Col } from 'react-bootstrap';
import landPng from "../assets/images/landing.png";
import aboutjpg from "../assets/images/aboutus.jpg";
import barGraph from "../assets/images/bar-graph.png";
import checkmarK from "../assets/images/checkmark.svg";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import '../styles/land.css'
function Landing() {
  return (
        <React.Fragment>
            <Navbar sticky='top' variant="dark">
                <Container fluid>
                    <Navbar.Brand href='#home' style={{fontWeight: "bold"}}>BookYourSlot</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className='justify-content-end'>
          <Navbar.Brand className="gx-1" href="#home">Home</Navbar.Brand>
          <Navbar.Brand className="gx-1" href="#about">About</Navbar.Brand>
          <Navbar.Brand className="gx-1" href="#features">Features</Navbar.Brand>
          <Navbar.Brand className="gx-1" href="#resp">Responsibilities</Navbar.Brand>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='pt-5 pb-5 banner' id='home'>
                {/* <h1 className="text-center mb-4">Landing Page</h1> */}
                <Container fluid>
                    <Row className='flex text-white'>
                        <Col className='content'>
                            <article style={{ maxWidth: "450px", margin: " 20px auto" }}>
                                <h2 className="h1">Smart Interview Slot Booking</h2>
                                <p className="mb-2">
                                    Using the BookYourSlot, we have streamlined the process of
                                    interview booking and recruitment. User or organisation will
                                    be able to view all available time siots, schedule the
                                    interview. and book the lime siots depending upon the
                                    availability,
                                </p>
                                <p>
                                    User can also cancel the scheduled interview slots depending
                                    upon the requirements.
                                </p>
                                <Stack gap={3} direction="horizontal" className="mx-auto">
                                    <Button href="/login" variant="primary" >Sign In</Button>
                                    <Button href="/signup" variant="outline-secondary text-white">Sign Up</Button>
                                </Stack>
                            </article>
                        </Col>
                        <Col>
                            <img
                                style={{ maxWidth: "600px", width: "90%", height: "100%" }}
                                src={landPng}
                                alt='logo'
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid id="about">
                <Row className="d-flex tall-margin mb-5">
                    <Col className="">
                        <article style={{ maxWidth: "450px", margin: " 20px auto" }}>
                            <h2 className='h1 mb-4'>About Us</h2>
                            <p className='mb-4'>
                                We are a team of passionate designers and developers who have
                                built BookYourSlot to ease the interview slot booking and provide
                                a digital solution.
                            </p>
                            <p>
                                We have built a product to make interview slot booking process
                                easier and in future we intend to add more teatures like
                                integrating with Google Calendar. SMS reminder, etc.
                            </p>
                        </article>
                    </Col>
                    <Col>
                        <img
                            style={{ maxWidth: "600px", width: "90%", height: "100%" }}
                            src={aboutjpg}
                            alt='logo'
                        />
                    </Col>
                </Row>
            </Container>
      <Container fluid id="features">
                <Row className="d-flex tall-margin">
        <Col>
                        <img
                            style={{ maxWidth: "600px", width: "90%", height: "100%" }}
                            src={barGraph}
                            alt='logo'
                        />
                    </Col>
                    <Col className="">
                        <article style={{ maxWidth: "450px", margin: " 20px 0" }}>
                            <h2 className='h1 mb-4'>Features of BookYourSlot</h2>
                            <ul>
                <li className='mb-2'>Fast <strong>Booking and Cancellation</strong> of interview siots,</li>
                <li className='mb-2'>Availability of <strong>Slots</strong> for Interviwer to inform his/heravallable team</li>
                <li className='mb-2'>Best lise of <strong>Resources</strong>.</li>
                <li className='mb-2'>Less Paper <strong>Work</strong>.</li>
                <li className='mb-2'>Reduces <strong>Turnaround Time</strong> to Schedule and post the interviews</li>
                <li>Send timely <strong>Reminders</strong> to upcoming canceled interview to interviewer and FAG team</li>
              </ul>
                        </article>
                    </Col>
                </Row>
            </Container>
      <Container fluid id="resp">
        <Row className="d-flex tall-margin mb-5">
          <Col className="resp-card">
                        <h3 className="mb-2 text-center">Interviewer</h3>
                        <ul>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> Login</li>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> There should be two roles: interviewer and TAG team member </li>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> Interviewer can track the available slots</li>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> Interviewer can select the track and provide the available time slots for the upcoming days</li>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> Interviewer can able to cancel, edit, reschedule the interview slot.</li>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> Interviewer should get a mail with canceled,rescheduled interviews.</li>
                            <li><img src={checkmarK} alt="checkmark"/> Interviewer can track the upcoming and past interview slots.</li>
                        </ul>
          </Col>
          <Col className="resp-card">
                        <h3 className="mb-2 text-center">TAG team</h3>
                        <ul>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> TAG team can able to book an interview slot.</li>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> TAG team can select the track and see all the available tracks provided by differrent teams.</li>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> TAG team can cancel the interview and send the email to the interviewer with cancellation interview details.</li>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> TAG team can reschedule the interview and send the email to the interviewer with rescheduled interview details.</li>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> TAG team booked time slot will not be available for the other TAG team members.</li>
                            <li className='mb-3'><img src={checkmarK} alt="checkmark"/> TAG team can track the upcoming and past interview slots</li>
                            <li><img src={checkmarK} alt="checkmark"/> TAG team can able to track the number of Booked, cancelled, rescheduled time slots.</li>
                        </ul>
          </Col>
        </Row>
      </Container>
        </React.Fragment>
    );
}
export default Landing