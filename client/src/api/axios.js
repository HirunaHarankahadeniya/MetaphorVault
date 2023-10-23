// set up an axios instance with some defaults
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default axiosClient;