import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import {
    buildStyles
} from "react-circular-progressbar";
import { WiMoonset } from "react-icons/wi";
import { WiMoonrise } from "react-icons/wi";
import 'react-circular-progressbar/dist/styles.css';
import { WiSunset } from "react-icons/wi";
import VisibilitySensor from "react-visibility-sensor";
import { WiSunrise } from "react-icons/wi";
import { RiWindyFill } from "react-icons/ri";
import Card from "react-bootstrap/Card";
import sun from './images/day.svg'
import { render } from 'react-dom';
import Compass from 'react-coord-compass';
import GaugeChart from 'react-gauge-chart'
import "bootstrap/dist/css/bootstrap.min.css";

const Details = (props) => {
    var icon = sun
    const chartStyle = {
        height: 300,
        width: 250
    }
    const chartStyles = {
        height: 300,
        width: 250,
        marginTop: -30

    }
    return (
        <div>

            <Card style={{ display: "flex", margin: "69px 0 0 30px", justifyContent: "center", alignItems: "center", width: "300px", height: "190px", border: "0", boxShadow: "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)", float: "left" }}>
                <img src={icon} alt="" style={{ margin: "0 0 0 230px" }} />
                <h5 style={{ margin: "-50px 0 0 -170px", color: "#F37121" }}>
                    UV Index
                </h5>

                <GaugeChart id="gauge-chart1" style={chartStyle}
                    nrOfLevels={400}
                    arcsLength={[0.3, 0.3, 0.3]}
                    colors={['#FFC288', '#FFAB73', '#FF6701']}
                    percent={props.uv / 10}
                    animate={true}
                    arcPadding={0.02}
                    hideText={true}
                />
                <h4 style={{ paddingBottom: "1%", color: "#F37121" }}>
                    {props.uv}
                </h4>
            </Card>
            <div style={{ float: "left" }}>
                <Card style={{ display: "flex", margin: "69px 0 0 30px", justifyContent: "center", alignItems: "center", width: "300px", height: "190px", border: "0", boxShadow: "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)" }}>

                    {/* <div style={{ float: "left", margin: "50px 0 0 500px" }}> */}

                    <h5 style={{ margin: "20px 0 0 -130px", color: "#0779E4" }}>
                        Wind Speed
                    </h5>
                    <h5><RiWindyFill style={{ margin: "-45px 0 0 230px", color: "#0779E4" }} /></h5>


                    <GaugeChart id="gauge-chart1" style={chartStyles}
                        nrOfLevels={400}
                        arcsLength={[0.3, 0.3, 0.3]}
                        colors={['#A2DBFA', '#51C4D3', '#00ABD8']}
                        percent={props.windspeed / 100}
                        animate={true}
                        arcPadding={0.02}
                        hideText={true}
                    />
                    <h4 style={{ paddingBottom: "3.5%", color: "#0779E4" }}>

                        {props.windspeed}m/s
                    </h4>
                </Card>

            </div>
            <div style={{ float: "left" }}>
                <Card style={{ display: "flex", margin: "20px 0 0 30px", justifyContent: "center", alignItems: "center", width: "300px", height: "190px", border: "0", boxShadow: "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)" }}>

                    {/* <div style={{ float: "left", margin: "50px 0 0 500px" }}> */}

                    <h5 style={{ margin: "20px 0 20px -80px", color: "#CF0000" }}>
                        Sunrise & Sunset
                    </h5>
                    <h4 style={{ left: 0 }}>
                        <WiSunrise size={50} color={"orange"} />    {props.sunrise}
                    </h4>
                    <h4 style={{ paddingBottom: "3.5%" }}>
                        <WiSunset size={50} color={"orange"} />     {props.sunset}
                    </h4>
                </Card>

            </div>
            <div style={{ float: "left" }}>
                <Card style={{ display: "flex", margin: "20px 0 0 30px", justifyContent: "center", alignItems: "center", width: "300px", height: "190px", border: "0", boxShadow: "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)" }}>


                    <h5 style={{ margin: "10px 0 20px -50px", color: "#A685E2" }}>
                        Moonrise & Moonset
                    </h5>
                    <h4 style={{ marginLeft: "-30px" }}>
                        <WiMoonrise size={50} color={"#511281"} />{props.moonrise}
                    </h4>
                    <h4 style={{ marginLeft: "-30px" }}>
                        <WiMoonset size={50} color={"#511281"} />{props.moonset}
                    </h4>

                </Card>
            </div>
        </div>
    )
}

export default Details
