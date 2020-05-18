import React, { useState } from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0
    // width: '100%'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '130px'
    }
  }
}));

const Search = ({ search }) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');

  const submitResult = e => {
    setSearchValue(e.target.value);
    if (e.key === 'Enter') {
      search(searchValue);
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder='Search…'
        onKeyUp={e => submitResult(e)}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
      />
    </div>
  );
};
export default Search;
