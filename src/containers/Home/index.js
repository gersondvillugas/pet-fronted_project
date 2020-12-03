import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import veterinaria from '../../assets/img/veterinaria.png';
import adopcion from '../../assets/img/adopcion.png';
import animal from '../../assets/img/animal.png';

import './style.css';
class Home extends Component {
render() {
  return (
    <div className="container">
        <div className="card">
            <div className="icono">
                <img src={veterinaria} alt="icono"/>
            </div>
            <div className="texto">
                Encuentra veterinarias cerca tuyo
            </div>
        </div>
        <div className="card">
            <div className="icono">
                <img src={adopcion} alt="icono"/>
            </div>
            <div className="texto">
                Adopta animales cerca tuyo
            </div>
        </div>
        <div className="card">
            <div className="icono">
            <img src={animal} alt="icono"/>
            </div>
            <div className="texto">
                Pon animales en adopcion,para que personas cerca tuyo puedan adoptarlas
            </div>
        </div>
    </div> 
         
     
    )
 
}

}
export default Home;
