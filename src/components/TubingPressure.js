import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import SubscriptionClient from 'subscriptions-transport-ws'
import { Provider, createClient, useSubscription, defaultExchanges, subscriptionExchange } from "urql";
import { useGeolocation } from "react-use";
import LinearProgress from "@material-ui/core/LinearProgress";

const subscriptionClient = new SubscriptionClient("https://react.eogresources.com/graphql", {})


const client = createClient({
    url: "https://react.eogresources.com/graphql",
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        forwardSubscription: operation => subscriptionClient.request(operation)
      })
    ]
  });

const query = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
`;

const tubingPressureQuery = `
subscription newMeasurement()

`

const getTubingPressure = state => {
  const { metric, value, unit, at } = state.tubingPressure;
  return {
    metric,
    value,
    unit,
    at
  };
};

export default () => {
  return (
    <Provider value={client}>
      <TubingPressure />
    </Provider>
  );
};

const TubingPressure = () => {
  const getLocation = useGeolocation();
  // Default to houston
  const latLong = {
    latitude: getLocation.latitude || 29.7604,
    longitude: getLocation.longitude || -95.3698
  };
  const dispatch = useDispatch();
  const { metric, value, unit, at } = useSelector(
    getTubingPressure
  );
  
  

  const [result] = useSubscription({
    query: tubingPressureQuery,
    variables: {}
  });
  const { fetching, data, error } = result;
  useEffect(
    () => {
      if (error) {
        dispatch({ type: actions.API_ERROR, error: error.message });
        return;
      }
      if (!data) return;
      const { getTubingPressureFeed } = data;
      dispatch({ type: actions.TUBING_PRESSURE_RECEIVED, getTubingPressureFeed });
    },
    [dispatch, data, error]
  );

  if (fetching) return <LinearProgress />;
};