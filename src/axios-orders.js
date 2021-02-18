import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-demo-68e41-default-rtdb.firebaseio.com/'
});

export default instance;