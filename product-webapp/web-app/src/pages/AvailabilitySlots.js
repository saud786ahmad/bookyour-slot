import React, { useEffect, useRef, useState } from "react";
import "../styles/login.css";
import { Col, Row, Button, Modal, Form, Navbar, Container } from "react-bootstrap";
import "../styles/availabilitySlots.css";
import { FaCalendar, FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import { addSlot, getSlot, updateSlot } from "../api";
import _ from "lodash";
let cancelBtnStatus = false;
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
const AvailabilitySlots = () => {
  const [editSlot, setEditSlot] = useState({ edit: true, section: null, slot: null, index: null })
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([])
  const [loginUser, setLoginUser] = useState({});
  const [startTime1, setStartTime1] = useState("");
  const [endTime1, setEndTime1] = useState("");
  console.log("loginUser")
  console.log(loginUser)

  const groupSlotsByDate = () => {
    const list = _.groupBy(availableSlots,(each) => _.get(each, "date"))
    return list
  }

  console.log(groupSlotsByDate())


  const renderGroupedSlots = () =>{

    const keys = _.keys(groupSlotsByDate()).filter(e => e !== "null")
    console.log(keys)
    return keys.map((each,idx) => {

      return (
  
        <Row className="availability__slots__list__item mb-2" key={idx}>
        <div>
          <span className="availability__slots__date__text availability__slots__date_day__text">
            {moment(each).format("ddd")}, <p>{each}</p>
          </span>
        </div>
        <div style={{ display: "flex" }} className="w-100 m-3">

          {/* {each?.allSlots?.map((eachTimeSlot, idx) => ( */}
          {
            groupSlotsByDate()[each].map(each => {
              return (
                <div
                onClick={() => each?.slotStatus === "NOTAVAILABLE" ? {} : handleTimeSlot(each, each.slots, idx)}
                className={`cursor-pointer availability__slots__slot ${each?.slotStatus === "NOTAVAILABLE"
                  ? "bg-red"
                  : each?.slotStatus === "AVAILABLE"
                    ? "bg-green"
                    : ""
                  }`}
                style={{ width: "auto" }}
              >
                {_.get(each,"slots.startTime")} - {_.get(each,"slots.endTime")}
              </div>
              )
            })
          }
         
        </div>
      </Row>
        
      )

    })
  
  }

  console.log("endtime ",endTime1)
  const [form, setForm] = useState({
    // date: "",
    // interviewerEmail: localStorage.getItem('email'),
    // interviewerName: localStorage.getItem('email').split('@')[0],
    // slotId: 22,
    // slotStatus: "AVAILABLE",
    // slots: {
    //   endTime: endTime1,
    //   startTime: startTime1,
    // },
    // techTrack: "Java",

    // date: "2022-07-30",
    // interviewerEmail: "mehboob@gmail.com",
    // interviewerName: "Mehboob Hussain",
    // slotStatus: "AVAILABLE",
    // slots: {
    //   endTime: "10:00",
    //   startTime: "09:00"
    // },
    // techTrack: "Java"

  });
  const slots = [
    { dateandtime: "9AM - 10AM", color: "green" },
    { dateandtime: "10AM - 11AM" },
    { dateandtime: "3PM - 4PM" },
    { dateandtime: "5PM - 6PM", color: "red" },
    { dateandtime: "7PM - 8PM" },
    { edit: true },
  ];
  const submitBtn = useRef(null);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [date, setSelectDate] = useState("");

  function print(t) {
    var [h, m] = t.split(":");
    const hour = ((h % 12) + 12 * (h % 12 == 0)) < 10 ? `0${(h % 12) + 12 * (h % 12 == 0)}` : `${(h % 12) + 12 * (h % 12 == 0)}`
    return `${hour + ":" + m} ${hour >= 12 ? "PM" : "AM"}`;
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };


  const cancelFun = async () => {
    console.log(editSlot);
    cancelBtnStatus = true;
    // submitBtn.current.click();
  }

  const logout = async () =>{
     window.location.href = "/login"
  }

  const updateUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3003/registration/${user.id}`);
      console.log(response);
      setLoginUser(response.data);
      setLoading(false);
    } catch (err) { }
  };

  const updateSlots = () => {
    const email =localStorage.getItem("email")
    getSlot(email).then(res => {
      console.log(res.data)
      setAvailableSlots(res.data);
    })
  }

  useEffect(() => {
    updateSlots()
    // updateUser();
    if (show === false) {
      setEditSlot({ edit: false, section: null, slot: null, index: null })
    }
  }, [show]);

  const pushToSlotLoginUserTable = async (slot) => {
    try {
      const response = axios.get(`http://localhost:3003/registration/${user.id}`, {
        ...loginUser,
        slots: slot,
        // slots: loginUser.slots.map((each,idx) => idx === findIndex ?  slot  : [...loginUser.slots,slot]),
      });
      // updateUser();
      reset();
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (values) => {
    const email =localStorage.getItem("email")
    console.log(values)
    const modifiedSlots = {
      "date": values?.date,
      "interviewerEmail": email,
      "interviewerName": email,//need to change to name later on
      "slotId": values?.slotId,
      "slotStatus": values?.slotStatus,
      "slots": {
        "endTime": values?.endTime,
        "startTime": values?.startTime,
      },
      "techTrack": values?.techTrack,
    }

    if (editSlot.edit) {
      console.log("Update API CAlling//")
      updateSlot(values?.slotId,values?.slotStatus , modifiedSlots).then(res => {
        console.log(res.data)
        reset();
        setShow(false);
      }).catch(err => {
        console.log(err)
      })
    }
    else {
      addSlot(modifiedSlots).then(res => {
        console.log(res.data)
        // updateUser();
        reset();
        setShow(false);
      }).catch(err => {
        console.log(err)
      })
    }

    // if (userSlots.length) {
    //   const findTheSlotAlreadyExists = userSlots.find((each) => each.date === values.date);
    //   const findIndex = userSlots.findIndex((each) => each.date === values.date);
    //   if (findTheSlotAlreadyExists) {
    //     if(editSlot.edit){
    //       const slots = [...loginUser.slots]
    //       console.log(slots,'slot..')
    //      const findTheSectionIndex = slots.findIndex((each) => each.date === values.date);
    //      console.log(findTheSectionIndex,'find...')
    //      slots[findTheSectionIndex].allSlots[editSlot.index] = { endTime: print(values.endTime), startTime: print(values.startTime), description: values.description, slotStatus: cancelBtnStatus ? "not-available" :  values.slotStatus }
    //     //  console.log(slots,'slot....')
    //      pushToSlotLoginUserTable(slots)
    //     //  [findTheSlotAlreadyExists].allSlots[editSlot.index] = { endTime: print(values.endTime), from: print(values.from), description: values.description, slotStatus: values.slotStatus }
    //     //  console.log(slots,'allslots')
    //     }else{
    //       const slots = userSlots.map((e, idx) =>
    //         idx === findIndex
    //           ? {
    //               ...userSlots[idx],
    //               allSlots: [
    //                 ...userSlots[idx].allSlots,
    //                 { endTime: print(values.endTime), startTime: print(values.startTime), description: values.description, slotStatus: values.slotStatus },
    //               ],
    //             }
    //           : e
    //       );
    //       var fromArr = userSlots[findIndex].allSlots.map(e => e.startTime)
    //       var toArr = userSlots[findIndex].allSlots.map(e => e.endTime)
    //       console.log(fromArr,toArr, print(values.startTime),print(values.endTime),userSlots[findIndex])
    //       if(fromArr.includes(print(values.startTime)) || toArr.includes(print(values.endTime))){
    //          alert("This time slot already exists, Please change the timeslots")
    //         }else{
    //         pushToSlotLoginUserTable(slots);
    //       }

    //     }
    //   } else {
    //     pushToSlotLoginUserTable([
    //       ...userSlots,
    //       {
    //         ...values,
    //         allSlots: [{ endTime: print(values.endTime), startTime: print(values.startTime), description: values.description, slotStatus: values.slotStatus }],
    //       },
    //     ]);
    //   }
    // } else {
    //   pushToSlotLoginUserTable([
    //     ...userSlots,
    //     {
    //       ...values,
    //       allSlots: [{ endTime: values.endTime, startTime: values.startTime, description: values.description, slotStatus: values.slotStatus }],
    //     },
    //   ]);
    // }
  };

  const onClickCreateBtn = () => {


   
    console.log(startTime1)
    console.log(endTime1)
    console.log("Form",form)
    axios.post('http://localhost:8080/interviewer-service/api/v1/int/addSlot', {
      slotId: "",
      interviewerEmail: localStorage.getItem('email'),
      interviewerName: localStorage.getItem('email').split('@')[0],
      techTrack: localStorage.getItem('TechTrack'),
      // interviewerEmail: form.interviewerEmail,
      // interviewerName: form.interviewerName,
      date: form.date,
      slots: {
        startTime: startTime1,
        endTime: endTime1
      },
      slotStatus: form.slotStatus,
    

    
    
    }).then((res) => {
      alert('Slot addedd successfuly');
      // updateSlots()
      setShow(false)
    }).catch((err) => {
      alert('Something went wrong!')
    })
  }

  console.log(date);
  const getUserDateSlots = () => {
    loginUser.slots = getSlot()
    // if (date.length) {
    //   return loginUser.slots.filter((each) => each.date === date);
    // } else {
    //   return loginUser.slots;
    // }
  };

  console.log(editSlot)

  const handleTimeSlot = (section, slot, idx) => {
    console.log(section, slot, idx)
    setEditSlot({ edit: true, section: section, slot: slot, index: idx })
    setShow(true)
    setValue("slotId", section.slotId)
    setValue("date", section.date)
    setValue("startTime", convertTime12to24(slot.startTime))
    setValue("endTime", convertTime12to24(slot.endTime))
    setValue("description", slot.description)
    setValue("slotStatus", section.slotStatus)

    console.log(form);

  }

  // console.log(getUserDateSlots())

  // if (!loginUser.slots && loading) return <h3>Loading</h3>;

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
    <div className="availability__slots__content">
      <Row xs={12} className="justify-content-center align-items-center vh-100">
        <Col xs={10}>
          <h3 className="availability__slots__welcome__interviewer__text">Welcome Interviewer</h3>
          <Col className="availability__slots__container">
            <Row>
              <Col xs={{ offset: 4, span: 4 }}>
                <button className="w-100 availability__slots__btn">Availability Slots</button>
              </Col>
            </Row>
            <Row className="align-items-center my-2">
              <Col xs={4} className="align-items-center">
                {/* <FaCalendar className="m-1" size={24} /> */}
                {/* <span className="m-2 availability__slots__date__text">04-03-2022</span> */}
                {/* <input
                  type="date"
                  onChange={(e) => setSelectDate(e.target.value)}
                  name="date"
                  placeholder="Select Date"
                /> */}
              </Col>
              <Col xs={{ span: 2, offset: 6 }}>
                <button onClick={handleShow} className="w-100 availability__slots__btn">
                  Add Slot
                </button>
              </Col>
            </Row>
            <Row className="availability__slots__list__container">
              <Col xs={12} style={{ overflowY: 'auto', maxHeight: "60vh", margin: "10px" }}>
                <div className="p-3">
                  {
                    !availableSlots?.length ? <h4 className="text-center">No Slots Available</h4> : null
                  }
                  {
                    renderGroupedSlots()
                 

                  }
              
                </div>
              </Col>
            </Row>
            {/* <div className="d-flex justify-content-end">
            <span className="availability__slots__slot p-1 mt-2 px-3">
              1,  2
            </span>

        </div> */}
          </Col>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} className="my-modal">
        <Modal.Header closeButton />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              editSlot.edit ?
                <Form.Group className="form-group">
                  <Form.Label className="text-white">ID : </Form.Label>
                  <input disabled={editSlot.edit} className={`form-control disabledField`} type="text" {...register("slotId")} name="slotId" class="form-control" placeholder="Id" />
                </Form.Group>
                : null
            }

            <div class="form-group">
              <label for="exampleInputPassword1" className="text-white">Date:</label>
              <input
                type="date"
                name="date"
                className={`form-control ${editSlot.edit ? "disabledField" : ""}`}
                disabled={editSlot.edit}
                onChange={(e) => handleChange(e)}
                {...register("date")} 
                value={form.date}
                placeholder="Select Date"
              />
            </div>
            {/* <Form.Group className="form-group">
              <Form.Label>Date: </Form.Label>
              <input type="date" {...register("date")} name="date" placeholder="Select Date" />
            </Form.Group> */}
            <Form.Group>
              <div className="d-flex align-items-center mt-2 mb-2">
                <Form.Label className="text-white">From</Form.Label>
                <input 
                // disabled={editSlot.edit} 
                {...register("startTime")} 
                class={`form-control m-1 ${editSlot.edit ? "disabledField" : ""}`} type="time" onChange={(e)=> setStartTime1(e.target.value)}
                  value={form.startTime1} name="startTime" />
                <Form.Label className="text-white">To</Form.Label>
                <input 
                // disabled={editSlot.edit}
                {...register("endTime")} 
                 class={`form-control m-1 ${editSlot.edit ? "disabledField" : ""}`} type="time" onChange={(e) => setEndTime1(e.target.value)}
                  value={form.endTime} name="endTime" />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="text-white">Status: </Form.Label>
              <select name="slotStatus" class="form-control" onChange={(e) => handleChange(e)}
                value={form.slotStatus} {...register("slotStatus")} >
                <option value="">NA</option>
                <option value="AVAILABLE">Available</option>
                <option value="NOTAVAILABLE">Unavailable</option>
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-white">Description: </Form.Label>
              <textarea  name="description" class={`form-control ${editSlot.edit ? "disabledField" : ""}`} onChange={(e) => handleChange(e)}
                value={form.description}></textarea>
            </Form.Group>
            <button type="submit" ref={submitBtn} style={{ display: "none" }}> </button>
          </form>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          {
            editSlot.edit
              ?
              <>
             
                <Button
                  onClick={() => {
                    cancelBtnStatus = false;
                    setTimeout(() => {
                      console.log(submitBtn.current)
                      submitBtn.current.click();
                    }, 500);
                  }}
                  variant="success"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    cancelBtnStatus = true;
                    setTimeout(() => {
                      submitBtn.current.click();
                    }, 500);
                  }}
                  variant="danger"
                >
                  Cancel
                </Button>
              </>
              :
              <Button
                onClick={() => {
                  setTimeout(() => {
                    submitBtn.current.click();
                  }, 500);
                }}
                variant="primary"
              >
                Create
              </Button>
          }
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default AvailabilitySlots;