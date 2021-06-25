import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Container from 'react-bootstrap/Container'
import Hour from './Hour'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import Charthour from './Charthour';
import img from "./images/cloudy-day-1.svg";
import SwiperCore, {
  Navigation
} from 'swiper/core';
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
import rain from './images/rainy-4.svg'
import { WiDayFog } from "react-icons/wi";
import { WiNightFog } from "react-icons/wi";
SwiperCore.use([Navigation]);
require("dotenv").config()

const Hourly = ({ value, trigger, search }) => {


  const [hourdata, setHourdata] = useState([]);


  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${search}&key=${process.env.REACT_APP_INFO_KEY}&hours=24`
      const response = await fetch(url);
      const res = await response.json();
      setHourdata(res.data)
    }
    fetchApi();
  }, [search])


  var pod = " "
  const time = new Date().getHours()

  var desc = " ";
  if (hourdata) {
    hourdata.map((hour) => (

      desc = hour.weather.code,

      pod = hour.pod
    ))
  } else {
    desc = "no data";
  }

  var icon = "";
  console.log(pod)
  switch (true) {
    case desc >= 801 && desc <= 804:

      if (pod === 'd') {
        icon = cloudyd;
      }
      else {
        icon = cloudyn
      }
      break;
    case desc === 800:
      if (pod === 'd') {
        icon = sun;
      }
      else {
        icon = moon;
      }
      break;
    case desc >= 200 && desc <= 233:

      icon = thunder;
      break;

    case desc === 600:
      if (pod === 'd') {
        icon = snowyd;
      }
      else {
        icon = snowy;
      }
      break;

    case desc >= 601 && desc <= 623:
      icon = snowrain;
      break;

    case desc >= 501 && desc <= 522:
      if (pod === 'd') {
        icon = rainyd;
      }
      else {
        icon = rainy;
      }
      break;

    case 300 || 500:
      icon = rain;
      break;

    case desc >= 700 && desc <= 751:
      if (pod === 'd') {
        icon = <WiDayFog />;
      }
      else {
        icon = <WiNightFog />
      }

      break;


    default:
      break;
  }


  return trigger ? (
    <div >
      <div>

        <Container>

          <div style={{ backgroundColor: 'white' }}>
            <Swiper slidesPerView={7} spaceBetween={30} navigation={true}
              className="mySwiper">
              <CardGroup style={{ margin: '30px 0 20px 0' }}>

                {hourdata.map((hour) => (
                  <SwiperSlide>
                    <Card style={{ margin: "20px 20px 50px 80px", borderLeft: "-600px", borderRadius: '10%', width: '5rem', height: '8rem', backgroundColor: "#f1c6e7", boxShadow: "0 20px 20px #e1ccec,  0px 0px 20px #e1ccec", border: 'none' }} >


                      <img src={icon} alt="" />
                      <h6 style={{ margin: '-5px 0 10px 10px', color: "#763857", fontWeight: "bolder" }}>{new Date(hour.ts * 1000).toLocaleTimeString(undefined, {
                        minute: "numeric", hour: "numeric"
                      })}</h6>
                      {value === 'Celsius' ?
                        <h6 style={{ textAlign: 'center', marginTop: "-7px", color: "#763857", fontWeight: "bolder" }}>{hour.temp.toFixed(0)}&deg;C</h6> :
                        <h6 style={{ textAlign: 'center', marginTop: "-7px", color: "#763857", fontWeight: "bolder" }}>{(hour.temp * 1.8 + 32).toFixed(0)}&deg;F</h6>}

                    </Card>
                  </SwiperSlide>
                ))}

              </CardGroup>
            </Swiper>
          </div>
        </Container>

      </div>
      <Charthour search={search} />


    </div>
  ) : (

    <Hour
      search={search}
      value={value}
      pod={pod}
    />


  );



}



export default Hourly

