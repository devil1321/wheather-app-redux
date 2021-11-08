import React, { useState, useEffect } from "react";
import WheatherItem from "../Components/WheatherItem";
import WheatherMainItem from "../Components/WheatherMainItem";

import { connect } from "react-redux";
import { wheatherActions } from "../APIControllers/actions/wheatherActions";
import { imagesActions } from "../APIControllers/actions/imagesActions";

const Daily = (props) => {
  const [currentPOS, setCurrentPOS] = useState(null);
  const [place, setPlace] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const { handleFetchOneCall, handlePosition, handleLonLat } = props;
  const { position } = props.wheatherDATA;

  if (props.wheatherDATA.daily !== null) {
    var { data } = props.wheatherDATA.daily;
    var { current, hourly } = data;
    var {
      temp,
      feels_like,
      pressure,
      humidity,
      weather,
      clouds,
      visibility,
      wind_speed,
    } = current;
    var { main, description, icon } = current.weather;
  }

  const handleDescMain = (word) => {
    let charOne = word[0].toUpperCase();
    let rest = word.slice(1, word.length);
    var word = charOne + rest;
    return word;
  };

  const handleDesc = () => {
    let charOne = weather[0].description[0].toUpperCase();
    let rest = weather[0].description.slice(1, weather[0].description.length);
    var word = charOne + rest;
    return word;
  };

  const handleFall = () => {
    let time = 0;
    const items = document.querySelectorAll(".wheatherItem__main-item.sm");
    items.forEach((item) => item.classList.remove("active"));
    setTimeout(() => {
      items.forEach((item) => {
        setTimeout(() => {
          item.classList.add("active");
        }, time);
        time += 200;
      });
    }, 1000);
  };

  useEffect(() => {
    if (
      props.wheatherDATA.lon !== null &&
      props.wheatherDATA.lat !== null &&
      !isLoad
    ) {
      let tempPlace = {
        lon: props.wheatherDATA.lon,
        lat: props.wheatherDATA.lat,
      };
      setPlace(tempPlace);
    }
    if (!isSet) {
      if (position !== null) {
        handleLonLat(position);
        setIsSet(true);
      }
    }
    // && list !== undefined
    if (isSet && !isLoad && place !== null) {
      console.log("started");
      handleFetchOneCall("daily", place);
      setIsLoad(true);
    }
    handleFall();
  }, [isSet, isLoad, currentPOS, place, props.wheatherDATA]);

  return (
    <div className="hourly">
      {" "}
      {props.wheatherDATA.daily !== null ? (
        <WheatherMainItem
          icon={weather[0].icon}
          name={position}
          main={weather[0].main}
          temp={temp}
          feels_like={feels_like}
          pressure={pressure}
          humidity={humidity}
          visibility={visibility}
          wind_speed={wind_speed}
          handleDesc={handleDesc}
        />
      ) : null}{" "}
      <div className="wheatherItem__items">
        {" "}
        {props.wheatherDATA.daily !== null ? (
          <React.Fragment>
            {" "}
            {hourly.map((day) => {
              const {
                temp,
                feels_like,
                pressure,
                humidity,
                weather,
                clouds,
                wind_speed,
              } = day;
              return (
                <WheatherItem
                  icon={weather[0].icon}
                  name={position}
                  temp={temp}
                  feels_like={feels_like}
                  pressure={pressure}
                  humidity={humidity}
                  description={weather[0].description}
                  clouds={clouds}
                  wind_speed={wind_speed}
                  handleDescMain={handleDescMain}
                />
              );
            })}{" "}
          </React.Fragment>
        ) : null}{" "}
      </div>{" "}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const actions = Object.assign({}, wheatherActions, imagesActions);

export default connect(mapStateToProps, actions)(Daily);
