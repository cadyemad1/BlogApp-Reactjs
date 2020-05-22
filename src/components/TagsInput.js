import React, { useState, useEffect } from 'react';
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
    if (e.key === 'Enter' && e.target.value !== '') {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const removeTags = (e, index) => {
    setTags(tags.filter(tag => tags.indexOf(tag) !== index));
  };

  useEffect(() => {
    selectedTags(tags);
  }, [tags]);

  return (
    <div>
      <TextField
        margin='dense'
        id='tags'
        label='Blog Tags'
        type='text'
        fullWidth
        helperText='Press Enter to add tag!'
        onKeyUp={e => addTags(e)}
      />
      <ul className={classes.list}>
        {tags.map((tag, index) => (
          <li key={index}>
            <Chip
              label={tag}
              onDelete={e => removeTags(e, index)}
              className={classes.chip}
              color='primary'
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsInput;
