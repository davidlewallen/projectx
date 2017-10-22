import axios from 'axios';

const API = {
  genres: {
    get: () => axios.get('/api/genres'),
    post: (title, genre) => axios.post('/api/genres', { title, genre }),
    put: () => axios.put('/api/genres'),
    delete: () => axios.delete('/api/genres'),
  },
};

export default API;
