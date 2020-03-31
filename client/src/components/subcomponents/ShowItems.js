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

import EditItems from "./EditItems";
import DeleteItems from "./DeleteItems";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    flexGrow: 1
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
    alignItems: "center"
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

export default function ShowItems({
  item,
  onRemove,
  newItem,
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
              {item.text.goal}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {item.text.startDate}
              <br />~{item.text.endDate}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {item.text.quantity} {item.text.unit}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          {/* <div className={classes.column} /> */}

          <div className={classes.column}>
            <Typography variant="caption">
              {item.text.desc}
              <br />
              {/* <a href="#secondary-heading-and-columns" className={classes.link}>
                Learn more
              </a> */}
            </Typography>
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Chip label={item.text.categoryTag} />
            {/* <Chip label="Barbados" onDelete={() => {}} /> */}
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <DeleteItems item={item} onRemove={onRemove} />
          <EditItems
            item={item}
            newItem={newItem}
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
