import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../Styles/styles.css";
import sunny_icon from "../Assets/sunny_icon.svg";
import rainy_icon from "../Assets/rainy_icon.svg";

import search_icon from "../Assets/search_icon.svg";
import moment from "moment";
import sample_icon from "../Assets/sample_icon.png";

//Chart Js
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function MainPage(){

//Chart settings
const weatherData_array = [
    {
     infoTitle: "Min Temp.",
    },
    {
     infoTitle: "Max Temp.",
    },
    {
     infoTitle: "Feels Like",
    },
    {
     infoTitle: "Humidity",
    },
]
const myArray = ['0','0','0','0'];

const [weatherData,setweatherData] = useState({
    labels: weatherData_array.map((res) => res.infoTitle),
    datasets:[{
        label: "Weather Description",
        backgroundColor: [
            "#199afb","#fec860","#1be5a1","#df7970"
        ],
        data:myArray
    }]
})

function weatherData_setter(array_key){
    setweatherData({
        labels: weatherData_array.map((res) => res.infoTitle),
        datasets:[{
            label: "Weather Description",
            backgroundColor: [
                "#199afb","#fec860","#1be5a1","#df7970"
            ],
            data:array_key
        }]
    })

}


const [data, setData] = useState({})
const [location, setLocation] = useState('')

const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5d0475a26714ff14be263b058ab0a0b1`;

function trigger_Axios(){
    axios.get(url).then((response) => {
        setData(response.data)

        //Update the value of graph
        const new_Array = [
            response.data.main.temp_min,
            response.data.main.temp_max,
            response.data.main.feels_like,
            response.data.main.humidity
        ];
        weatherData_setter(new_Array)

        let city = document.getElementById("input_key").value;
        for(var i = 0 ; i < document.getElementsByClassName("city_name").length ; i++){
            document.getElementsByClassName("city_name")[i].textContent = city;
        }
    })
}

const searchLocation = (event) => {
  if (event.key === 'Enter') {
    trigger_Axios();
  }
}

function search_btn(){
    trigger_Axios();
}



// Set default weather
function trigger_Axios_default(){
    const url_default = `https://api.openweathermap.org/data/2.5/weather?q=Calumpit&units=metric&appid=5d0475a26714ff14be263b058ab0a0b1`;
    axios.get(url_default).then((response) => {
        setData(response.data)
        //Update the value of graph
        const new_Array = [
            response.data.main.temp_min,
            response.data.main.temp_max,
            response.data.main.feels_like,
            response.data.main.humidity
        ];
        weatherData_setter(new_Array)

        let city = "Philippines";
        for(var i = 0 ; i < document.getElementsByClassName("city_name").length ; i++){
            document.getElementsByClassName("city_name")[i].textContent = city;
        }
    })
}

if(location === ""){
    trigger_Axios_default();
}


