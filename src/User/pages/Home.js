import { useEffect, useState } from "react";
import TreeArea from "../components/TreeArea";
import DecoItem from "../components/DecoItem";
import MyItemList from "../components/MyItem";
import TakePic from "../components/TakePic";
import Modal from "../components/Modal";

export default function Home() {

  // User
  const [userInfo, setUserInfo] = useState({
    id: 0,
    username: "",
    points: 0
  });

  // get userinfo from the sessionStorage
  useEffect(() => {
    const rawUserData = sessionStorage.getItem("loggedInUser");
    if (rawUserData) {
      try {
        const parsedData = JSON.parse(rawUserData);
        const { id, username, points } = parsedData;
        setUserInfo({ id, username, points });
        console.log(parsedData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    } else {
      console.error("No user data found in sessionStorage.");
    }
  }, []);

  // Tree and Ornaments state
  const [decoItems, setDecoItems] = useState({
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
  });
  const [removedItems, setRemovedItems] = useState([]);

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Tab switch
  const [selectedTab, setSelectedTab] = useState("deco");

  // Modal close
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Check if Tree is full
  const TreeItemFull = () => {
    return Object.values(decoItems).every((item) => item !== null);
  };

  // Buy item
  const buyItem = (item) => {
    console.log("item: ", item);
    if (userInfo.points >= item.points) {
      const emptySpot = Object.keys(decoItems).find((key) => decoItems[key] === null);
      if (emptySpot) {
        setDecoItems((prevState) => ({
          ...prevState,
          [emptySpot]: item,
        }));
        setUserInfo((prevState) => ({
          ...prevState,
          points: prevState.points - item.points,
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

  // Remove item
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

  // Add My Item to Tree
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

  // Rendering
  return (
    <div className="w-100">
      {/* Screenshot function */}
      <TakePic targetClass=".tree-area" fileName="merrychristmas.png" />

      <h1 className="treeTitle">
        <span>{userInfo.username || "Guest"}</span>'s <br /> Christmas Tree
      </h1>

      {/* tree & ornaments */}
      <div className="d-flex flex-column flex-lg-row">
        {/* tree */}
        <TreeArea decoItems={decoItems} removeItem={removeItem} />

        {/* ornaments */}
        {selectedTab === "deco" ? (
          <DecoItem
            buyItem={buyItem}
            points={userInfo.points}
            switchToMyItems={() => setSelectedTab("myItems")}
            isTreeFull={TreeItemFull()}
          />
        ) : (
          <MyItemList
            myItems={removedItems}
            addMyItem={addMyItem}
            points={userInfo.points}
            switchToDeco={() => setSelectedTab("deco")}
          />
        )}
      </div>

      {/* Modal Component */}
      {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}