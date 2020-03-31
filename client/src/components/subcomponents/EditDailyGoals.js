import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DialogContentText } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
const EditDailyGoals = ({
  items,
  dailygoal,
  dailyinput, // 인풋에 입력되는 객체
  onEdit,
  onChangeField,
  onInitializeForm,
  onInitiateEditField
}) => {
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
    // dailyinput.push(dailygoal.text);
    // const { name } = e.target;
    onInitiateEditField({
      form: "dailyinput",
      value: dailygoal.text
    });
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
        수정
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Modify Goal</DialogContentText>

          <TextField
            // required
            type="date"
            autoFocus
            margin="dense"
            defaultValue={dailyinput.date}
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
            label="goal"
            // value={weeklygoal.text.goal}
            name="goal"
            value={dailyinput.goal}
            onChange={onChange}
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
            defaultValue={dailygoal.text.timeToSpend}
            name="timeToSpend"
            onChange={onChange}
          />

          <TextField
            autoFocus
            margin="dense"
            label="지난지점"
            defaultValue={dailygoal.text.startRange}
            name="startRange"
            onChange={onChange}
          />

          <TextField
            autoFocus
            margin="dense"
            label="이번지점"
            defaultValue={dailygoal.text.endRange}
            name="endRange"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="감정"
            defaultValue={dailygoal.text.emotion}
            name="emotion"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="메모"
            defaultValue={dailygoal.text.memo}
            name="memo"
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={e => {
              // debugger;
              e.preventDefault();
              onEdit({
                id: dailygoal.id,
                text: dailyinput,
                done: false
              });

              onInitializeForm({
                form: "dailyinput"
              });
              handleClose();
            }}
            color="primary"
          >
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditDailyGoals;
