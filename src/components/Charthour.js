import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import './Chart.css'
import axios from 'axios'
require('dotenv').config()

const Charthour = ({ trigger, setTrigger, search }) => {

    const [lineData, setlineData] = useState({});

    const chart = () => {
        let time = [];
        let temp = [];
        axios
            .get(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${search}&key=${process.env.REACT_APP_INFO_KEY}&hours=24`)
            .then(res => {


                for (const data of res.data.data) {
                    time.push(new Date(data.ts * 1000).toLocaleTimeString(undefined, {
                        minute: "numeric", hour: "numeric"
                    }))
                    temp.push(data.temp)
                }



                setlineData({


                    labels: time,
                    datasets: [

                        {
                            label: "Temperature",
                            data: temp,
                            borderColor: "#FF577F",
                            backgroundColor: "#FFDCDC",
                            fillColor: "#fff",
                            strokeColor: "#ffb88c",
                            pointColor: "#fff",
                            pointStrokeColor: "#ffb88c",
                            pointHighlightFill: "#ffb88c",
                            pointHighlightStroke: "#fff",
                            borderWidth: 3

                        }
                    ]

                })
            })
            .catch(err => {
                console.log(err)
            });



    }

    useEffect(() => {
        chart();

    }, []);


    return (
        <div className="graphs">



            <h3 style={{ padding: "3% 0 0 3%" }}>Temperature Overtime</h3>
            <div className="graph" >

                <Line data={lineData}

                    options={{
                        responsive: true,


                        scales: {
                            yAxes: [{
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10

                                },
                                gridLines: {
                                    drawOnChartArea: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10

                                },
                                gridLines: {
                                    drawOnChartArea: false
                                }
                            }]

                        }
                    }}
                />
            </div>
        </div>

    )
}

export default Charthour