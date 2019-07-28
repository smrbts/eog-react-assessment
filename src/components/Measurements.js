import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { Provider, createClient, useSubscription, defaultExchanges, subscriptionExchange } from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws"
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "./Chip";

const subscriptionClient = new SubscriptionClient("ws://react.eogresources.com/graphql", {})

const client = createClient({
  url: "https://react.eogresources.com/graphql",
  exchanges: [...defaultExchanges, subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
  })]
});

// const query = `
// query($latLong: WeatherQuery!) {
//   getWeatherForLocation(latLong: $latLong) {
//     description
//     locationName
//     temperatureinCelsius
//   }
// }
// `;

const measurementSubscriptionQuery = `
subscription{
    newMeasurement{
        metric
        value
        unit
        at
    }
}

`

const getMeasurements = state => {
  const { metric, value, unit, at } = state.measurements;
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
      <Measurements />
    </Provider>
  );
};

const Measurements = () => {
  const dispatch = useDispatch();
  const { metric, value, unit, at } = useSelector(
    getMeasurements
  );

  const [result] = useSubscription({
    query: measurementSubscriptionQuery,
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
      const { newMeasurement } = data;
      dispatch({ type: actions.MEASUREMENT_DATA_RECEIVED, newMeasurement });
    },
    [dispatch, data, error]
  );

  if (fetching) return <LinearProgress />;

  return (
    <Chip
      label={`${metric}: ${value} ${unit} ${at}`}
    />
  );
};