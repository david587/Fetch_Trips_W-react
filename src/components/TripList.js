import { useState } from "react";
import {useFetch} from "../hooks/useFetch"

//styles
import "./TripList.css"


export default function TripList() {
    const [url,setUrl]= useState("http://localhost:3000/trips")
    const {data: trips, isPending, error} = useFetch(url,{type: "GET"})
    
  return (
    <div className="trip-list">
        <h2>Triplist</h2>

        {/* if pending is true show loading message */}
        {isPending&& <div>Loading trips...</div>}
        {error && <div>{error}</div>}
        <ul>
            {/* //if data is null dont show anyting, if theres data it shows it */}
            {trips && trips.map(trip => (
                <li key={trip.id}>
                    <h3>{trip.title}</h3>
                    <p>{trip.price}</p>
                </li>
            ))}
        </ul>
        <div className="filters">
            {/* onCLick set the url to-> filtered , only loc=europe */}
            <button onClick={()=> setUrl("http://localhost:3000/trips?loc=europe")}>
                European Trips
            </button>
            <button onClick={()=>setUrl("http://localhost:3000/trips")}>
                All trips
            </button>
        </div>
    </div>
  )
}
