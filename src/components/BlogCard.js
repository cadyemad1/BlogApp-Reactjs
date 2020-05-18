import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from '@material-ui/core/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import { backendUrl } from '../config';
import BlogForm from '../components/BlogForm';
import ConfirmDialog from '../components/ConfirmDialog';
import { deleteBlog } from '../actions/blogActions';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    padding: theme.spacing(1),
    // marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light
  },
  btn: {
    height: 40,
    marginLeft: 220,
    marginTop: 17,
    backgroundColor: '#021935',
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  tags: {
    backgroundColor: '#021834',
    color: 'white',
    padding: theme.spacing(1),
    marginRight: '5px',
    marginBottom: '2px'
  },
  tagsDiv: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  }
}));

const BlogCard = ({ handleClick, getUserId, blog }) => {
  const classes = useStyles();
  const user = useSelector(state => state.authUser.user);
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const { _id, title, body, author, createdAt, img, tags } = blog;

  const openProfile = () => {
    if (!user.length) {
      history.push('/login');
    }
    handleClick();
    getUserId(author._id);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const checkUser = () => {
    if (author._id === user._id) return true;
    return false;
  };

  const onDeleteBlog = () => {
    dispatch(deleteBlog(_id));
    axios.delete(`${backendUrl}blog/${_id}`);
  };

  return (
    <Card className={classes.root}>
      <Grid container>
        <CardHeader
          avatar={
            <Avatar aria-label='blog author' className={classes.avatar}>
              {author.username.charAt(0)}
            </Avatar>
          }
          title={author.username}
          subheader={moment(createdAt).format('MMMM D, YYYY')}
          onClick={openProfile}
        />
        {/* <Button variant='contained' size='small' className={classes.btn}>
          Unfollow
        </Button> */}
      </Grid>
      <CardMedia className={classes.media} image={img} title='Blog image' />
      <CardContent>
        <Typography variant='h5' component='h2'>
          {title}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton title='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        {checkUser() ? (
          <Fragment>
            <ConfirmDialog
              title='Delete Blog'
              content='Are you sure you want to delete this blog?'
              onConfirm={onDeleteBlog}
              btnStyle={classes.edtBtn}
            >
              <DeleteIcon />
            </ConfirmDialog>

            <BlogForm editMode={true} blog={blog} />
          </Fragment>
        ) : (
          ''
        )}

        <Link
          component='button'
          variant='body2'
          color='secondary'
          className={classes.expand}
          onClick={handleExpandClick}
        >
          SEE MORE
        </Link>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>{body}</Typography>
          <div className={classes.tagsDiv}>
            {tags.length !== 0 &&
              tags.map(tag => (
                <Chip label={tag} key={tag} className={classes.tags} />
              ))}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BlogCard;
