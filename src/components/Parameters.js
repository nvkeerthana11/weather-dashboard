import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import cloudy from "./images/cloudy.svg"
import { WiThermometer } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { GiRoad } from "react-icons/gi";
import './Info.css'
const Parameters = (props) => {
    return (
        <>
            <div>
                <Card style={{ width: "250px", border: 0, height: "110px", margin: " 30px 0 -40px 50px", display: "inline-block", boxShadow: "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)" }}>
                    <h1 style={{ float: "left", margin: "20px 0 -10px 30px", color: "#045762" }}><GiRoad size={60} /></h1>
                    <h3 style={{ display: "inline-block", margin: "30px 0 0 20px", color: "#045762" }}>{props.visibility} km</h3>
                    <h6 style={{ margin: "3px 0 0px 110px", color: "#6f9eaf" }}>Visibility</h6>
                </Card>
                <Card style={{ width: "250px", border: 0, height: "110px", margin: "30px 0 -40px 25px", display: "inline-block", boxShadow: "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)" }}>
                    <h1 style={{ float: "left", margin: "20px 0 0 30px", color: "#BF1363" }}><WiHumidity size={65} /></h1>
                    <h3 style={{ display: "inline-block", margin: "30px 0 10px 0px", color: "#BF1363" }}>{props.humidity} %</h3>
                    <h6 style={{ margin: "-8px 0 0 90px", color: "#6f9eaf" }}>Humidity</h6>
                </Card>
                <Card style={{ width: "250px", border: 0, height: "110px", margin: "30px 0 -40px 25px", display: "inline-block", boxShadow: "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)" }}>
                    <h1 style={{ float: "left", margin: "20px 0 0 20px", color: "#FB9300" }}><WiThermometer size={65} /></h1>
                    <h3 style={{ display: "inline-block", padding: "27px 0 0 0", color: "#FB9300" }}>{props.pressure} mb</h3>
                    <h6 style={{ margin: "-5px 0 0 80px", color: "#6f9eaf" }}>Pressure level</h6>
                </Card>
                <Card style={{ width: "250px", border: 0, height: "110px", margin: " 35px 0 -40px 25px", display: "inline-block", boxShadow: "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)" }}>
                    <img style={{ width: "100px", height: "100px", margin: "8px 0 0 0" }} src={cloudy} alt=" " />
                    <h3 style={{ display: "inline-block", color: "#2541B2" }}>{props.clouds} %</h3>
                    <h6 style={{ margin: "-45px 0 0 100px", color: "#6f9eaf" }}>Clouds coverage</h6>
                </Card>
            </div>
        </>
    )
}

export default Parameters
