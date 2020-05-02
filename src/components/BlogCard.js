import React from 'react';

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
import EditIcon from '@material-ui/icons/Edit';

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
  }
}));

const BlogCard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='blog author' className={classes.avatar}>
            B
          </Avatar>
        }
        title='Cady Emad'
        subheader='September 14, 2016'
      />
      <CardMedia
        className={classes.media}
        image='/img.png'
        title='Blog image'
      />
      <CardContent>
        <Typography variant='h5' component='h2'>
          Blog title
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton title='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton title='delete post'>
          <DeleteIcon />
        </IconButton>
        <IconButton title='edit post'>
          <EditIcon />
        </IconButton>

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
          <Typography paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BlogCard;
