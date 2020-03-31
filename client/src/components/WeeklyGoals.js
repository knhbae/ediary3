import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddWeeklyGoals from "./subcomponents/AddWeeklyGoals";
import ShowWeeklyGoals from "./subcomponents/ShowWeeklyGoals";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import { addISOWeekYears } from "date-fns";
import currentWeekNumber from "current-week-number";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: "hidden",
    display: "block",
    width: "100%"
  }
}));

const WeeklyGoals = ({
  items, // select 하기 위한 객체
  input, // 인풋에 입력되는 객체
  weeklygoals, // 할 일 목록이 들어있는 객체
  onChangeField,
  onInsert,
  onToggle,
  onRemove,
  onEdit,
  onInitializeForm,
  onInitiateEditField
}) => {
  const classes = useStyles();
  const theme = useTheme();

  let today = new Date();
  let ww = String(currentWeekNumber()).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + ww;

  const [activeStep, setActiveStep] = React.useState(0);
  const [activeWeek, setActiveWeek] = React.useState(today);

  const maxSteps = 1000;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setActiveWeek(prevActiveWeek => addWeek(prevActiveWeek));
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    setActiveWeek(prevActiveWeek => minusWeek(prevActiveWeek));
  };

  const addWeek = prevYyyyww => {
    const prevYyyy = prevYyyyww.substring(0, 4) * 1;
    const prevWw = prevYyyyww.substring(5, 7) * 1;
    let nextWw = prevWw === 52 ? 1 : prevWw + 1;
    let nextYyyy = prevWw === 52 ? prevYyyy + 1 : prevYyyy;
    console.log(nextYyyy + "-" + nextWw);

    const nextYyyyww =
      nextWw < 10 ? nextYyyy + "-0" + nextWw : "" + (nextYyyy + "-" + nextWw);

    return nextYyyyww;
  };

  const minusWeek = prevYyyyww => {
    const prevYyyy = prevYyyyww.substring(0, 4) * 1;
    const prevWw = prevYyyyww.substring(5, 7) * 1;
    let nextWw = prevWw === 1 ? 52 : prevWw - 1;
    let nextYyyy = prevWw === 1 ? prevYyyy - 1 : prevYyyy;

    const nextYyyyww =
      nextWw < 10 ? nextYyyy + "-0" + nextWw : "" + (nextYyyy + "-" + nextWw);

    return nextYyyyww;
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{activeWeek}</Typography>
      </Paper>
      <AddWeeklyGoals
        items={items}
        input={input}
        activeWeek={activeWeek}
        onInsert={onInsert}
        onChangeField={onChangeField}
        onInitializeForm={onInitializeForm}
        onInitiateEditField={onInitiateEditField}
      />
      <div>
        {weeklygoals.map(weeklygoal => (
          <div key={weeklygoal.id}>
            {weeklygoal.text.yyyyww === activeWeek ? (
              <ShowWeeklyGoals
                items={items}
                weeklygoal={weeklygoal}
                onRemove={onRemove}
                input={input}
                onEdit={onEdit}
                onChangeField={onChangeField}
                onInitializeForm={onInitializeForm}
                onInitiateEditField={onInitiateEditField}
              />
            ) : (
              ""
            )}
          </div>
        ))}
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="progress"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              // disabled={activeStep === maxSteps - 1}
            >
              다음주
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              // disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              지난주
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default WeeklyGoals;
