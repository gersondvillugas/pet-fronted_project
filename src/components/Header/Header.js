import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.jpg';
import './style.css';
class Header extends Component {
render() {
  return (
         
            <div className="header">
                <div  className="logo">
                    <img src={logo} />
                </div>
                <nav className= "navigation">
                    <ul className= "lista">
                        <li><Link to="/homepage">Homepage</Link></li>
                        <li><Link to="/Mapview">Mapview</Link></li>
                        <li><Link to="/publica">publica</Link></li>
                        <li><Link to="/login">Login</Link></li>

                       
                    </ul>
                </nav>
         </div> 
        
     
    )
 
}

}
export default Header