import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
import { DialogContentText } from "@material-ui/core";
// import DatePickers from "./Functions/DatePickers";
import MenuItem from "@material-ui/core/MenuItem";

const AddWeeklyGoals = ({
  maxWId,
  items, // 목표를 선택하기 위한 객체
  input, // 인풋에 입력되는 객체
  activeWeek,
  onChangeField,
  onInsert,
  onInitializeForm,
  onInitiateEditField,
}) => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  let inputTemp = {
    yyyyww: activeWeek,
    goal: "",
    timeToSpend: "",
    startRange: "",
    endRange: "",
    memo: "",
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newWGoal = { id: maxWId + 1, text: input, done: 0 };
    onInsert(newWGoal);
    onInitializeForm({
      form: "input",
    });
    handleClose();
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    onChangeField({
      form: "input",
      key: name,
      value,
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    onInitiateEditField({
      form: "input",
      value: inputTemp,
    });
  };

  const handleClose = () => {
    setOpen(false);
    onInitializeForm({
      form: "input",
    });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Weekly Goal
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Weekly Goal</DialogTitle>
        <DialogContent>
          <DialogContentText>Write Your Weekly Goal</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="주차"
            name="yyyyww"
            defaultValue={activeWeek}
            onChange={onChange}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            select
            label="Select"
            name="goal"
            onChange={onChange}
            value={input.goal}
          >
            {items.map((option) => (
              <MenuItem key={option.id} value={option.text.goal}>
                {option.text.goal}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            label="목표시간"
            name="timeToSpend"
            onChange={onChange}
          />

          <TextField
            autoFocus
            margin="dense"
            label="지난지점"
            name="startRange"
            onChange={onChange}
          />

          <TextField
            autoFocus
            margin="dense"
            label="목표지점"
            name="endRange"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="메모"
            name="memo"
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>{" "}
    </div>
  );
};

export default AddWeeklyGoals;
