import { useEffect, useState } from "react";
import TreeArea from "../components/TreeArea";
import DecoItem from "../components/DecoItem";
import MyItemList from "../components/MyItem";
import TakePic from "../components/TakePic";
import Modal from "../components/Modal";

export default function Home() {
  // User state
  const [userInfo, setUserInfo] = useState({
    id: 0,
    username: "",
    points: 0,
  });

  // get userinfo from sessionStorage
  useEffect(() => {
    const rawUserData = sessionStorage.getItem("loggedInUser");
    if (rawUserData) {
      try {
        const parsedData = JSON.parse(rawUserData);
        const { id, username, points } = parsedData;
        setUserInfo({ id, username, points });
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const [decoration, setDecoration] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/web-dev-study/Final_Project/Back-end/Decoration.php")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch decorations");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Fetched Data:", data); // 디버깅
    setDecoration(data);
  })
  .catch((error) => console.error("Error fetching decorations:", error));
  }, []);

  // Tree and Ornaments state
  // using the php table
  const [decoItems, setDecoItems] = useState({});
  const [removedItems, setRemovedItems] = useState([]);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Tab state
  const [selectedTab, setSelectedTab] = useState("deco");

  // Modal close function
  const closeModal = () => setIsModalVisible(false);

  // Check if Tree is full
  const TreeItemFull = () => Object.values(decoItems).every((item) => item !== null);

  // Update user points
  const updateUserPoints = async (pointsChange) => {
    try {
      const response = await fetch("http://localhost:8080/web-dev-study/Final_Project/Back-end/Points/updatePoints.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userInfo.id, points_change: pointsChange }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setUserInfo((prev) => ({ ...prev, points: prev.points + pointsChange }));
      } else {
        console.error("Failed to update points:", data.message);
      }
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  // Buy item function
  const buyItem = async (item) => {
    if (userInfo.points >= item.points) {
      await updateUserPoints(-item.points);
  
      const response = await fetch(`http://localhost:8080/web-dev-study/Final_Project/Back-end/Points/getPoints.php?user_id=${userInfo.id}`);
      const data = await response.json();
      if (data.status === "success") {
        setUserInfo((prev) => ({ ...prev, points: data.points }));
        sessionStorage.setItem("loggedInUser", JSON.stringify({ ...JSON.parse(sessionStorage.getItem("loggedInUser")), points: data.points }));
  
        const buyItemResponse = await fetch("http://localhost:8080/web-dev-study/Final_Project/Back-end/Points/buyItem.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userInfo.id, item_id: item.id, deco_name: item.deco_name, img: decoration.img }), // deco_name과 img 추가
        });
  
        const buyItemData = await buyItemResponse.json();
        if (buyItemData.status === "success") {
          const emptySpot = Object.keys(decoItems).find((key) => decoItems[key] === null);
          if (emptySpot) {
            setDecoItems((prevState) => ({
              ...prevState,
              [emptySpot]: {
                id: decoItems.id,
                deco_name: decoItems.deco_name,
                img: decoItems.img,
              },
            }));
          } else {
            setModalMessage("Your tree is full! Item added to your list.");
            setIsModalVisible(true);
          }
        } else {
          console.error("Error adding item to tree:", buyItemData.message);
        }
      } else {
        console.error("Error fetching points:", data.message);
      }
    } else {
      setModalMessage("Not enough points!");
      setIsModalVisible(true);
    }
  };
  
  // Fetch user's purchased items
  useEffect(() => {
    const fetchDecoItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/web-dev-study/Final_Project/Back-end/Points/getDecoItem.php?user_id=${userInfo.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch deco items");
        }
  
        const data = await response.json();
        console.log("Fetched Deco Items:", data);
  
        if (data.status === "success") {
          setDecoItems(data.items); // 서버에서 받은 데이터를 바로 상태에 반영
        } else {
          console.error("Error fetching deco items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching deco items:", error);
      }
    };
  
    if (userInfo.id) {
      fetchDecoItems();
    }
  }, [userInfo.id]);
  
  
  

  // Remove item from tree
  const removeItem = (key) => {
    const itemToRemove = decoItems[key];
    if (itemToRemove) {
      const newItemId = { ...itemToRemove, id: Date.now() };
      setRemovedItems((prevItems) => [...prevItems, newItemId]);
      setDecoItems((prevState) => ({ ...prevState, [key]: null }));
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

  return (
    <div className="w-100">
      <TakePic targetClass=".tree-area" fileName="merrychristmas.png" />
      <h1 className="treeTitle">
        <span>{userInfo.username || "Guest"}</span>'s <br /> Christmas Tree
      </h1>

      <div className="d-flex flex-column flex-lg-row">
        <TreeArea decoItems={decoItems} removeItem={removeItem} />
        {selectedTab === "deco" ? (
          <DecoItem buyItem={buyItem} points={userInfo.points} switchToMyItems={() => setSelectedTab("myItems")} isTreeFull={TreeItemFull()} />
        ) : (
          <MyItemList myItems={removedItems} addMyItem={addMyItem} points={userInfo.points} switchToDeco={() => setSelectedTab("deco")} />
        )}
      </div>

      {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}