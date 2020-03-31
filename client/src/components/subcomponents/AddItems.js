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

// import SelectDay from "./Functions/SelectDay";

const AddItems = ({
  newItem, // 인풋에 입력되는 객체
  onChangeField,
  onInsert,
  onInitializeForm
}) => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  const onSubmit = e => {
    e.preventDefault();
    onInsert(newItem);
    onInitializeForm({
      form: "newItem"
    });
    handleClose();
  };
  const onChange = e => {
    const { value, name } = e.target;
    onChangeField({
      form: "newItem",
      key: name,
      value
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onInitializeForm({
      form: "newItem"
    });
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Goal
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Goal</DialogTitle>
        <DialogContent>
          <DialogContentText>Write Your Goal</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Goal"
            name="goal"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="quantity"
            name="quantity"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="unit"
            name="unit"
            onChange={onChange}
          />

          <TextField
            // required
            type="date"
            autoFocus
            margin="dense"
            defaultValue={today}
            label="startDate"
            name="startDate"
            // value={input.startDate}
            InputLabelProps={{
              shrink: true
            }}
            onChange={onChange}
          />

          <TextField
            // required
            type="date"
            autoFocus
            margin="dense"
            defaultValue={today}
            label="endDate"
            name="endDate"
            // value={input.endDate}
            InputLabelProps={{
              shrink: true
            }}
            onChange={onChange}
          />

          <TextField
            autoFocus
            margin="dense"
            label="period(hrs)"
            name="period"
            onChange={onChange}
          />

          <TextField
            autoFocus
            margin="dense"
            label="desc"
            name="desc"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="categoryTag"
            name="categoryTag"
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

export default AddItems;
