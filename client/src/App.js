import React from "react";
// import CounterContainer from "./containers/CounterContainer";
// import TodosContainer from "./containers/TodosContainer";
import WeeklyGoalsContainer from "./containers/WeeklyGoalsContainer";
import DailyGoalsContainer from "./containers/DailyGoalsContainer";
import ItemsContainer from "./containers/ItemsContainer";
// import Stepper from "./components/Stepper";

//App MenuBar
// import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500
  },
}));

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div align="center">
      <div className={classes.root} align="center">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="일일 기록" {...a11yProps(0)} />
            <Tab label="주간 기록" {...a11yProps(1)} />
            <Tab label="목표 등록" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <DailyGoalsContainer />
            <table Style="visibility:hidden">
              <ItemsContainer />
            </table>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <WeeklyGoalsContainer />
            <table Style="visibility:hidden">
              <ItemsContainer />
            </table>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <ItemsContainer />
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

export default App;
