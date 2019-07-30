import * as actions from "../actions";

const initialState = {
  metric: "",
  value: null,
  unit: "",
  at: ""
};

const measurementDataReceived = (state, action) => {
  const { newMeasurement } = action;
  const {
    metric,
    value,
    unit,
    at
  } = newMeasurement;

  return {
    metric,
    value,
    unit,
    at
  };
};

const handlers = {
  [actions.MEASUREMENT_DATA_RECEIVED]: measurementDataReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};