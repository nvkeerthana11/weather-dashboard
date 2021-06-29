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
import cloudyd from "./images/cloudy-day-3.svg";
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

require('dotenv').config()

const Hour = ({ search, value, pod }) => {

  const [weather, setWeather] = useState([]);


  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${search}&key=${process.env.REACT_APP_INFO_KEY}&days=7`
      const response = await fetch(url);
      const res = await response.json();
      setWeather(res.data)

    }
    fetchApi();
  }, [search])




  var temps = []
  var array = []
  var icons = []
  var dates = []


  if (weather) {
    weather.map((hour) => (
      temps.push(hour.temp),
      array.push(hour.weather.code),
      dates.push(new Date(hour.ts * 1000).toLocaleString(undefined, {
        month: "long", day: "numeric"
      }))
    ))
  }

  var pod = pod;
  console.log(pod)
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= 801 && array[i] <= 804) {
      if (pod === 'd') {
        icons.push(cloudyd)

      } else {
        icons.push(cloudyn)

      }
    } else if (array[i] >= 200 && array[i] <= 233) {

      icons.push(thunder)
    } else if (array[i] === 800) {
      if (pod === 'd') {
        icons.push(sun)

      } else {
        icons.push(moon)

      }
    } else if (array[i] >= 501 && array[i] <= 522) {
      if (pod === 'd') {
        icons.push(rainyd);

      }
      else {
        icons.push(rainy);

      }
    } else if (array[i] === 600) {
      if (pod === 'd') {
        icons.push(snowyd);

      }
      else {
        icons.push(snowy);

      }
    } else if (array[i] >= 700 && array[i] <= 751) {
      if (pod === 'd') {
        icons.push(<WiDayFog />);

      }
      else {
        icons.push(<WiNightFog />);

      }
    } else if (array[i] >= 601 && array[i] <= 623) {
      icons.push(snowrain)

    } else if (array[i] === 300 || array[i] === 500) {
      icons.push(rain)

    }
  }

  var iconset = icons;
  var val = temps;
  var week = dates;

  var dataMap = val.map((v, i) =>
    ({ "icon": iconset[i], "temp": v, "date": week[i] })
  )





  return (
    <React.Fragment>
      <div>
        <div>
          <Container>
            <Swiper slidesPerView={8}
              className="mySwiper">

              <CardGroup style={{ marginTop: '30px' }}>

                {dataMap.map((data) => (
                  <SwiperSlide>

                    <Card style={{ margin: "20px 0px 0 70px", borderRadius: '10%', width: '5rem', height: '8rem', backgroundColor: '#aeefec', border: 'none', display: 'inline-block' }}>
                      <img style={{ width: "100px", height: "100px", margin: "-10px 0 0 -10px" }} src={data.icon} alt="" />
                      <h6 style={{ textAlign: 'center', margin: '-11px 0 10px 0' }}>{
                        data.date
                      }</h6>

                      {value === 'Celsius' ?
                        <h6 style={{ textAlign: 'center', marginTop: "-7px" }}>{data.temp.toFixed(0)}&deg;C</h6> :

                        <h6 style={{ textAlign: 'center', marginTop: "-7px" }}>{(data.temp * 1.8 + 32).toFixed(0)}&deg;F</h6>
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