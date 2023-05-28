import { useEffect, useState } from 'react';
import axios from 'axios';
import './SpaceFlight.css';
import NemaSlike from './images/nema_slike.png';

function SpaceFlight() {
  const [flights, setFlights] = useState([]);

  useEffect(()=>{
    axios.get('https://api.spacexdata.com/v2/launches')
    .then((res)=>{
      setFlights(res.data)
    }).catch((err)=>{
      console.log("Error while fetch data from the SpaceX API:", err);
    });
  },[]);

  return (
    <>
    <ul className='flights-list'>
      {flights.map((flight)=>(
        <li key={flight.flight_number}>
          <div className='flight-info'>
            {flight.links.mission_patch_small ? 
                <img src={flight.links.mission_patch_small} alt={flight.mission_name} /> : 
                <img src={NemaSlike} alt="nema slike" />}
            
          </div>
          <div className='flight-data'>
            <h2>{flight.mission_name}</h2>
            <p>Flight number: {flight.flight_number}</p>
            <p>Launch Date: {flight.launch_date_utc}</p>
            <p>Flight Details: {flight.details}</p>
            <p>Launch Year: {flight.launch_year}</p>
            <a href={flight.links.article_link}>Read More About The Launch</a>
          </div>
        </li>
      ))}
    </ul>
    </>

  );
}

export default SpaceFlight;
