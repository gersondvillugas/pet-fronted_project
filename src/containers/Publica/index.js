import React, { Component } from "react";
//import Header from "../../components/Header/index";
import "./style.css";
import axios from "axios";
import { withRouter, Redirect, Link } from "react-router-dom";

import {
  API_BASE_URL,
  ACCESS_USER_ID,
  ACCESS_TOKEN_NAME,
} from "../../constants/apiContants";
class Publica extends Component {
  state = {
    title: "",
    description: "",
    hour: "",
    latitude:"",
    longitude:"",
    type: "",
    user:localStorage.getItem(ACCESS_USER_ID),


    users: [],
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    console.log(name);
    console.log(value);
  };
  componentDidMount(){
    //console.log(localStorage.getItem('USER'))
   // 'bar'
   navigator.geolocation.getCurrentPosition(  position => {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    this.setState({
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,
      error:null
    });
   // console.log(this.state.latitude)
  },
  error => this.setState({error:error.message}),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
  
   
 
}   

  sendDetailsToServer = () => {
    if (this.state.title.length && this.state.description.length) {
      //  props.showError(null);
      const payload = {
        title: this.state.title,
        description:this.state.description,
        hour:this.state.hour,
        type:this.state.type,
        latitude:this.state.latitude,
        longitude:this.state.longitude,
        user:this.state.user,
        
      };
      console.log(payload);
      axios
        .post("http://localhost:4000/api/public/add", payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data.public);
            //   console.log("usuario:  asd"+response.dat)
            //localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
            //localStorage.setItem(ACCESS_USER_ID, response.data.usuario._id);
             
      //      this.redirectToproject();
            //props.showError(null)
          } else {
            //  props.showError("Some error ocurred");
            console.log("some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log("eeeeee");
        });
    } else {
      // props.showError('Please enter valid username and password')
      alert("Please enter valid username and password'");
    }
  };
  redirectToproject = () => {
    //this.props.history.push("/add");
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.user) {
      this.sendDetailsToServer();

      console.log("hola");
    } else {
      // props.showError('Passwords do not match');
      alert("Passwords do not match");
    }
  };


render(){
  return(
    <React.Fragment>
     <section className="addnew">
 
  <form 
     onSubmit={this.handleSubmit}

  >
     <br></br>
    <div className="form-group">
    
      <span className="col-md-1 col-md-offset-2 text-center">
        Titulo
      </span>

      <div className="col-md-8">
        <input
          className="form-control input-lg"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          type="text"
        />
      </div>
    </div>
    <div id="radioButton" class="caja">
                <label id="tipo">TIPO:</label>
                <div id="radios"  >
                    <input type="radio" 
                    checked={this.state.type === "veterianaria"}
                     value="veterianaria"
                     onChange={this.handleChange}
                     name="type"
                     id="radio"/>
                    veterianaria

                    <input type="radio" 
                     checked={this.state.type === "adopcion"}
                      onChange={this.handleChange}
                     value="adopcion"
                     name="type"
                    
                    id="radio"/>
                    adopcion
                </div>
     </div>
   
    <div class="form-group">
      <span class="col-md-1 col-md-offset-2 text-center">
        Descripcion
      </span>
      <div class="col-md-8">
        <textarea
          class="form-control"
           value={this.state.description}
           onChange={this.handleChange}

          name="description"
          placeholder="Enter your massage for us here. We will get back to you within 2 business days."
          rows="7"
        ></textarea>
      </div>
    </div>
    

    <div className="form-group">
      <span className="col-md-1 col-md-offset-2 text-center">
        HORARIO
      </span>

      <div className="col-md-8">
        <input
          className="form-control input-lg"
          name="hour"
          onChange={this.handleChange}
          value={this.state.hour}
          type="text"
        />
      </div>
    </div>
   
   
    <div className="form-group">
      <button type="submit" >publicar proyecto</button>
    </div>
  </form>
</section>       
    </React.Fragment>
  )
}
  
}
export default withRouter(Publica);