import React,{useEffect,useState} from "react";
import _, { values } from "lodash";
import {
  Card,
  CardGroup,
  Row,
  Col,
  Container,
  Button,
  Form,
} from "react-bootstrap";
import userPng from "../assets/images/user_icon.png";
import contactImg from "../assets/images/loginleft-img.png";
import "../styles/login.css";
import { FiMail } from "react-icons/fi";
import {
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import googleImg from "../assets/images/Google__G__Logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
function LoginPage(props) {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Should be valid email")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const email = watch("email");
  const password = watch("password");
  const onSubmit = async (values) => {
    console.log(values)
    localStorage.setItem("email",values.email)
    // const findUserExist = users.find(each => (each.email === values.email) && (each.password === values.password))
    login(values).then((res) =>{
      console.log(res)
      // if(findUserExist){
        // alert("Login was success")
        
        localStorage.setItem("user", JSON.stringify(res.data.userRole))

        console.log(res.data.userRole)
        console.log(values.email)
        if(res.data.userRole === "INTERVIEWER"){
          axios.get(`http://localhost:8080/user-service/api/v1/reg/getbyemail/${values.email}`).then(resp=>{
          localStorage.setItem("TechTrack",JSON.stringify(resp.data[0].techTrack))
        })
          navigate("/availabilitySlots")
        }else{
          navigate("/tagTeam")
        }
      
    }).catch(err=> {
      alert("Failed to login")
    })
    // if(findUserExist){
    //   alert("Login was success")
    //  // localStorage.setItem("user", JSON.stringify(findUserExist))
    //   if(findUserExist.userrole === "interviewer"){
    //     navigate("/availabilitySlots")
    //   }else{
    //     navigate("/tagTeam")
    //   }s
    // }else{
    //   alert("Failed to login")
    // }
    // const findUserExist = users.find(each => (each.email === values.email) && (each.password === values.password))
    // if(findUserExist){
    //   alert("Login success")
    //   localStorage.setItem("user", JSON.stringify(findUserExist))
    //   if(findUserExist.userrole === "interviewer"){
    //     navigate("/availabilitySlots")
    //   }else{
    //     navigate("/tagTeam")
    //   }
    // }else{
    //   alert("Failed to login")
    // }
  };
  const loadUsers =() => {
    // try{

      axios.post('http://localhost:8080/authentication-service/api/v1/auth/login',values).then(resp=>{
        console.log("Inside")
         
      }).then(resp=>{}).catch(err=>{

      })
      // setUsers(response.data)
      
      
    // }
    // catch(err){
    //   console.log(err)
    // }
    
  }
  // useEffect(() => {
  //  loadUsers()
  // }, [])
  return (
    <div className="App">
      <div className="d-flex vh-100 justify-content-md-center align-items-center">
        <Row className="justify-content-center">
          <Col md={9}>
            <CardGroup>
              <Card>
                <Card className="cardLeft d-flex justify-content-center align-items-center">
                  <img className="cardLeft-img" src={contactImg} alt="logo" />
                  <p className="cardLeft-title">BOOK YOUR SLOT</p>
                </Card>
              </Card>
              <Card style={{ padding: "30px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="d-flex justify-content-center align-items-center">
                    <img style={{ width: "24%" }} src={userPng} alt="logo" />
                  </div>
                  <br />
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-2 position-relative"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Email </Form.Label>
                        <Form.Control
                          {...register("email")}
                          name="email"
                          placeholder="Enter email"
                        />
                        {_.get(errors, "email.message", "") && (
                          <Form.Text className="text-danger">
                            {_.get(errors, "email.message", "")}
                          </Form.Text>
                        )}
                        <FiMail className="loginiconImg" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group
                    className="mb-4 position-relative"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                      {...register("password")}
                      name="password"
                      type="password"
                      placeholder="Enter password"
                    />
                    {_.get(errors, "password.message", "") && (
                      <Form.Text className="text-danger">
                        {_.get(errors, "password.message", "")}
                      </Form.Text>
                    )}
                    <AiOutlineLock className="loginiconImg" />
                  </Form.Group>
                  <div>
                    <a href="#" color="anchoerText">
                      Forgot your password?
                    </a>
                  </div>
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <button
                      disabled={!email || !password}
                      className={
                        !email || !password ? "disableLoginBtn" : "loginbutton"
                      }
                      type="submit"
                    >
                      LOGIN
                    </button>
                    <a href="/signup" color="anchoerText">
                      Sign Up
                    </a>
                  </div>
                  {/* <div className="d-flex justify-content-center align-items-center mt-3">
                    <img
                      src={googleImg}
                      alt="googleimg"
                      height="20px"
                      width="20px"
                      style={{ cursor: "pointer" }}
                    />
                  </div> */}
                </form>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default LoginPage;