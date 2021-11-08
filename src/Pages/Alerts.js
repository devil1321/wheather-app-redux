import React, { useState, useEffect } from "react";
import WheatherItem from "../Components/WheatherItem";
import WheatherMainItem from "../Components/WheatherMainItem";
import Alert from "../Components/Alert";
import { connect } from "react-redux";
import { wheatherActions } from "../APIControllers/actions/wheatherActions";
import { imagesActions } from "../APIControllers/actions/imagesActions";

const Alerts = (props) => {
  const [currentPOS, setCurrentPOS] = useState(null);
  const [place, setPlace] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const { handleFetchOneCall, handlePosition, handleLonLat } = props;
  const { position } = props.wheatherDATA;

  if (props.wheatherDATA.minutely !== null) {
    var { data } = props.wheatherDATA.minutely;
    var { current, alerts } = data;
  }



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
    if (isSet && !isLoad && place !== null) {
      handleFetchOneCall("minutely", place);
      setIsLoad(true);
    }

  }, [isSet, isLoad, currentPOS, place, props.wheatherDATA]);

  return (
    <div className="alerts">
      {props.wheatherDATA.minutely !== null ? (
        <React.Fragment>
          {alerts ? (
            <React.Fragment>
              {alerts.map((alert) => {
                const { sender_name, event, description, tags } = alert;
                return (
                  <Alert
                    sender_name={sender_name}
                    event={event}
                    description={description}
                    tags={tags}
                  />
                );
              })}
            </React.Fragment>
          ) : (
            <div className="alerts__not-found-msg">
              <h1> {position} </h1> <h2> Has No Alerts </h2>{" "}
            </div>
          )}
        </React.Fragment>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const actions = Object.assign({}, wheatherActions, imagesActions);

export default connect(mapStateToProps, actions)(Alerts);
