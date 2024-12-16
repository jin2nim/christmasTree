import { useEffect, useState } from "react";
import TreeArea from "../components/TreeArea";
import DecoItem from "../components/DecoItem";
import MyItemList from "../components/MyItem";
import TakePic from "../components/TakePic";
import Modal from "../components/Modal";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("users"));
  const userName = user[0].name;

  const saveStateLocalStorage = () => {
    const savedPoints = localStorage.getItem("points");
    const savedDecoItems = localStorage.getItem("decoItems");
    const savedRemoveItems = localStorage.getItem("removeItems");

    return {
      // original initial point is 0 but only for test we gave the 20 points!
      points: savedPoints ? parseInt(savedPoints) : 20,
      decoItems: savedDecoItems ? JSON.parse(savedDecoItems) : {
        "deco-item-1": null,
        "deco-item-2": null,
        "deco-item-3": null,
        "deco-item-4": null,
        "deco-item-5": null,
        "deco-item-6": null,
        "deco-item-7": null,
        "deco-item-8": null,
        "deco-item-9": null,
        "deco-item-10": null,
        "deco-item-11": null,
        "deco-item-12": null,
        "deco-item-13": null
      },
      removeItems: savedRemoveItems ? JSON.parse(savedRemoveItems) : [],
    };
  };

  const { points: initialPoints, decoItems: initialDecoItems, removeItems: initialRemoveItems } = saveStateLocalStorage();

  const [points, setPoints] = useState(initialPoints);
  const [decoItems, setDecoItems] = useState(initialDecoItems);
  const [removedItems, setRemovedItems] = useState(initialRemoveItems);
  const [selectedTab, setSelectedTab] = useState("deco");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("points", points);
    localStorage.setItem("decoItems", JSON.stringify(decoItems));
    localStorage.setItem("removeItems", JSON.stringify(removedItems));
  }, [points, decoItems, removedItems]);

  const TreeItemFull = () => {
    return (
      decoItems && 
      Object.values(decoItems).length > 0 && 
      Object.values(decoItems).every((item) => item !== null)
    );
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

const buyItem = (item) => {
  if (points >= item.points) {
    setPoints((prevPoints) => prevPoints - item.points);
    const emptySpot = Object.keys(decoItems).find((key) => decoItems[key] === null);
    if (emptySpot) {
      setDecoItems((prevState) => ({
        ...prevState,
        [emptySpot]: item,
      }));
    } else {
      const newItemId = { ...item, id: Date.now() };
      setRemovedItems((prevItems) => [...prevItems, newItemId]);
      setModalMessage("Your Tree is full! New Item has been added to your Item List");
      setIsModalVisible(true);
    }
  } else {
    setModalMessage("Not enough points!");
    setIsModalVisible(true);
  }
};


  const removeItem = (key) => {
    const itemToRemove = decoItems[key];
    if (itemToRemove) {
      const newItemId = { ...itemToRemove, id: Date.now() };
      setRemovedItems((prevItems) => [...prevItems, newItemId]);
      setDecoItems((prevState) => ({
        ...prevState,
        [key]: null,
      }));
    }
  };

  const addMyItem = (item) => {
    if (TreeItemFull()) {
      setModalMessage("Your Tree is full! Remove an Item first!");
      setIsModalVisible(true);
      return;
    }
    setDecoItems((prevState) => {
      const emptySpot = Object.keys(decoItems).find((key) => decoItems[key] === null);
      return emptySpot ? { ...prevState, [emptySpot]: item } : prevState;
    });

    setRemovedItems((prevItems) => prevItems.filter((myItem) => myItem.id !== item.id));
  };

  return (
    <div className="w-100">
      {/* Screenshot function */}
      <TakePic targetClass=".tree-area" fileName="merrychristmas.png" />
      <h1 className="treeTitle">
        <span>{userName}</span>'s <br/>Christmas Tree
      </h1>
      <div className="d-flex flex-column flex-lg-row">
        <TreeArea decoItems={decoItems} removeItem={removeItem} />
        {selectedTab === "deco" ? (
          <DecoItem buyItem={buyItem} points={points} switchToMyItems={() => setSelectedTab("myItems")} isTreeFull={TreeItemFull()}/>
        ) : (
          <MyItemList
            myItems={removedItems}
            addMyItem={addMyItem}
            points={points}
            switchToDeco={() => setSelectedTab("deco")}
          />
        )}
      </div>
      {/* Modal Component */}
      {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}
