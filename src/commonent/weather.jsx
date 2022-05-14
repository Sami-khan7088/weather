import React, { useState, useEffect } from 'react'
const Weather = () => {
    var current = new Date();
    const dayIndex = current.getDay();
    const getDayName = (dayIndex) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayIndex];
    }
    const dayName = getDayName(dayIndex)
    const [seconds, setSeconds] = useState();
    const [city, setCity] = useState(null);
    const [temp, setTemp] = useState(null);
    const [tempmx, setTempmx] = useState(null);
    const [tempmin, setTempmin] = useState(null);
    const [search, setSearch] = useState("Rudrapur");
    useEffect(() => {
        setInterval(() => {
            setSeconds(new Date().toLocaleString());
          }, 1000);
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=37d13759cd0e450deea636277fba7a8d`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.main);
            setCity(data.name)
            setTemp(data.main.temp);
            setTempmx(data.main.temp_max);
            setTempmin(data.main.temp_min);
        }
       fetchApi();

    }, [search])
    function inputEvent(e) {
        setSearch(() => {
            return (e.target.value)
        })
    }
    return (
        <>
            <div className='container'>
                <div className='box '>
                    <div>
                        <p className='head3'>Weather App</p>
                    </div>
                    <div className='inputData ' >
                        <input type="search" id="search" className='inputFeild' onChange={inputEvent} placeholder="Search Here" />
                    </div>

                    <div className='info'>
                        <h2 className='location'>
                            <i className="fa-solid fa-street-view" style={{ color: "#d36326" }}></i><span style={{ padding: "10px 10px" }}>{search}</span>
                        </h2>
                        <p className="date">{dayName} , {seconds}  </p>
                        {
                            city == null ? <p className='temp'>no data found</p> : (<div>
                                <h1 className='temp'>
                                    {temp}&deg;Cel
                                </h1>
                                <h3 className='temp_max'>
                                    Min : {tempmin} &deg;Cel | Max: {tempmx} &deg;Cel
                                </h3>
                            </div>
                            )
                        }

                    </div>
                    <div className='wave -one'></div>
                    <div className='wave -two'></div>
                    <div className='wave -three'></div>

                </div>
            </div>
        </>
    )
}
export default Weather;