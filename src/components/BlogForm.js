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

import { backendUrl } from '../config';
import TagsInput from './TagsInput';
import { updateBlogs } from '../actions/blogActions';
import { ValidationError } from 'yup';

const BlogForm = ({ editMode, blog = {} }) => {
  const [blogTitle, setBlogTitle] = useState(blog.title || '');
  const [blogBody, setBlogBody] = useState(blog.body || '');
  const [blogTags, setBlogTags] = useState([]);
  const [error, setError] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [uploadedFile, setUploadedFile] = useState({});

  const handleClick = () => {
    setOpen(!open);
    setBlogTitle('');
    setBlogBody('');
  };

  const onSelectTags = tags => setBlogTags(tags);

  const validate = e => {
    if (e.target.value === '') {
      setError([...error, e.target.id]);
    }
  };
  const onChangeInput = e => {
    const id = e.target.id;
    if (e.target.value === '') {
      validate(e);
    }
    if (e.target.value !== '') {
      setIsSubmitting(true);
      setError(error.filter(e => e !== id));
    }
    id === 'title' ? setBlogTitle(e.target.value) : setBlogBody(e.target.value);
  };

  const onSubmit = () => {
    handleClick();
    if (!editMode) {
      const data = new FormData();
      data.append('title', blogTitle);
      data.append('body', blogBody);
      if (blogTags.length) data.append('tags', blogTags);
      data.append('img', uploadedFile);

      axios.post(`${backendUrl}/blog/addBlog`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      axios.patch(`${backendUrl}/blog/${blog._id}`, {
        title: blogTitle,
        body: blogBody,
        tags: blogTags
      });
    }
  };

  return (
    <div>
      {console.log('error->', error)}
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
              setUploadedFile(e.target.files[0]);
            }}
          />
          <label htmlFor='img'>
            <Button variant='contained' color='primary' component='span'>
              Choose An Image
            </Button>
          </label>
          <TextField
            margin='dense'
            id='title'
            label='Blog Title'
            type='text'
            value={blogTitle}
            onChange={onChangeInput}
            onBlur={validate}
            error={error.includes('title')}
            helperText={
              error.includes('title')
                ? 'You must provide a title for field'
                : ' '
            }
            fullWidth
          />

          <TextField
            margin='dense'
            id='body'
            label='Blog Body'
            type='text'
            value={blogBody}
            onChange={onChangeInput}
            onBlur={validate}
            error={error.includes('body')}
            helperText={
              error.includes('body') ? 'You must provide a body for field' : ' '
            }
            fullWidth
          />
          <TagsInput selectedTags={onSelectTags} tagsArr={blog.tags} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            color='primary'
            disabled={!isSubmitting || error.length > 0}
          >
            {editMode ? 'Save' : 'Post'}
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </div>
  );
};

export default BlogForm;
