import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Button, Modal, Form, Navbar, Container } from "react-bootstrap";

function InterviewersList() {

    const logout = async () =>{
        window.location.href = "/login"
     }   
    const [allExperts, setAllExperts]=useState([]);
    // const params = new URLSearchParams(location.search).get('category');
    useEffect(()=>{

 
        // const techTrack=location.search.split("category=")[1]
        fetch(`http://localhost:8081/api/v1/reg/getByTechTrack/Java`).then(response=>
          response.json()
        )
        .then((response)=>
          setAllExperts(response)
        // console.log(JSON.stringify(response.data))
          
        )},[])
    return (
        <>
        <Navbar sticky='top' variant="dark">
        <Container fluid>
            <Navbar.Brand href='#home' style={{fontWeight: "bold"}}>BookYourSlot</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
            <Navbar.Brand className="gx-1" onClick={logout}>Logout</Navbar.Brand>
    {/* <Navbar.Brand className="gx-1" href="#home">Home</Navbar.Brand>
    <Navbar.Brand className="gx-1" href="#about">About</Navbar.Brand>
    <Navbar.Brand className="gx-1" href="#features">Features</Navbar.Brand>
    <Navbar.Brand className="gx-1" href="#resp">Responsibilities</Navbar.Brand> */}
            </Navbar.Collapse>
        </Container>
    </Navbar>
        <div>
            <p>Print</p>
            {
                allExperts.map((item,index)=>{
                   return( <p key={index}>{item.email}</p>)
                })
            }
        </div>
        </>
    )
}

export default InterviewersList