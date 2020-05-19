import React, { useState } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    marginRight: theme.spacing(0.5)
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    flexWrap: 'wrap'
  }
}));

const TagsInput = ({ selectedTags, tagsArr }) => {
  const classes = useStyles();
  const [tags, setTags] = useState(tagsArr || []);

  const addTags = e => {
    if ((e.key === 'Enter' || e.keyCode === 32) && e.target.value !== '') {
      setTags([...tags, e.target.value]);
      selectedTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  return (
    <div>
      <TextField
        margin='dense'
        id='tags'
        label='Blog Tags'
        type='text'
        fullWidth
        onKeyUp={e => addTags(e)}
      />
      <ul className={classes.list}>
        {tags.map((tag, index) => (
          <li key={index}>
            <Chip
              label={tag}
              onDelete={() => removeTags(index)}
              className={classes.chip}
              color='primary'
            />
            {/* <span>{tag}</span>
            <CancelIcon onClick={() => removeTags(index)} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsInput;
