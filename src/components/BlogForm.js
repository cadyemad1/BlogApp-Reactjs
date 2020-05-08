import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

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

// const schema = object().shape({
//   blogTitle: string().required(),
//   blogBody: string().required()
// });

const BlogForm = () => {
  const [blogTitle, setBlogTitle] = useState('Insert Your Blog Title');
  const [blogBody, setBlogBody] = useState('Insert Your Blog Body');
  const [blogTags, setBlogTags] = useState([]);
  const [open, setOpen] = useState(false);

  const user = useSelector(state => state.authUser.user);
  const { _id } = user;

  const handleClick = () => {
    setOpen(!open);
  };

  const onSelectTags = tags => setBlogTags(tags);

  const onSubmit = () => {
    handleClick();
    axios
      .post('http://localhost:3000/blog/addBlog', {
        title: blogTitle,
        body: blogBody,
        tags: blogTags,
        author: _id
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log('BlogForm*', error));
  };

  return (
    <div>
      <Fab color='secondary' onClick={handleClick}>
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
            value={blogTitle}
            onChange={e => setBlogTitle(e.target.value)}
            error={blogTitle === ''}
            helperText={
              blogTitle === '' ? 'You must provide a title for field' : ' '
            }
            fullWidth
          />

          <TextField
            autoFocus
            margin='dense'
            id='body'
            label='Blog Body'
            type='text'
            value={blogBody}
            onChange={e => setBlogBody(e.target.value)}
            error={blogBody === ''}
            helperText={
              blogBody === '' ? 'You must provide a body for field' : ' '
            }
            fullWidth
          />
          <TagsInput selectedTags={onSelectTags} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color='primary'>
            Cancel
          </Button>
          <Button onClick={onSubmit} color='primary'>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BlogForm;
