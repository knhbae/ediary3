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

const AddDailyGoals = ({
  items, // 목표를 선택하기 위한 객체
  dailyinput, // 인풋에 입력되는 객체
  activeWeek,
  onChangeField,
  onInsert,
  onInitializeForm,
  onInitiateEditField
}) => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  //   let inputTemp = {
  //     date: today,
  //     goal: "",
  //     timeToSpend: "",
  //     startRange: "",
  //     endRange: "",
  //     emotion: "",
  //     memo: ""
  //   };

  const onSubmit = e => {
    e.preventDefault();
    onInsert(dailyinput);
    onInitializeForm({
      form: "dailyinput"
    });
    handleClose();
  };
  const onChange = e => {
    const { value, name } = e.target;
    onChangeField({
      form: "dailyinput",
      key: name,
      value
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    // onInitiateEditField({
    //   form: "dailyinput",
    //   value: inputTemp
    // });
  };

  const handleClose = () => {
    setOpen(false);
    onInitializeForm({
      form: "dailyinput"
    });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add daily Goal
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add daily Goal</DialogTitle>
        <DialogContent>
          <DialogContentText>Write Your daily Goal</DialogContentText>

          <TextField
            // required
            type="date"
            autoFocus
            margin="dense"
            defaultValue={today}
            label="날짜입력"
            name="date"
            // value={input.startDate}
            InputLabelProps={{
              shrink: true
            }}
            onChange={onChange}
          />

          <TextField
            autoFocus
            margin="dense"
            select
            label="한일"
            name="goal"
            onChange={onChange}
            value={dailyinput.goal}
          >
            {items.map(option => (
              <MenuItem key={option.id} value={option.text.goal}>
                {option.text.goal}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            label="투자시간"
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
            label="이번지점"
            name="endRange"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="감정"
            name="emotion"
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

export default AddDailyGoals;
