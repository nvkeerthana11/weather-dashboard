import React, { useState, useEffect } from "react";
import { WiDayFog } from "react-icons/wi";
import { WiNightFog } from "react-icons/wi";
import cloudyd from "./images/cloudy-day-2.svg";
import cloudyn from "./images/cloudy-night-3.svg";
import sun from './images/day.svg'
import moon from './images/night.svg'
import thunder from './images/thunder.svg'
import snowy from './images/snowy-6.svg'
import snowyd from './images/snowy-1.svg'
import snowrain from './images/rainy-7.svg'
import rainyd from './images/rainy-3.svg'
import rainy from './images/rainy-6.svg'
import rain from './images/rainy-4.svg';
import Details from './Details'
import Parameters from './Parameters'

const Info = ({ search, trigger, image, cityName }) => {
    const [city, setData] = useState(null);

    console.log(search);

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${search}&key=9152375a32484786a83e086eb0b4a4d2`;
            const response = await fetch(url);
            const res = await response.json();
            if (res.data) {
                setData(res.data[0]);
            }
            else {
                var data = " ";
            }

        };
        fetchApi();
    }, [search]);


    const currDate = new Date().toLocaleString(undefined, {
        month: "long",
        day: "numeric",
        weekday: "long"
    });
    const currTime = new Date().toLocaleTimeString(undefined, {
        minute: "numeric",
        hour: "numeric"
    });


    var sunrise = ' '
    var sunset = ' '
    var moonrise = ' '
    var moonset = ' '
    const time = new Date().getHours()
    var uv = ' ';
    var windspeed = " ";
    var desc = " ";
    var humidity = " ";
    var visibility = " ";
    var clouds = " ";
    var pressure = " ";
    var pod = " ";
    if (city) {
        sunrise = new Date(city.sunrise_ts * 1000).toLocaleTimeString(undefined, {
            minute: "numeric",
            hour: "numeric"
        });
        sunset = new Date(city.sunset_ts * 1000).toLocaleTimeString(undefined, {
            minute: "numeric",
            hour: "numeric"
        });
        moonrise = new Date(city.moonrise_ts * 1000).toLocaleTimeString(undefined, {
            minute: "numeric",
            hour: "numeric"
        });
        moonset = new Date(city.moonset_ts * 1000).toLocaleTimeString(undefined, {
            minute: "numeric",
            hour: "numeric"
        });
        desc = city.weather.code;
        uv = city.uv.toFixed(1);
        windspeed = city.rh.toFixed(0);
        visibility = city.vis.toFixed(0);
        humidity = city.rh.toFixed(0);
        clouds = city.clouds.toFixed(0);
        pressure = city.pres.toFixed(0);
        pod = city.pod
    } else {
        desc = "no data";
    }
    console.log(time)

    var icon = "";

    switch (true) {
        case desc >= 801 && desc <= 804:

            if (time < 12) {
                icon = cloudyd;
            }
            else if (time >= 12 && time <= 17) {
                icon = cloudyd
            }
            else if (time >= 17 && time <= 24) {
                icon = cloudyn
            }
            break;
        case desc === 800:
            if (time < 12) {
                icon = sun;
            }
            else if (time >= 12 && time <= 17) {
                icon = sun
            }
            else if (time >= 17 && time <= 24) {
                icon = moon
            }
            break;
        case desc >= 200 && desc <= 233:

            icon = thunder;
            break;

        case desc === 600:
            if (time < 12) {
                icon = snowyd;
            }
            else if (time >= 12 && time <= 17) {
                icon = snowyd
            }
            else if (time >= 17 && time <= 24) {
                icon = snowy
            }
            break;

        case desc >= 601 && desc <= 623:
            icon = snowrain;
            break;

        case desc >= 501 && desc <= 522:
            if (time < 12) {
                icon = rainyd;
            }
            else if (time >= 12 && time <= 17) {
                icon = rainyd
            }
            else if (time >= 17 && time <= 24) {
                icon = rainy
            }
            break;

        case 300 || 500:
            icon = rain;
            break;

        case desc >= 700 && desc <= 751:
            if (time < 12) {
                icon = <WiDayFog />;
            } else if (time >= 12 && time <= 17) {
                icon = <WiDayFog />
            }
            else if (time >= 17 && time <= 24) {
                icon = <WiNightFog />
            }

            break;


        default:
            break;
    }



    return (

        <>
            {!city ? (
                <p>no data</p>
            ) : (
                <>
                    <Parameters visibility={visibility} humidity={humidity} clouds={clouds} pressure={pressure} />
                    <div className="main-card">

                        <h6 style={{ paddingTop: "6%", marginLeft: "20px" }}>
                            {currDate}
                        </h6>
                        <h6 style={{ margin: "-25px 0 100px 330px" }}>
                            {currTime}
                        </h6>

                        <img style={{ margin: "0px 0 0 20px", height: "150px", width: "150px" }} src={icon} alt="" />

                        <div style={{ display: "inline-block" }}>
                            <h1
                                style={{ marginLeft: "0px", fontSize: "80px", color: "#511281" }}
                            >
                                {city.temp.toFixed(0)}
                                <h1 style={{ display: "inline" }}>&deg;C</h1>
                            </h1>
                            <div style={{ clear: "both", marginLeft: "0px" }}>
                                <h3
                                    style={{ float: "left", marginLeft: "0px", color: "#28c3d4" }}
                                >
                                    {city.max_temp.toFixed(0)}
                                    <h4 style={{ display: "inline" }}>&deg;C</h4>
                                </h3>

                                <h3
                                    style={{ float: "left", marginLeft: "15px", color: "#ff7a00" }}
                                >
                                    {city.min_temp.toFixed(0)}
                                    <h4 style={{ display: "inline" }}>&deg;C</h4>
                                </h3>
                                <div className="vl"></div>
                                <h5 style={{ position: "absolute", color: "#ff7a00" }}>
                                    {city.weather.description}
                                </h5>
                            </div>
                        </div>


                    </div>
                </>
            )}
            <div style={{ position: "absolute", float: "left", display: "inline-block" }}>
                <Details
                    uv={uv}
                    windspeed={windspeed}
                    sunrise={sunrise}
                    sunset={sunset}
                    moonrise={moonrise}
                    moonset={moonset}
                />
            </div>
        </>
    );

};

export default Info;
