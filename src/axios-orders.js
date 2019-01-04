import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-20931.firebaseio.com/'

});

export default instance;