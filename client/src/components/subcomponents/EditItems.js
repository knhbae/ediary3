import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DialogContentText } from "@material-ui/core";

const EditItems = ({
  item,
  newItem, // 인풋에 입력되는 객체
  onEdit,
  onChangeField,
  onInitializeForm,
  onInitiateEditField,
}) => {
  const onSubmitEdit = (e) => {
    // debugger;
    e.preventDefault();
    onEdit({
      id: item.id,
      text: newItem,
      done: false,
    });
    handleClose();
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    onChangeField({
      form: "newItem",
      key: name,
      value,
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    // newItem.push(item.text);
    // const { name } = e.target;
    onInitiateEditField({
      form: "newItem",
      value: item.text,
    });
  };

  const handleClose = () => {
    setOpen(false);
    onInitializeForm({
      form: "newItem",
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
            label="goal"
            defaultValue={item.text.goal}
            name="goal"
            // value={newItem.goal}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="quantity"
            defaultValue={item.text.quantity}
            name="quantity"
            // value={newItem.quantity}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="unit"
            defaultValue={item.text.unit}
            name="unit"
            // value={newItem.unit}
            onChange={onChange}
          />
          <TextField
            autoFocus
            type="date"
            margin="dense"
            label="startDate"
            defaultValue={item.text.startDate}
            name="startDate"
            // value={newItem.startDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
          <TextField
            autoFocus
            type="date"
            margin="dense"
            label="endDate"
            defaultValue={item.text.endDate}
            name="endDate"
            // value={input.endDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="period(hrs)"
            defaultValue={item.text.period}
            name="period"
            // value={input.period}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="desc"
            defaultValue={item.text.desc}
            name="desc"
            // value={input.desc}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="categoryTag"
            defaultValue={item.text.categoryTag}
            name="categoryTag"
            // value={input.categoryTag}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitEdit} color="primary">
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditItems;
