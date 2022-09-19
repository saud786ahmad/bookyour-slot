import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Navbar } from 'react-bootstrap';
// import {navigate } from "hookrouter";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/tagTeam.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { getAllSlots } from '../api';

export const loadTagAvailabilitySlots = async(cb) => {
  await getAllSlots().then(res => {
    localStorage.setItem("tagAvailabilitySlots",JSON.stringify(_.get(res,'data','') ))
     cb(_.get(res,'data',''))
  }).catch(err => {
    console.log(err)
    cb()
  })
}

const logout = async () =>{
  window.location.href = "/login"
}

function TagTeam() {
    const navigate = useNavigate()
    const [tagAvailabilitySlots, setTagAvailabilitySlots] = useState([]);

   

    useEffect(() => {
      loadTagAvailabilitySlots((data) => {
        setTagAvailabilitySlots(data)

      })
      // loadTagAvailabilitySlots()
    }, [])

    const departments = _.uniq(_.map(tagAvailabilitySlots, each => _.get(each,'techTrack','')))
    

    return (
      <>
      <Navbar sticky='top' variant="dark">
      <Container fluid>
          <Navbar.Brand href='#home' style={{fontWeight: "bold"}}>BookYourSlot</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
          <Navbar.Brand className="gx-1" onClick={logout} style={{cursor:"pointer"}}>Logout</Navbar.Brand>
  {/* <Navbar.Brand className="gx-1" href="#home">Home</Navbar.Brand>
  <Navbar.Brand className="gx-1" href="#about">About</Navbar.Brand>
  <Navbar.Brand className="gx-1" href="#features">Features</Navbar.Brand>
  <Navbar.Brand className="gx-1" href="#resp">Responsibilities</Navbar.Brand> */}
          </Navbar.Collapse>
      </Container>
  </Navbar>
        <div className="App">
           <Row>
            <Col className="heading">
            <h3>
                   Welcome Tag Team
                </h3>
                </Col> 

           </Row>
           <Row>
            <Col className="sub-heading">
             <h3>
                  Select Tech Track
                </h3>
                </Col> 

           </Row>
           <div style={{width:"100%", display:"flex", justifyContent:'center',height: "70vh", alignItems:'center'}}>
               <div style={{marginLeft:'auto', marginRight:'auto', display:'flex', padding: "20px",width:"95%",flexWrap:'wrap',height:"70vh", overflowY:'auto',justifyContent:'center', backgroundColor: "rgb(128, 128, 255)"}}>
                {departments.map((each,idx) => (
                    <div key={idx}  onClick={() => navigate(`/tagTeamAvailability?category=${each}`)} style={{backgroundColor: "#fff",margin: "20px", borderRadius:"10px", padding: "40px", textAlign:'center', maxWidth:"250px", minWidth:"220px",cursor: "pointer", height:"120px"}}>
                        <h4>{each}</h4>
                    </div>
                ))}
               </div>

           </div>
          
        </div>
        </>
    );
}

export default TagTeam;
