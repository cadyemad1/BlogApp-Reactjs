import axios from 'axios';

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? token : '';
  console.log('**', config);

  return config;
});
