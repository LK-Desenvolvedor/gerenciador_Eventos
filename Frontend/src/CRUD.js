import React, { useState } from 'react';

const CRUD = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  const editItem = (index) => {
    setEditIndex(index);
    setEditValue(items[index]);
  };

  const saveEdit = () => {
    const updatedItems = [...items];
    updatedItems[editIndex] = editValue;
    setItems(updatedItems);
    setEditIndex(-1);
    setEditValue('');
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div>
      <h2>CRUD Example</h2>
      {/* Formulário para adicionar novos itens */}
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      {/* Lista de itens */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              // Input para editar o item
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                {item}
                {/* Botões para editar e excluir o item */}
                <button onClick={() => editItem(index)}>Edit</button>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUD;