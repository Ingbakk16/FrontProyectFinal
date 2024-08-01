// src/App.js
import React, { useEffect, useState } from 'react';
import { getItems, createItem } from './services/itemService';

const App = () => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await getItems();
        setItems(response.data);
    };

    const handleAddItem = async () => {
        const newItem = { name: itemName };
        await createItem(newItem);
        fetchItems();
        setItemName('');
    };

    return (
        <div>
            <h1>Items</h1>
            <input 
                type="text" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
            />
            <button onClick={handleAddItem}>Add Item</button>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App
