import * as actions from "../actions";

const initialState = {
  metric: "",
  value: null,
  unit: "",
  at: ""
};

const measurementDataRecevied = (state, action) => {
  const { getMeasurementFeed } = action;
  const {
    metric,
    value,
    unit,
    at
  } = getMeasurementFeed;

  return {
    metric,
    value,
    unit,
    at
  };
};

const handlers = {
  [actions.MEASUREMENT_DATA_RECEIVED]: measurementDataRecevied
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};