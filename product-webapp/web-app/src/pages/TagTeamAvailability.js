import React, { useEffect, useRef, useState } from "react";
// import "../styles/login.css";
import { Col, Row, Button, Modal, Form, Navbar, Container } from "react-bootstrap";
import "../styles/TagTeamAvailability.css";
import { FaCalendar, FaUser } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { useForm } from "react-hook-form";
import { changeSlotStatus, SLOTS } from "../api";
import { loadTagAvailabilitySlots } from "./TagTeam";

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

function print(t) {
  var [h, m] = t.split(":");
  const hour = ((h % 12) + 12 * (h % 12 == 0)) < 10 ? `0${(h % 12) + 12 * (h % 12 == 0)}` : `${(h % 12) + 12 * (h % 12 == 0)}`
  return `${hour + ":" + m} ${hour >= 12 ? "PM" : "AM"}`;
}

const TagTeamAvailabilitySlots = () => {

  const [techTrackAvailabilitySlots, setTechTrackAvailabilitySlots] = useState([])
  const location = useLocation()
  const params = new URLSearchParams(location.search).get('category');
  const [users, setUsers] = useState([]);
  const [editSlot, setEditSlot] = useState({ edit: true, tagTeamSelected: null })
  // const user = JSON.parse(localStorage.getItem("user"));
  const [timeSlotDate, setTimeSlotDate] = useState("")
  const [loading, setLoading] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  const [allExperts, setAllExperts]=useState([]);
  const [slotemailid, setslotemailid]=useState("");

  const handleSlots=(email)=>{
    fetch(`http://localhost:8080/interviewer-service/api/v1/int/getSlotByInterviewerEmail/${email}`).then(response=>
          response.json()
        )
        .then((response)=>
        setAllslots(response)
        // console.log(JSON.stringify(response.data))
          
        )
    setShow(true)
  }

  const loadUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/registration`);
      setUsers(response.data.filter(each => each.department === params))
    }
    catch (err) {

    }
  }

  const submitBtn = useRef(null);
  const [show, setShow] = useState(false);
  // const updateUser = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:3003/registration/${user.id}`);
  //     console.log(response);
  //     setLoginUser(response.data);
  //     setLoading(false);
  //   } catch (err) { }
  // };

  useEffect(()=>{

 
    // const techTrack=location.search.split("category=")[1]
    fetch(`http://localhost:8080/user-service/api/v1/reg/getByTechTrack/java`).then(resp=>
      resp.json()
    )
    .then((response)=>
      setAllExperts(response)
      
    )},[])

    console.log(allExperts)
  useEffect(() => {

    const tagTeamAvailabilitySlots = JSON.parse(localStorage.getItem("tagAvailabilitySlots"))
    if (_.size(tagTeamAvailabilitySlots)) {
      setTechTrackAvailabilitySlots(_.filter(tagTeamAvailabilitySlots, each => _.get(each, 'techTrack') === params))
    }
  }, [show]);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [selectDate, setSelectDate] = useState("");
  const [allSlots, setAllslots]= useState([]);

  const handleTimeSlot = (eachSlot) => {
    console.log(eachSlot)
    setEditSlot({...editSlot,tagTeamSelected:eachSlot})
    // console.log(section, slot, idx)
    // setEditSlot({ edit: true, section: section, slot: slot, index: idx })
    setShow(true)
    // setValue("id", _.get(eachSlot,'slotId'))
    // setValue("selectDate", _.get(eachSlot,'availableDate'))
    // setValue("from", _.get(eachSlot,'startTime'))
    // setValue("to", _.get(eachSlot,'endTime'))
    // setValue("description", _.get(eachSlot,'description'))
    // setValue("status", _.get(eachSlot,'slotStatus'))
    fetch(`http://localhost:8080/interviewer-service/api/v1/int/getSlotByInterviewerEmail/${eachSlot.email}`).then(response=>
          response.json()
        )
        .then((response)=>
          setAllExperts(response)
        // console.log(JSON.stringify(response.data))
          
        )}

  console.log(users, params, 'users')
  useEffect(() => {
  
  }, [])
  const slots = [
    { dateandtime: "9AM - 10AM", color: 'green' },
    { dateandtime: "10AM - 11AM" },
    { dateandtime: "3PM - 4PM" },
    { dateandtime: "5PM - 6PM", color: 'red' },
    { dateandtime: "7PM - 8PM" },
    { edit: true },
  ];


  const handleChange = async(status) => {
      await changeSlotStatus(_.get(editSlot,'tagTeamSelected.bookedSlotId',''), status).then(res => {
              setShow(false)
              loadTagAvailabilitySlots((data) => {
                window.location.reload()
                // setTagAvailabilitySlots(data)
        
              })
      })
  
  }

  const saveAppoitment =(data)=>{
    axios.post(`http://localhost:8080/tag-team-service/tag/api/v1/tag/newBookedSlot`,{
      bookedSlotId: "",
      tagTeamName: "",
      tagTeamEmail: localStorage.getItem("email"),
      techTrack: data.techTrack,
      interviewTopic: "",
      description: "",
      emailOfInterviewer: data.emailOfInterviewer,
      availableDate: data.date,
      startTime: data.slots.startTime,
      endTime: data.slots.endTime,
      bookedDate: "2022-07-03",
      slotStatus: "BOOKED"

    }).then(response=>{
      
    })
    axios.put(`http://localhost:8080/interviewer-service/api/v1/int/updateSlotStatus/${data.slotId}/UNAVAILABLE`)
      .then(resp=>{

      })
      setShow(false)
  }

  const logout = async () =>{
    window.location.href = "/login"
 }


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
  <Row>
      <Row className="justify-content-between mt-2">
        <Col xs={4}>
          <div className="p-2 ">
          </div></Col>
        <Col xs={4} className=" d-flex justify-content-center p-2">
          <div className="p-2 px-4 bg-white rounded-3">
            <span className="font-weight-bold font-italic">INTERVIEWER AVAILABILITY</span>
          </div>
        </Col>
        <Col xs={4} className="d-flex justify-content-center">
          <div className="p-2   rounded-3">
            {/* <span>{moment(new Date()).format('DD-MM-YYYY')}</span> */}
            {/* <input
              type="date"
              onChange={(e) => setTimeSlotDate(e.target.value)}
              value={timeSlotDate}
              className="form-control"
              name="selectDate"
              placeholder="Select Date"
            /> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="mx-2">
          <span className="fullstackDeveloper__text">{_.capitalize(params)}</span>

        </Col>
      </Row>

      {/* <Row className="p-5 justify-content-center align-items-center"> */}
      <div style={{display:"flex", flexWrap:'wrap',justifyContent:'space-evenly'}}>
        {
          allExperts?.map((eachSlot,index) => {
            console.log(eachSlot)
            return(

            <div key={index} style={{minWidth: "500px",margin: "30px", maxWidth: "800px"}}>
            
            
                {/* <Col xs={4} className="m-4">  */}

                  <div className="interView__slot__container p-3" style={{ minHeight: "200px" }}>
                    <div className="d-flex justify-content-between align-items-center p-2">
                      <div>
                        <FaUser size={30} />
                      </div>
                      <div className="interview__user__details d-flex justify-content-center align-items-center flex-column">
                        <p className="font-weight-bold">{eachSlot.name}</p>
                        <p className="font-weight-bold">{eachSlot.email}</p>
                       
                      
                      </div>
                      <div>
                        <div className="d-flex align-items-center">
                          <FaCalendar className="m-1" size={15} />
                          <span>{moment(_.get(eachSlot, "availableDate", '')).format('YYYY-MM-DD')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-evenly flex-wrap">
                    
                    <div className="m-2" >
                      <Button onClick={()=>{handleSlots(eachSlot.email)}}>
                        show slots
                      </Button>
                              {/* <div>
                        className={`p-1 ${each.status === "not-available" ? 'bg-red' : each.status === "available" ? "bg-green" : ''}`}
                        </div> */}
                              {/* <span
                                className="p-1"
                                onClick={() => !eachSlot?.slotStatus === "BOOKED" ? {} : handleTimeSlot(eachSlot)}
                                style={{ border: "1px solid #000", backgroundColor:_.get(eachSlot,'slotStatus') === "BOOKED" ? "green" : "red" }}>
                                {eachSlot?.startTime}:{eachSlot?.endTime}
                              </span> */}
                            </div>
                    </div>
                  </div>
                {/* </Col> */}

            </div>
          )})
        }

      </div>

      {/* </Row> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
        {
                allSlots.map((data,index)=>{
                   return( <div>
                    <p>{data.date}</p>
                    <p key={index}>{data.slots.startTime} - {data.slots.endTime}</p>
                    <Button onClick={()=>saveAppoitment(data)}>Book</Button>
                   </div>
                  
                   )
                })
            }
          {/* <form>
            {
              editSlot.edit ?
                <Form.Group className="form-group">
                  <Form.Label>ID : </Form.Label>
                  <input type="text" disabled {...register("id")} name="id" class="form-control" placeholder="Id" />
                </Form.Group>
                : null
            }

            <div class="form-group">
              <label for="exampleInputPassword1">Date:</label>
              <input
                type="date"
                {...register("selectDate")}
                class="form-control"
                name="selectDate"
                placeholder="Select Date"
              />
            </div>
             <Form.Group className="form-group">
              <Form.Label>Date: </Form.Label>
              <input type="date" {...register("selectDate")} name="selectDate" placeholder="Select Date" />
            </Form.Group>
            <Form.Group>
              <div className="d-flex align-items-center mt-2 mb-2">
                <Form.Label>From</Form.Label>
                <input class="form-control m-1" type="time" {...register("from")} name="from" />
                <Form.Label>To</Form.Label>
                <input class="form-control m-1" type="time" {...register("to")} name="to" />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Status: </Form.Label>
              <select name="status" class="form-control" {...register("status")} disabled={editSlot.edit}>
                <option value="">NA</option>
                {
                  SLOTS.map(each => {
                   return <option value={each}>{each}</option>

                  })
                }
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <textarea name="description" class="form-control" {...register("description")}></textarea>
            </Form.Group>
            <button type="submit" style={{ display: "none" }} ref={submitBtn}></button>
          </form> */}
        </Modal.Body>

        <Modal.Footer>
          {
            editSlot.edit
              ?
              <>
                {/* <Button
                                  onClick={() => handleChange('BOOKED')}

                  variant="success"
                >
                  Create
                </Button>
                <Button
                  onClick={() => handleChange('CANCELLED')}
                  variant="danger"
                >
                  Cancel
                </Button> */}
              </>
              :
              <Button
                onClick={() => {
                  submitBtn.current.click();
                }}
                variant="success"
              >
                Create
              </Button>
          }
        </Modal.Footer>
      </Modal>
    </Row>
    </>

  );
};
export default TagTeamAvailabilitySlots;