import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "./CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "./Avatar";

const useStyles = makeStyles({
  card: {
    margin: "5% 40%"
  }
});

export default () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="My Dashboard" />
      <CardContent>
        <List>
          <ListItem>
            <Avatar>TP</Avatar>
            <ListItemText primary="Tubing Pressure:" />
          </ListItem>
          <ListItem>
            <Avatar>CP</Avatar>
            <ListItemText primary="Casing Pressure:" />
          </ListItem>
          <ListItem>
            <Avatar>OT</Avatar>
            <ListItemText primary="Oil Temp:" />
          </ListItem>
          <ListItem>
            <Avatar>FT</Avatar>
            <ListItemText primary="Flare Temp:" />
          </ListItem>
          <ListItem>
            <Avatar>WT</Avatar>
            <ListItemText primary="Water Temp:" />
          </ListItem>
          <ListItem>
            <Avatar>IVO</Avatar>
            <ListItemText primary="injValve Open:" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
