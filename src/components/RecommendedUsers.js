import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { backendUrl } from '../config';
import UserCard from '../components/UserCard';

const RecommendedUsers = () => {
  const [users, setUsers] = useState([]);
  const [newfollower, setNewFollower] = useState(false);

  const getUsers = async () => {
    const { data } = await axios.get(`${backendUrl}/user/recommendations`);
    setUsers(data);
  };
  const newFollowerAdded = () => {
    setNewFollower(true);
  };

  useEffect(() => {
    getUsers();
  }, [newfollower]);

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant='h5'>Recomended Blogs</Typography>
      <Divider />
      {users.map(user => (
        <UserCard
          key={user._id}
          user={user}
          newFollowerAdded={newFollowerAdded}
        />
      ))}
    </Paper>
  );
};

export default RecommendedUsers;
