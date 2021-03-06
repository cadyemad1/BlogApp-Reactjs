import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

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
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { backendUrl } from '../config';
import TagsInput from './TagsInput';
import { updateBlog, addBlog } from '../actions/blogActions';

const useStyles = makeStyles(theme => ({
  image: {
    height: '150px',
    width: '250px',
    border: ' 1px solid transparent',
    display: 'block',
    marginLeft: '115px',
    marginTop: '20px',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '80px',
      height: '80px'
    }
  }
}));

const BlogForm = ({ editMode, blog = {} }) => {
  const classes = useStyles();
  const [blogTitle, setBlogTitle] = useState(blog.title || '');
  const [blogBody, setBlogBody] = useState(blog.body || '');
  const [blogTags, setBlogTags] = useState(blog.tags || []);
  const [uploadedFile, setUploadedFile] = useState({});
  const [imgPreview, setImgPreview] = useState();
  const [error, setError] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filedata, setFileData] = useState();

  const dispatch = useDispatch();

  const inputEl = useRef(null);

  const handleClick = () => {
    setOpen(!open);
    setBlogTitle(blog.title || '');
    setBlogBody(blog.body || '');
    setUploadedFile('');
    setImgPreview('');
    setBlogTags([]);
    setError([]);
    setIsSubmitting(false);
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

  const onSubmit = async e => {
    handleClick();
    if (!editMode) {
      const { data } = await axios.post(
        `${backendUrl}/blog/addBlog`,
        filedata,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      dispatch(addBlog(data.blog));
    } else {
      const { data } = await axios.patch(
        `${backendUrl}/blog/${blog._id}`,
        filedata,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      dispatch(updateBlog(data.blog));
    }
  };

  const onBlurInput = e => {
    validate(e);
    inputEl.current.focus();
  };

  const handleChange = e => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setUploadedFile(e.target.files[0]);
  };

  useEffect(() => {
    setImgPreview(blog.img);
  }, [open]);

  useEffect(() => {
    const fd = new FormData();
    fd.append('title', blogTitle);
    fd.append('body', blogBody);
    for (let i = 0; i < blogTags.length; i++) {
      if (blogTags.length) fd.append('tags', blogTags[i]);
    }
    fd.append('img', uploadedFile);
    setFileData(fd);
  }, [blogTitle, blogBody, blogTags, uploadedFile]);

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
        <Divider />
        <DialogContent>
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='img'
            type='file'
            name='img'
            onChange={handleChange}
            required
          />
          <img
            src={imgPreview || 'placeholder.png'}
            className={classes.image}
            alt='Blog image'
          />
          <label htmlFor='img'>
            <Button variant='contained' color='secondary' component='span'>
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
            onBlur={onBlurInput}
            error={error.includes('title')}
            helperText={
              error.includes('title')
                ? 'You must provide a title for blog'
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
              error.includes('body') ? 'You must provide a body for blog' : ' '
            }
            fullWidth
            inputRef={inputEl}
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
      </Dialog>
    </div>
  );
};

export default BlogForm;
