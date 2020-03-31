import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";

import ShowCard from "../components/subcomponents/Functions/ShowCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1300
  },
  paper: {
    height: 200,
    width: 200
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export default function SpacingGrid() {
  //   const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  //   const handleChange = event => {
  //     setSpacing(Number(event.target.value));
  //   };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {[0, 1, 2, 3, 4, 5].map(value => (
            <Grid key={value} item>
              {/* <Paper className={classes.paper} /> */}
              <ShowCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
