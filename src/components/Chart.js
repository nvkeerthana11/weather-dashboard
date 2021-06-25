import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import './Chart.css'
import axios from 'axios'


const Chart = ({ search }) => {

    const [chartData, setchartData] = useState({});

    const chart = () => {

        let dates = [];
        let temp = [];

        axios
            .get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${search}&key=9152375a32484786a83e086eb0b4a4d2&days=7`)
            .then(res => {

                for (const data of res.data.data) {
                    dates.push(new Date(data.ts * 1000).toLocaleString(undefined, {
                        month: "long", day: "numeric"
                    }))

                    temp.push(data.temp)


                }

                setchartData({


                    labels: dates,
                    datasets: [

                        {

                            label: "Temperature",
                            data: temp,
                            backgroundColor: "#F1F4FB",
                            borderColor: "#3D64EA",
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
            <div className="graph">

                <Line data={chartData}

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

export default Chart