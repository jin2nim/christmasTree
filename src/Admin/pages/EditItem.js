import React, { useState, useEffect } from "react";
import "../adminCss/editItem.css";

export default function EditItem() {
  const [decorations, setDecorations] = useState([]); 
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    points: "",
  }); 
  const [newItemData, setNewItemData] = useState({
    name: "",
    points: "",
    img: "",
  });
  const [previewImg, setPreviewImg] = useState(""); 
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/web-dev-study/Final_Project/Back-end/Decoration.php")
      .then((response) => response.json())
      .then((data) => setDecorations(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemData({
      ...newItemData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePath = `/svg/decoration/${file.name}`;
      console.log("Setting img path:", filePath);
  
      setPreviewImg(URL.createObjectURL(file));
      setNewItemData({
        ...newItemData,
        img: filePath,
      });
    }
  };
  
  const handleAddItem = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/web-dev-study/Final_Project/Back-end/Decoration.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newItemData.name,
            points: parseInt(newItemData.points) || 0,
            img: `${newItemData.img}`, // 경로 형태로만 저장
          }),
        }
      );
  
      console.log("HTTP Response status:", response.status);
      const textResponse = await response.text();
      console.log("Raw server response:", textResponse);
  
      if (response.ok) {
        const result = JSON.parse(textResponse);
        console.log("Parsed server response:", result);
  
        if (result.status === "insert success") {
          alert("Item added successfully");
          window.location.reload();
        } else {
          alert(`Error: ${result.message}`);
        }
      } else {
        alert("HTTP response error");
      }
    } catch (error) {
      console.error("Error during fetch or parsing:", error);
    }
  };
  
  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setFormData({
      id: item.id,
      name: item.deco_name,
      points: item.points,
      img: item.img, // 기존 이미지 경로 유지
    });
  };
  

  const handleCancel = () => {
    setEditingItemId(null);
    setFormData({ id: null, name: "", points: "" });
  };

  const handleSaveChanges = async () => {
    console.log("Form Data: ", formData);
    try {
      const response = await fetch(
        "http://localhost:8080/web-dev-study/Final_Project/Back-end/Decoration.php",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: formData.id,
            name: formData.name,
            points: parseInt(formData.points) || 0,
            img: formData.img || "default.svg", // 비어있으면 default.svg로 fallback
          }),
        }
      );
  
      const result = await response.json();
      console.log("Server Response: ", result);
  
      if (response.ok && result.status === 'update success') {
        alert("Changes saved successfully");
        setEditingItemId(null);
        window.location.reload();
      } else {
        alert("Error while saving");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unexpected error occurred");
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/web-dev-study/Final_Project/Back-end/DeleteItem.php",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
  
      const textResponse = await response.text();
      console.log("Raw server response:", textResponse);
  
      let result;
      try {
        result = JSON.parse(textResponse);
      } catch (error) {
        console.error("Failed to parse server response as JSON:", error);
        alert("Unexpected server response");
        return;
      }
  
      console.log("Parsed server response:", result);
  
      if (response.ok && result.status === "delete success") {
        alert("Deleted successfully");
        setDecorations(decorations.filter((item) => item.id !== id));
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during delete fetch:", error);
      alert("Unexpected error occurred");
    }
  };  
  
  return (
    <div className="editItemContainer">
      <h1>Item List</h1>
      

      <div className="formSection">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input
          name="name"
          placeholder="Write New Item's name"
          value={newItemData.name}
          onChange={handleInputChange}
        />
        <input
          name="points"
          placeholder="Write New Item's points"
          type="number"
          value={newItemData.points}
          onChange={handleInputChange}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <div className="itemSection">
        {decorations.length > 0 ? (
          <ul className="itemList">
            {previewImg &&
            <li className="preview">
              <img src={previewImg} alt="Preview"/>
              <div className="itemInfo">
                <h4>[New Item Preview]</h4>
                <p>Set Name : {newItemData.name}</p>
                <p>Set Points : {newItemData.points}</p>
              </div>
            </li>
             }
            {decorations.map((item) => (
              <li key={item.id}>
                <img
                  src={`${process.env.PUBLIC_URL}/${item.img}`}
                  alt={item.deco_name}
                />
                <div className="itemInfo">
                  <p>Index : {item.id}</p>
                  {editingItemId === item.id ? (
                    <>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      <input
                        name="points"
                        type="number"
                        value={formData.points}
                        onChange={(e) =>
                          setFormData({ ...formData, points: e.target.value })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <p>Name : {item.deco_name}</p>
                      <p>Points : {item.points}</p>
                    </>
                  )}
                </div>
                <div className="btnArea">
                  {editingItemId === item.id ? (
                    <>
                      <button onClick={handleSaveChanges}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </>
                  )}
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
