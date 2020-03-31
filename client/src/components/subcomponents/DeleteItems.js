import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const DeleteItems = ({ item, onRemove }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        삭제
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle onClose={handleClose}>삭제 경고</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>선택한 목표 정보가 삭제됩니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={e => {
              onRemove(item.id);
            }}
          >
            삭제
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteItems;
