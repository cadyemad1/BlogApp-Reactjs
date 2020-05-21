import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const ConfirmDialog = ({ children, title, content, onConfirm, btnStyle }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const onSubmit = () => {
    handleClick();
    onConfirm();
  };

  return (
    <div>
      <Tooltip title={title} placement='left'>
        <IconButton onClick={handleClick} className={btnStyle}>
          {children}
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClick} fullWidth>
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color='primary' autoFocus>
            Yes
          </Button>
          <Button onClick={handleClick} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
