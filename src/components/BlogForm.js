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
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TagsInput from './TagsInput';

const BlogForm = ({ editMode, blog = {} }) => {
  const [blogTitle, setBlogTitle] = useState(
    blog.title || 'Insert Your Blog Title'
  );
  const [blogBody, setBlogBody] = useState(
    blog.body || 'Insert Your Blog Body'
  );
  const [blogTags, setBlogTags] = useState([]);
  const [open, setOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({});

  const user = useSelector(state => state.authUser.user);
  const { _id } = user;

  const handleClick = () => {
    setOpen(!open);
  };

  const onSelectTags = tags => setBlogTags(tags);
  // const onChooseImage = file => {
  //   setUploadedFile(file);
  // };

  const onSubmit = () => {
    handleClick();
    if (!editMode) {
      const data = new FormData();
      data.append('title', blogTitle);
      data.append('body', blogBody);
      data.append('tags', blogTags);
      data.append('author', _id);
      data.append('img', uploadedFile);
      console.log('UPLOADEDD->', data);
      // console.log('data->', blogTitle, blogBody, blogTags, _id, uploadedFile);

      axios
        .post('http://localhost:3000/blog/addBlog', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => console.log('BlogForm*', error));
    } else {
      axios
        .patch(`http://localhost:3000/blog/${blog._id}`, {
          title: blogTitle,
          body: blogBody,
          tags: blogTags,
          author: _id
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => console.log('BlogForm*', error));
    }
  };

  return (
    <div>
      {editMode ? (
        <IconButton title='edit post' onClick={handleClick}>
          <EditIcon />
        </IconButton>
      ) : (
        <Fab color={editMode ? '' : 'secondary'} onClick={handleClick}>
          <CreateIcon />
        </Fab>
      )}

      <Dialog open={open} onClose={handleClick}>
        <DialogTitle id='form-dialog-title'>
          {editMode ? 'Edit Blog' : 'Post Blog'}
        </DialogTitle>
        {/* <form> */}
        <DialogContent>
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='img'
            multiple
            type='file'
            name='img'
            onChange={e => {
              console.log('**', e.target.files);
              setUploadedFile(e.target.files[0]);
            }}
          />
          <label htmlFor='img'>
            <Button variant='contained' color='primary' component='span'>
              Choose An Image
            </Button>
          </label>
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
          <TagsInput selectedTags={onSelectTags} tagsArr={blog.tags} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color='primary'>
            Cancel
          </Button>
          <Button onClick={onSubmit} color='primary'>
            {editMode ? 'Save' : 'Post'}
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </div>
  );
};

export default BlogForm;