return(
<div 
    className=
    {( data.main ? 
        data.weather[0].main.toLowerCase() == "thunderstorm" || 
        data.weather[0].main.toLowerCase() == "drizzle" || 
        data.weather[0].main.toLowerCase() == "rain" ||                 
        data.weather[0].main.toLowerCase() == "snow" ?
             "main_container rainy_container"
        : 
        data.weather[0].main.toLowerCase() == "tornado" ?
            "main_container rainy_container"
            :
            "main_container sunny_container"
    : 
    "main_container sunny_container"  )}
>
    
    <div className="main_container_dark_effect">
        <div className="left">

            <div className='top'>
                <p>GetWeather</p>
                <div className='input_container'>
                    <div className='img_container'><img alt='' src={search_icon}/></div>
                    <input type="text"
                     value={location}
                     id="input_key"
                     onChange={event => setLocation(event.target.value)}
                     onKeyPress={searchLocation}
                    />
                    <div className='img_container'><span onClick={search_btn}>Go</span></div>
                </div>
            </div>

            <div className='bottom'>
                <div className='upper'>
                    <div className='left_upper'>
                        {data.main ? <p>{data.main.temp.toFixed()}°C</p> : <p>0°C</p> }
                        
                    </div>
                    <div className='right_upper'>      
                        {data.main ? <img alt='' src={"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png"}/> : <img alt='' src={sample_icon}/> }
                        {data.main ? <p className='desc'>{data.weather[0].description}</p> : <p className='desc'>Please search a place</p> }
                        
                        {
                            data.main ? 
                                data.weather[0].main.toLowerCase() == "thunderstorm" || 
                                data.weather[0].main.toLowerCase() == "drizzle" || 
                                data.weather[0].main.toLowerCase() == "rain" || 
                                data.weather[0].main.toLowerCase() == "snow" ?
                                    <p className='tips'>Don’t forget an umbrella</p> 
                                    : 
                                    data.weather[0].main.toLowerCase() == "tornado" ?
                                        <p className='tips'>Keep safe and stay at home.</p> 
                                        :
                                        <p className='tips'>It's a nice day to be productive.</p>
                            : 
                            <p className='tips'>Have a nice day.</p>  
                        }
                    </div>
                </div>

                <div className='lower'>
                    <div className='time_date'>
                        <p>{moment().format('LLLL')}</p>
                    </div>

                    <div className='location'>
                        <p className='Name_of_City'><span className="city_name">Philippines</span>, {data.main ? data.sys.country : "PH"}</p>
                        <div className='btn'><span>Change</span></div>
                    </div>
                </div>
            </div>

        </div>

        <div className="right">

            <div>
                <div className="box one">
                    <div className="left_box">
                        <p>Current Location</p>
                        <p 
                          className=
                          {( data.main ? 
                              data.weather[0].main.toLowerCase() == "thunderstorm" || 
                              data.weather[0].main.toLowerCase() == "drizzle" || 
                              data.weather[0].main.toLowerCase() == "rain" ||                 
                              data.weather[0].main.toLowerCase() == "snow" ?
                                   "Name_of_City rainy_color"
                              : 
                              data.weather[0].main.toLowerCase() == "tornado" ?
                                  "Name_of_City rainy_color"
                                  :
                                  "Name_of_City sunny_color"
                          : 
                          "Name_of_City sunny_color"  )}
                        >
                            <span className='city_name'>Philippines</span>, <span>{data.main ? data.sys.country : "PH"}</span>
                        </p>
                    </div>
                    <div className="right_box">
                        <img alt="" src= {( data.main ? 
                              data.weather[0].main.toLowerCase() == "thunderstorm" || 
                              data.weather[0].main.toLowerCase() == "drizzle" || 
                              data.weather[0].main.toLowerCase() == "rain" ||                 
                              data.weather[0].main.toLowerCase() == "snow" ?
                                rainy_icon 
                                : 
                                sunny_icon
                          : 
                          sunny_icon )}/>

                      
                    </div>
                </div>
    
                <div className="box two">
                    <p 
                      className=
                      {( data.main ? 
                          data.weather[0].main.toLowerCase() == "thunderstorm" || 
                          data.weather[0].main.toLowerCase() == "drizzle" || 
                          data.weather[0].main.toLowerCase() == "rain" ||                 
                          data.weather[0].main.toLowerCase() == "snow" ?
                               "title rainy_color"
                          : 
                          data.weather[0].main.toLowerCase() == "tornado" ?
                              "title rainy_color"
                              :
                              "title sunny_color"
                      : 
                      "title sunny_color"  )}
                    >
                        Weather Details
                    </p>
                    <div className="content">
                        <div className="left_content">
                            <p>Temperature</p>
                            <p>Description</p>
                            <p>Wind Speed</p>
                            <p>Wind Degree</p>
                        </div>
                        <div className="right_content">
                            <p>{data.main ? data.main.temp.toFixed() : "0"}°C</p>
                            <p>{data.main ? data.weather[0].description : "It's a nice day"}</p>
                            <p>{data.main ? data.wind.speed : "0"} MPH</p>
                            <p>{data.main ? data.wind.deg : "0"}°</p>
                        </div>
                    </div>
                </div>
    
                <div className="box three">
                    <p
                      className=
                      {( data.main ? 
                          data.weather[0].main.toLowerCase() == "thunderstorm" || 
                          data.weather[0].main.toLowerCase() == "drizzle" || 
                          data.weather[0].main.toLowerCase() == "rain" ||                 
                          data.weather[0].main.toLowerCase() == "snow" ?
                               "title rainy_color"
                          : 
                          data.weather[0].main.toLowerCase() == "tornado" ?
                              "title rainy_color"
                              :
                              "title sunny_color"
                      : 
                      "title sunny_color"  )}
                    >Graph Report</p>
    
                    <div className="graph_container">
                        <Line data={weatherData} height={170}/>
                    </div>
                    
                </div>
            </div>

            <div
                className=
                {( data.main ? 
                    data.weather[0].main.toLowerCase() == "thunderstorm" || 
                    data.weather[0].main.toLowerCase() == "drizzle" || 
                    data.weather[0].main.toLowerCase() == "rain" ||                 
                    data.weather[0].main.toLowerCase() == "snow" ?
                         "four rainy_color_bg"
                    : 
                    data.weather[0].main.toLowerCase() == "tornado" ?
                        "four rainy_color_bg"
                        :
                        "four sunny_color_bg"
                : 
                "four sunny_color_bg"  )}
            >
                <p>Reysan Barillo © {(new Date().getFullYear())}</p>
                <p>This site was developed by Reysan Barillo. It cannot and should not be reproduced in any forms or by any means without the consent from him.</p>
            </div>

        </div>
    </div>
</div>
)
}