import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? token : '';
  return config;
});

export default axios.interceptors.response.use(
  response => {
    const { message } = response.data;
    toast.success(message);
    return response;
  },
  function(error) {
    if (error.response) {
      if (error.response.status === 401) return (error.response.data = {});

      const { message } = error.response.data;
      toast.error(message);
      // auth.logout();
      // router.replace('/auth/login');
    }
    return Promise.reject(error.response);
  }
);
