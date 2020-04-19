import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddDailyGoals from "./subcomponents/AddDailyGoals";
import ShowDailyGoals from "./subcomponents/ShowDailyGoals";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import { addISOWeekYears } from "date-fns";
import currentWeekNumber from "current-week-number";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: "hidden",
    display: "block",
    width: "100%",
  },
}));

const DailyGoals = ({
  maxDId,
  items, // select 하기 위한 객체
  dailyinput, // 인풋에 입력되는 객체
  dailygoals, // 할 일 목록이 들어있는 객체
  onChangeField,
  onInsert,
  onToggle,
  onRemove,
  onEdit,
  onInitializeForm,
  onInitiateEditField,
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
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setActiveWeek((prevActiveWeek) => addWeek(prevActiveWeek));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setActiveWeek((prevActiveWeek) => minusWeek(prevActiveWeek));
  };

  const addWeek = (prevYyyyww) => {
    const prevYyyy = prevYyyyww.substring(0, 4) * 1;
    const prevWw = prevYyyyww.substring(5, 7) * 1;
    let nextWw = prevWw === 52 ? 1 : prevWw + 1;
    let nextYyyy = prevWw === 52 ? prevYyyy + 1 : prevYyyy;
    console.log(nextYyyy + "-" + nextWw);

    const nextYyyyww =
      nextWw < 10 ? nextYyyy + "-0" + nextWw : "" + (nextYyyy + "-" + nextWw);

    return nextYyyyww;
  };

  const minusWeek = (prevYyyyww) => {
    const prevYyyy = prevYyyyww.substring(0, 4) * 1;
    const prevWw = prevYyyyww.substring(5, 7) * 1;
    let nextWw = prevWw === 1 ? 52 : prevWw - 1;
    let nextYyyy = prevWw === 1 ? prevYyyy - 1 : prevYyyy;

    const nextYyyyww =
      nextWw < 10 ? nextYyyy + "-0" + nextWw : "" + (nextYyyy + "-" + nextWw);

    return nextYyyyww;
  };

  const thisWeek = (thisdate) => {
    if (
      typeof thisdate === "undefined" ||
      thisdate === null ||
      thisdate === ""
    ) {
      const thisweek = "2020-01-01";
      return thisweek;
    } else {
      let ww = String(currentWeekNumber(thisdate)).padStart(2, "0"); //January is 0!
      // console.log(thisdate);
      let yyyy = thisdate.substring(0, 4);

      const thisweek = yyyy + "-" + ww;
      return thisweek;
    }
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{activeWeek}</Typography>
      </Paper>
      <AddDailyGoals
        maxDId={maxDId}
        items={items}
        dailyinput={dailyinput}
        activeWeek={activeWeek}
        onInsert={onInsert}
        onChangeField={onChangeField}
        onInitializeForm={onInitializeForm}
        onInitiateEditField={onInitiateEditField}
      />
      <div>
        {dailygoals.map((dailygoal) => (
          <div key={dailygoal.id}>
            {thisWeek(dailygoal.text.date) === activeWeek ? (
              <ShowDailyGoals
                items={items}
                dailygoal={dailygoal}
                onRemove={onRemove}
                dailyinput={dailyinput}
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

export default DailyGoals;
