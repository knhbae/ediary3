import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
// import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import EditDailyGoals from "./EditDailyGoals";
import DeleteDailyGoals from "./DeleteDailyGoals";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    aligndailygoals: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

export default function ShowDailyGoals({
  items,
  dailygoal,
  onRemove,
  dailyinput,
  onEdit,
  onChangeField,
  onInitializeForm,
  onInitiateEditField
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <ExpansionPanel defaultExpanded> */}
      <ExpansionPanel variant="outlined">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {dailygoal.text.goal}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {dailygoal.text.date}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {dailygoal.text.timeToSpend}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={clsx(classes.column, classes.helper)}>
            <Chip label={dailygoal.text.startRange} />
            <Chip label={"~" + dailygoal.text.endRange} />
            {/* <Chip label="Barbados" onDelete={() => {}} /> */}
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Chip label={dailygoal.text.emotion} />
            {/* <Chip label="Barbados" onDelete={() => {}} /> */}
          </div>
          <div className={classes.column}>
            <Typography variant="caption">
              {dailygoal.text.memo}
              <br />
              {/* <a href="#secondary-heading-and-columns" className={classes.link}>
                Learn more
              </a> */}
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <DeleteDailyGoals dailygoal={dailygoal} onRemove={onRemove} />
          <EditDailyGoals
            items={items}
            dailygoal={dailygoal}
            dailyinput={dailyinput}
            onEdit={onEdit}
            onChangeField={onChangeField}
            onInitializeForm={onInitializeForm}
            onInitiateEditField={onInitiateEditField}
          />
          {/* <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button> */}
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}
