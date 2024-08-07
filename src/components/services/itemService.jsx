// src/services/itemService.js
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/items';

export const getItems = async () => {
    return await axios.get(API_URL);
};

export const createItem = async (item) => {
    return await axios.post(API_URL, item);
};
