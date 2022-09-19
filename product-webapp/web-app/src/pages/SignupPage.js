import React, {useState} from "react";
import { Card, CardGroup, Row, Col, Container, Button, Form } from "react-bootstrap";
import userPng from "../assets/images/user_icon.png";
import contactImg from "../assets/images/loginleft-img.png";
import { FiMail } from "react-icons/fi";
import { AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import {MdPermContactCalendar} from 'react-icons/md'
import {useForm} from 'react-hook-form'
import axios from "axios";
import "../styles/login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";

const fields = [
  { label: "Full Name", placeholder: "Enter Full Name", xs: 12 ,name : "name"},
  { label: "Email", placeholder: "Enter Email", xs: 12, name : "email" ,rightIcon: <FiMail /> },
  { label: "password",type:'password', placeholder: "Enter Password", xs: 12, name : "password", rightIcon: <AiOutlineLock /> },
];
const schema = yup
.object({
  name: yup
    .string()
    .required("Full Name is required"),
  email: yup.string().email("Should be valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  phoneNo: yup.number().typeError("Should be valid contact number").max(9999999999,"Max 10 characters allowed").required("Contact number is required")
})
.required();


function SignupPage(props) {
  const { register,reset, handleSubmit,getValues, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const userRole = watch('userRole')
 console.log(getValues(),userRole)
  const onSubmit = async(values) => {
    const updatedValues = values.userRole === "INTERVIEWER" ? {...values, slots:[]} : values
    try{
      const response = await axios.post("http://localhost:8080/user-service/api/v1/reg/registration",updatedValues)
      alert("Successfully registered")
      reset()

    }catch(err){

    }
  }
  return (
    <div className="App">
      <div className="d-flex vh-100 align-items-center justify-content-md-center">
        <Row className="justify-content-center">
          <Col md={6}>
            <CardGroup className="d-flex w-100">
            <Card className="w-50">
                <Card className="cardLeft d-flex justify-content-center align-items-center">
                  <img className="cardLeft-img" src={contactImg} alt="logo" />
                  <p className="cardLeft-title-signup">BOOK YOUR SLOT</p>
                </Card>
              </Card>
              <Card className="w-50" style={{ padding: "27px", maxHeight: "100vh" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="d-flex justify-content-center align-items-center">
                    <img style={{ width: "24%" }} src={userPng} alt="logo" />
                  </div>
                  <br />
                  <Row>
                    {fields.map((eachField, index) => {
                      return (
                        <Col xs={eachField.xs} className="position-relative">
                          <Form.Group className="mb-1 position-relative" controlId="formBasicEmail">
                            <Form.Label>{eachField.label} </Form.Label>
                            <Form.Control  type={eachField?.type ? eachField.type : "text" }  {...register(eachField.name)} name={eachField.name} placeholder={eachField.label} />
                            {_.get(errors, `${eachField.name}.message`, "") && (
                          <Form.Text className="text-danger">
                            {_.get(errors, `${eachField.name}.message`, "")}
                          </Form.Text>
                        )}
                          </Form.Group>
                          {eachField?.rightIcon && (
                            <div className="position-absolute" style={{ top: "40px", right: "20px" }}>
                              {eachField.rightIcon}
                            </div>
                          )}
                        </Col>
                      );
                    })}
                    {/* <Row className="justify-content-between d-flex mt-2 w-100">
                      <Col xs={6}> */}

                  <div className="d-flex justify-content-center align-items-center">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="userRole"
                          id="inlineRadio1"
                          value="TAGTEAM"
                          {...register('userRole')}
                        />
                        <label class="form-check-label" for="inlineRadio1">
                          Tag Team
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="userRole"
                          id="inlineRadio2"
                          value="INTERVIEWER"
                          {...register('userRole')}
                        />
                        <label class="form-check-label" for="inlineRadio2">
                          interviewer
                        </label>
                      </div>
                    </div>
                      <div className='d-flex justify-content-between mt-2'>
                        <div className="w-100 m-1">
                        <Form.Select  disabled={userRole === "TAGTEAM"} {...register("techTrack")} name="techTrack"   aria-label="Default select example">
                          <option value="">Tech Track</option>
                          <option value="java">Java</option>
                          <option value="backEndDeveloper">BackEnd Developer</option>
                          <option value="softwareTesting">Software Testing</option>
                          <option value="frontEndDeveloper">FrontEnd Developer</option>
                          <option value="mobileDevelopment">Mobile Development</option>
                          <option value="fullstack">Full Stack</option>
                          <option value="dataScience">Data Science</option>
                          <option value="softwareArchitecture">Software Architecture</option>
                          <option value="dataBaseDesignandDevelopment">DataBase Design and Development</option>

                        </Form.Select>

                        </div>

                        <div className="mb-1 position-relative w-100 p-0 m-1" >
                        <Form.Group controlId="formBasicEmail">
                         <Form.Control {...register("phoneNo")} name="phoneNo" className="w-100" placeholder="Enter Contact number" />
                        <MdPermContactCalendar style={{position:'absolute', top: "10px",fontSize: "20px", right: "10px",zIndex: 10}}/>
                        {_.get(errors, "phoneNo.message", "") && (
                          <Form.Text className="text-danger">
                            {_.get(errors, "phoneNo.message", "")}
                          </Form.Text>
                        )}
                        </Form.Group>

                        </div>
                      </div>


                  
                    
                  </Row>

                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <button className="loginbutton w-50" type="submit">
                      SignUp
                    </button>
                    <p>
                      <span className="m-2">Already Registered?</span>
                      <a href="/login" color="anchoerText">
                        SignIn
                      </a>
                    </p>
                  </div>
                </form>
              </Card>
             
            </CardGroup>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SignupPage;
