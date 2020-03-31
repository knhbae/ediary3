import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DialogContentText } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const EditWeeklyGoals = ({
  items,
  weeklygoal,
  input, // 인풋에 입력되는 객체
  onEdit,
  onChangeField,
  onInitializeForm,
  onInitiateEditField
}) => {
  const onChange = e => {
    const { value, name } = e.target;
    onChangeField({
      form: "input",
      key: name,
      value
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    // input.push(weeklygoal.text);
    // const { name } = e.target;
    onInitiateEditField({
      form: "input",
      value: weeklygoal.text
    });
  };

  const handleClose = () => {
    setOpen(false);
    onInitializeForm({
      form: "input"
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
            autoFocus
            margin="dense"
            select
            label="goal"
            // value={weeklygoal.text.goal}
            name="goal"
            value={input.goal}
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
            label="주차"
            value={weeklygoal.text.yyyyww}
            name="quantity"
            // value={input.quantity}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="목표시간"
            defaultValue={weeklygoal.text.timeToSpend}
            name="timeToSpend"
            // value={input.unit}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="지난지점"
            defaultValue={weeklygoal.text.startRange}
            name="startRange"
            // value={input.period}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="목표지점"
            defaultValue={weeklygoal.text.endRange}
            name="endRange"
            // value={input.desc}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="메모"
            defaultValue={weeklygoal.text.memo}
            name="memo"
            // value={input.categoryTag}
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
                id: weeklygoal.id,
                text: input,
                done: false
              });

              onInitializeForm({
                form: "input"
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

export default EditWeeklyGoals;
