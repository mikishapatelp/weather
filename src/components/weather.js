import { useState } from "react";
import "./weather.css";
function Weather() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [curTemp, setCurTemp] = useState("");
  const [isCel, setIsCel] = useState(true);
  const [tempClass, setTempClass] = useState("");
  const [isError, setIsError] = useState(false);

  // on the input change
  const cityChangeHandler = (event) => {
    setCity(event.target.value);
  };

  // call the open weather api to fetch the temp of the city
  const getTemp = () => {
    console.log(city);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b81cd1a66eaee287ea9830aa66250511&units=metric`;
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setTemp(data.main.temp);
        setCurTemp(data.main.temp + " C");
        setIsCel(true);
        setClass(data.main.temp);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  // changing the temp from F to C or vice versa
  const unitChangeHandler = () => {
    if (isCel) {
      setCurTemp(temp * (9 / 5) + 32 + " F");
      setIsCel(false);
    } else {
      setCurTemp(temp + " C");
      setIsCel(true);
    }
  };

  //set the colors based on the temp
  const setClass = (temp) => {
    if (temp < 15) {
      setTempClass("blue");
    } else if (temp > 35) {
      setTempClass("red");
    } else {
      setTempClass("yellow");
    }
  };

  return (
    <div className="Weather">
      <div className="form">
        <div>
          <input
            type="text"
            placeholder="Please enter a city"
            onChange={cityChangeHandler}
          />
        </div>
        <div>
          <button onClick={getTemp}>submit</button>
        </div>
      </div>
      {isError && <div className="not-found"> City Not Found</div>}
      {curTemp && (
        <div className={"data " + tempClass}>
          <div className="temp">Temperature</div>
          <div className="deg" onClick={unitChangeHandler}>
            {curTemp}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
