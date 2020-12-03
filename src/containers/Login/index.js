
  
import React, { Component, useState } from "react";
//import Header from "../../components/Header/index";

import axios from "axios";
//import './LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME ,ACCESS_USER_ID} from "../../constants/apiContants";
import { withRouter } from "react-router-dom";
import "./style.css";
function Login(props) {
  const [state , setState] = useState({
    email : "",
    password : "",

    successMessage: null
})
const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
}

const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload={
        "email":state.email,
        "password":state.password,
    }
    axios.post(API_BASE_URL+'/user/login', payload)
        .then(function (response) {
            if(response.status === 200){
                setState(prevState => ({
                    ...prevState,
                    'successMessage' : 'Login successful. Redirecting to home page..'
                }))
                console.log(response.data.message);

                localStorage.setItem(ACCESS_TOKEN_NAME,response.data.message.token);
                localStorage.setItem(ACCESS_USER_ID,response.data.message.user.userId)
                localStorage.setItem("USER",JSON.stringify(response.data.message.user))
             
                console.log("hola mundo")
        //        props.showError(null)
                  alert("login succesfull")
                  props.history.push('/');
            }
            else if(response.code === 204){
      //          props.showError("Username and password do not match");
            }
            else{
      //       props.showError("Username does not exists");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
const redirectToworker = () => {
    //props.updateTitle('Home')
    props.history.push('/signup/w');
}
const redirectToRegister = () => {
    props.history.push('/signup/w'); 
    //props.updateTitle('Register');
}
  return (
    <React.Fragment>
      <div class="login-form">
        <form action="/examples/actions/confirmation.php" method="post">
          <h2 class="text-center">Log in</h2>
          <div class="form-group">
            <input
              type="email"
              id="email"
              onChange={handleChange}
              value={state.email}
              class="form-control"
              placeholder="email"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              onChange={handleChange}
              value={state.password}
              id="password"
              class="form-control"
              placeholder="Password"
              required="required"
            />
          </div>
          <div class="form-group">
            <button type="submit"
             class="btn btn-primary btn-block"
             onClick={handleSubmitClick}

             >
              Log in
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
        <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(Login);
