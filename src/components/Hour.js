import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Hour.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from './Chart';
import cloudyd from "./images/cloudy-day-2.svg";
import cloudyn from "./images/cloudy-night-3.svg";
import cloudy from "./images/cloudy.svg"
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
import img from "./images/cloudy-day-1.svg";
require('dotenv').config()

const Hour = ({ search, value, pod }) => {
  console.log(process.env)
  const [weather, setWeather] = useState([]);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${search}&key=${process.env.REACT_APP_INFO_KEY}&days=7`
      const response = await fetch(url);
      const res = await response.json();
      setWeather(res.data)


    }
    fetchApi();
  }, [])


  var pod = pod;
  const time = new Date().getHours()

  var desc = " ";
  if (weather) {
    weather.map((hour) => (

      desc = hour.weather.code

    ))
  } else {
    desc = "no data";
  }

  var icon = "";

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



  return (
    <React.Fragment>
      <div>
        <div>
          <Container>
            <Swiper slidesPerView={8}
              className="mySwiper">
              <CardGroup style={{ marginTop: '30px' }}>

                {weather.map((d) => (
                  <SwiperSlide>
                    <Card className="cards-h" style={{ margin: "20px -30px 0 60px", borderRadius: '10%', width: '5rem', height: '8rem', backgroundColor: '#aeefec', border: 'none' }}>

                      {/* <img src={`https://www.weatherbit.io/static/img/icons/${d.weather.icon}.png`} alt="" /> */}
                      <img src={icon} alt=" " />
                      <h6 style={{ textAlign: 'center', margin: '-11px 0 10px 0' }}>{new Date(d.ts * 1000).toLocaleString(undefined, {
                        month: "long", day: "numeric"
                      })}</h6>

                      {value === 'Celsius' ?
                        <h6 style={{ textAlign: 'center', marginTop: "-7px" }}>{d.temp.toFixed(0)}&deg;C</h6> :

                        <h6 style={{ textAlign: 'center', marginTop: "-7px" }}>{(d.temp * 1.8 + 32).toFixed(0)}&deg;F</h6>
                      }
                    </Card>
                  </SwiperSlide>
                ))}
              </CardGroup>
            </Swiper>
          </Container>

          <Chart search={search}
            value={value}
          />
        </div>

      </div>

    </React.Fragment>
  );


}

export default Hour