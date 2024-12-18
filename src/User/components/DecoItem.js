import { useState, useEffect } from "react";
import '../css/treeGrid.css';
import Modal from "../components/Modal";

export default function DecoItem({ buyItem, switchToMyItems, points }) {
  const [decoration, setDecoration] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // to check modal state
  const [pendingItem, setPendingItem] = useState(null); // pending item

  useEffect(() => {
    fetch("http://localhost/Christmas_final/api/Decoration.php")
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Failed to fetch decorations");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data); // debugging
        setDecoration(data);
      })
      .catch((error) => console.error("Error fetching decorations:", error));
  }, []);

  const buyClick = (item) => {
    setPendingItem(item);
    setIsModalVisible(true); // display modal
  };

  const handleModalClose = (confirmed) => {
    if (confirmed && pendingItem) {
      buyItem(pendingItem);
    }
    setIsModalVisible(false); // close modal
    setPendingItem(null);
  };

  return (
    <div className="itemList">
      <div className="titleArea">
        <h2>Your Points : {points}</h2>
        <h4 onClick={switchToMyItems}>My Item &#62;</h4>
      </div>
      <ul className="DefaultItem">
        {decoration.map((item) => (
          <li key={item.id} onClick={() => buyClick(item)}>
            <img src={`${process.env.PUBLIC_URL}/${item.img}`} alt={item.deco_name} />
            <p>Points: <span>{item.points}</span></p>
          </li>
        ))}
      </ul>
      {isModalVisible && (
        <Modal
          message={`If you confirm, your points will be reduced by ${pendingItem?.points}.`}
          onClose={(confirmed) => handleModalClose(confirmed)}
        />
      )}
    </div>
  );
}
