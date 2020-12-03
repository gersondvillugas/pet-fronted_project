import React, { Component } from 'react';
import './style.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";

import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043232-avatar-batman-comics-hero_113278.png',
  iconSize: [41, 51], // size of the icon
  iconAnchor: [20, 51], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -51] // point from which the popup should open relative to the iconAnchor                                 
}); 

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = greenIcon;




class SimpleExample extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: -12.046374,
      lng: -77.042793,
      zoom: 13,
      publics: [],
      filteredPublics: []

    }
   
  }
 
  componentDidMount() {
    
    axios.get('http://localhost:4000/api/public')

      .then((response) => {
        // handle success
        //console.log(response);
        console.log(response.data.publics);
        this.setState({ publics: response.data.publics })
        this.setState({ filteredPublics: response.data.publics })
        console.log(this.state.publics)
        console.log("object")
        console.log(this.state.filteredPublics)
        console.log("object")

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      this.setState({
        filteredPublics: this.state.publics
      })
    // console.log("filteredPublics:"+this.state.filteredPublics+"algo")  

  }
  handleClick = event => {
    const byType = event.target.value
    console.log(byType)
    let filteredPublics = []
    if(event.target.value === 'all'){
      filteredPublics = this.state.publics
    } else{
      filteredPublics = this.state.publics.filter(pu => pu.type === byType)
    }
    
    this.setState({filteredPublics: filteredPublics})

  }


  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="conta" >
        <div className="but">
        <button value='all' onClick={this.handleClick}>All</button>
          <button value='veterinaria' onClick={this.handleClick}>veterinaria</button>
           <button value='adopcion' onClick={this.handleClick}>adopcion</button>

        </div>

        <MapContainer className="leaflet-container" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {this.state.filteredPublics.map( (pub,index) => {
            return (
              <Marker
                key={index}
                position={[pub.latitude,  pub.longitude  ]  }



              >
                <Popup>
                  {pub.title} <br /> horario de atencion : {pub.hour}.
               </Popup>
              </Marker>
            );
          })}

        </MapContainer>
      </div>
    );
  }
}
export default SimpleExample;
