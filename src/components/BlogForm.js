import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import TagsInput from './TagsInput';

const BlogForm = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const onSelectTags = tags => console.log(tags);

  return (
    <div>
      <Fab color='secondary' onClick={handleClick} variant='square'>
        <CreateIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Post Blog</DialogTitle>
        <DialogContent>
          <FileUpload></FileUpload>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Blog Title'
            type='text'
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='body'
            label='Blog Body'
            type='text'
            fullWidth
          />
          <TagsInput selectedTags={onSelectTags} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClick} color='primary'>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BlogForm;
