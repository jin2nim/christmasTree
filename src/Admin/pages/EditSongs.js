import React, { useState, useEffect } from "react";
import "../adminCss/editItem.css";

export default function EditSongs() {
  const [decorations, setDecorations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetch("http://localhost:8080/web-dev-study/Final_Project/Back-end/music.php")
      .then(response => response.json())
      .then(data => setDecorations(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddItem = async () => {
    const response = await fetch(
      "http://localhost:8080/web-dev-study/Final_Project/Back-end/music.php",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();
    if (result.status === 'success') {
      alert("Added successfully");
      window.location.reload();
    } else {
      alert("Error while adding");
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `http://localhost:8080/web-dev-study/Final_Project/Back-end/DeleteDecoration.php?id=${id}`,
      { method: 'DELETE' }
    );

    if (response.ok) {
      alert('Deleted successfully');
      window.location.reload();
    } else {
      alert('Error');
    }
  };

  return (
    <div className="editItemContainer">
      <h1>Edit Items</h1>
      {/* 팝업으로 만들거나 이미지 선택하면 이미지 이름을 경로로 지정하도록 만들어볼 것! id는 Auto */}
      <div className="formSection">
        <input type="file" accept="image/*"/>
        <input
          name="name"
          placeholder="Write the Name"
          onChange={handleInputChange}
        />
        <input
          name="Points"
          placeholder="Write the Point"
          onChange={handleInputChange}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <div className="itemSection">
        <h2>Item List</h2>
        {decorations.length > 0 ? (
          <ul className="itemList">
            {decorations.map(item => (
              <li key={item.id}>
                <img src={`${process.env.PUBLIC_URL}/${item.img}`} alt={item.deco_name} />
                <div className="itemInfo">
                    <p>Index : {item.id}</p>
                    <p>Name : {item.name}</p>
                    <p>Artist : {item.artist}</p>
                    <p>Duration : {item.duration}</p>
                </div>
                <div className="btnArea">
                    <button className="editBtn" onClick={() => handleDelete(item.id)}>Edit</button>
                    <button className="deleteBtn" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}
