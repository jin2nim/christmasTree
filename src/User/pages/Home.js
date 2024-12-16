import { useEffect, useState } from "react";
import TreeArea from "../components/TreeArea";
import DecoItem from "../components/DecoItem";
import MyItemList from "../components/MyItem";
import TakePic from "../components/TakePic";
import Modal from "../components/Modal";

// API 함수들
const fetchUserData = async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();
  return data;
};

const updateUserData = async (userId, updatedData) => {
  await fetch(`/api/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
};

export default function Home() {
  const userId = localStorage.getItem("loggedInUserId");

  // userId가 없을 경우 처리
  if (!userId) {
    console.error("User ID not found in localStorage");
    // 이 부분에서 로그인 페이지로 리다이렉트할 수 있습니다.
  }

  const [userData, setUserData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("deco");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData(userId);
      setUserData(data);
    };

    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const buyItem = async (item) => {
    if (userData.points >= item.points) {
      const updatedPoints = userData.points - item.points;
      const emptySpot = Object.keys(userData.decoItems).find((key) => userData.decoItems[key] === null);

      let updatedDecoItems = { ...userData.decoItems };
      if (emptySpot) {
        updatedDecoItems[emptySpot] = item;
      } else {
        updatedDecoItems = userData.decoItems;
        const newItemId = { ...item, id: Date.now() };
        const updatedRemovedItems = [...userData.removeItems, newItemId];
        setModalMessage("Your Tree is full! New Item has been added to your Item List");
        setIsModalVisible(true);
        await updateUserData(userId, { points: updatedPoints, decoItems: updatedDecoItems, removeItems: updatedRemovedItems });
      }

      await updateUserData(userId, { points: updatedPoints, decoItems: updatedDecoItems });
      setUserData((prevData) => ({ ...prevData, points: updatedPoints, decoItems: updatedDecoItems }));
    } else {
      setModalMessage("Not enough points!");
      setIsModalVisible(true);
    }
  };

  const removeItem = async (key) => {
    const itemToRemove = userData.decoItems[key];
    if (itemToRemove) {
      const newItemId = { ...itemToRemove, id: Date.now() };
      const updatedRemovedItems = [...userData.removeItems, newItemId];

      const updatedDecoItems = { ...userData.decoItems };
      updatedDecoItems[key] = null;

      await updateUserData(userId, { points: userData.points, decoItems: updatedDecoItems, removeItems: updatedRemovedItems });
      setUserData((prevData) => ({ ...prevData, decoItems: updatedDecoItems, removeItems: updatedRemovedItems }));
    }
  };

  const addMyItem = async (item) => {
    if (Object.values(userData.decoItems).every((value) => value !== null)) {
      setModalMessage("Your Tree is full! Remove an Item first!");
      setIsModalVisible(true);
      return;
    }

    const updatedDecoItems = { ...userData.decoItems };
    const emptySpot = Object.keys(updatedDecoItems).find((key) => updatedDecoItems[key] === null);
    if (emptySpot) {
      updatedDecoItems[emptySpot] = item;
    }

    const updatedRemovedItems = userData.removeItems.filter((myItem) => myItem.id !== item.id);

    await updateUserData(userId, { points: userData.points, decoItems: updatedDecoItems, removeItems: updatedRemovedItems });
    setUserData((prevData) => ({ ...prevData, decoItems: updatedDecoItems, removeItems: updatedRemovedItems }));
  };

  return userData ? (
    <div className="w-100">
      <TakePic targetClass=".tree-area" fileName="merrychristmas.png" />
      <h1 className="treeTitle">
        <span>{userData.name}</span>'s <br />Christmas Tree
      </h1>
      <div className="d-flex flex-column flex-lg-row">
        <TreeArea decoItems={userData.decoItems} removeItem={removeItem} />
        {selectedTab === "deco" ? (
          <DecoItem
            buyItem={buyItem}
            points={userData.points}
            switchToMyItems={() => setSelectedTab("myItems")}
            isTreeFull={Object.values(userData.decoItems).every((item) => item !== null)}
          />
        ) : (
          <MyItemList
            myItems={userData.removeItems}
            addMyItem={addMyItem}
            points={userData.points}
            switchToDeco={() => setSelectedTab("deco")}
          />
        )}
      </div>
      {/* Modal Component */}
      {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

