import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "./CardHeader";
// import { connect } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import ChartNavBar from './ChartNavBar'
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
} from 'recharts';


const useStyles = makeStyles({
  card: {
    margin: "5% 20%"
  }
});

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

// const CustomToolTip = ({active, payload, label}) => {
// if (active) {
//   return(
//     <div className="custom-tooltip">
//     <p className="label">{`${label} : ${payload[0].value}`}</p>
//     <p className="desc">Anything you want can be displayed here.</p>
//   </div>
//   )
// }
// return null;
// }

export default () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Graph Visualization" />
      <ChartNavBar/>
      <CardContent>
      <LineChart
        width={1200}
        height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      </CardContent>
    </Card>
  );
};