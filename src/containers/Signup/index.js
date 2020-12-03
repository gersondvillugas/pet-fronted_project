//import logo from "./logo.svg";
import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME,ACCESS_USER_ID} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function Signupw(props) {
  const [state,setState]=useState({
    fullname:"",
    email : "",
    password : "", 
    confirmPassword: "",
   
    successMessage: null
  })
  const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
 }
 const sendDetailsToServer = () => {
  if(state.email.length && state.password.length) {
    //  props.showError(null);
      const payload={
          "fullname":state.fullname,
          "email":state.email,
          "password":state.password,
      }
      axios.post(API_BASE_URL+'/user/add', payload)
          .then(function (response) {
              if(response.status === 200){
                  console.log(response.data)
                  setState(prevState => ({
                      ...prevState,
                      'successMessage' : 'Registration successful. Redirecting to home page..'
                  }))
                  console.log(response.data.usuario._id)
                  localStorage.setItem(ACCESS_USER_ID,response.data.usuario._id);
                  redirectToHome();
                  //props.showError(null)
              } else{
                //  props.showError("Some error ocurred");
                console.log("some error ocurred")
              }
           })
          .catch(function (error) {
              console.log(error);
              console.log("eeeeee")
          });    
  } else {
     // props.showError('Please enter valid username and password')    
     alert("Please enter valid username and password'")
  }
  
}
const redirectToHome = () => {
//  props.updateTitle('Home')
  props.history.push('/');
}
const redirectToLogin = () => {
  //props.updateTitle('Login')
  props.history.push('/login'); 
}
const handleSubmitClick = (e) => {
  e.preventDefault();
  if(state.password === state.confirmPassword) {
      sendDetailsToServer()    
  } else {
     // props.showError('Passwords do not match');
     alert("Passwords do not match")
  }
}
  return (
   <section className="addnew">
            <form  method="post">
          <h2 class="text-center">Sing up</h2> 
          <div class="form-group">
            <input
              type="text"
              id="fullname"
              class="form-control"
              placeholder="Fullname"
              value={state.fullname}
              required="required"
              onChange={handleChange}
            />
          </div>
          <div class="form-group"> 
            <input
              type="email"
              id="email"
              class="form-control"
              placeholder="Enter email"
              value={state.email}
              required="required"
              onChange={handleChange}

            />
          </div>
          <div class="form-group">
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="Password"
              value={state.password}
              required="required"
              onChange={handleChange}

            />
          </div>
          <div class="form-group">
            <input
              type="password"
              id="confirmPassword" 

              class="form-control"
              placeholder="Confirmed password"
              value={state.confirmPassword}
              required="required"
              onChange={handleChange}
              
            />
          </div>
         

          <div class="form-group">
            <button type="submit"
             class="btn btn-primary btn-block"
             onClick={handleSubmitClick}
              >
               Register
            </button>
          </div>
          <div class="clearfix">
            <label class="float-left form-check-label">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" class="float-right">
              Forgot Password?
            </a>
          </div>
        </form>
        <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
        </div>
        <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
      
      </section>
  
  );
}

export default withRouter(Signupw);