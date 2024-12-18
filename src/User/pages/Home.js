// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TreeArea from "../components/TreeArea";
// import DecoItem from "../components/DecoItem";
// import MyItemList from "../components/MyItem";
// import TakePic from "../components/TakePic";
// import Modal from "../components/Modal";

// export default function Home() {
//   const navigate = useNavigate();

//   // sessionStorage에서 유저 데이터 바로 가져오기
//   const storedUserData = (() => {
//     const rawUserData = sessionStorage.getItem("loggedInUser");
//     console.log("Raw user data from sessionStorage:", rawUserData);  // 저장된 원본 데이터 확인
//     if (rawUserData) {
//       try {
//         const parsedData = JSON.parse(rawUserData);
//         console.log("Parsed user data:", parsedData);  // 파싱된 데이터 확인

//         // ID를 숫자로 변환해서 반환
//         return { ...parsedData, id: Number(parsedData.id) }; // id를 숫자로 변환
//       } catch (error) {
//         console.error("Failed to parse user data from sessionStorage:", error);
//       }
//     }
//     return null;
//   })();

//   // storedUserData가 제대로 로드되었는지 확인
//   if (storedUserData) {
//     console.log("User ID:", storedUserData.id);
//   } else {
//     console.error("No user data found in sessionStorage.");
//   }

//   // 예시로 Object.values()를 사용하기 전에 값이 null 또는 undefined가 아닌지 확인
//   if (storedUserData && storedUserData.username) {
//     const userValues = Object.values(storedUserData);
//     console.log("User Values:", userValues);
//   } else {
//     console.error("User data is incomplete or missing required fields.");
//   }

//   const [userData, setUserData] = useState(storedUserData);
//   const [selectedTab, setSelectedTab] = useState("deco");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   useEffect(() => {
//     // 유저 데이터가 없으면 로그인 페이지로 리다이렉트
//     if (!storedUserData) {
//       console.error("User data not found in sessionStorage");
//       navigate("/login");
//     }
//   }, [storedUserData, navigate]);

//   const closeModal = () => {
//     setIsModalVisible(false);
//   };

//   const buyItem = async (item) => {
//     if (userData.points >= item.points) {
//       const updatedPoints = userData.points - item.points;
//       const emptySpot = Object.keys(userData.decoItems).find((key) => userData.decoItems[key] === null);

//       let updatedDecoItems = { ...userData.decoItems };
//       if (emptySpot) {
//         updatedDecoItems[emptySpot] = item;
//       } else {
//         updatedDecoItems = userData.decoItems;
//         const newItemId = { ...item, id: Date.now() };
//         const updatedRemovedItems = [...userData.removeItems, newItemId];
//         setModalMessage("Your Tree is full! New Item has been added to your Item List");
//         setIsModalVisible(true);
//       }

//       setUserData((prevData) => ({
//         ...prevData,
//         points: updatedPoints,
//         decoItems: updatedDecoItems,
//       }));
//     } else {
//       setModalMessage("Not enough points!");
//       setIsModalVisible(true);
//     }
//   };

//   const removeItem = async (key) => {
//     const itemToRemove = userData.decoItems[key];
//     if (itemToRemove) {
//       const updatedRemovedItems = [...userData.removeItems, itemToRemove];

//       const updatedDecoItems = { ...userData.decoItems };
//       updatedDecoItems[key] = null;

//       setUserData((prevData) => ({
//         ...prevData,
//         decoItems: updatedDecoItems,
//         removeItems: updatedRemovedItems,
//       }));
//     }
//   };

//   const addMyItem = async (item) => {
//     if (Object.values(userData.decoItems).every((value) => value !== null)) {
//       setModalMessage("Your Tree is full! Remove an Item first!");
//       setIsModalVisible(true);
//       return;
//     }

//     const updatedDecoItems = { ...userData.decoItems };
//     const emptySpot = Object.keys(updatedDecoItems).find((key) => updatedDecoItems[key] === null);
//     if (emptySpot) {
//       updatedDecoItems[emptySpot] = item;
//     }

//     const updatedRemovedItems = userData.removeItems.filter((myItem) => myItem.id !== item.id);

//     setUserData((prevData) => ({
//       ...prevData,
//       decoItems: updatedDecoItems,
//       removeItems: updatedRemovedItems,
//     }));
//   };

//   return userData ? (
//     <div className="w-100">
//       <TakePic targetClass=".tree-area" fileName="merrychristmas.png" />
//       <h1 className="treeTitle">
//         <span>{userData.name}</span>'s <br />Christmas Tree
//       </h1>
//       <div className="d-flex flex-column flex-lg-row">
//         <TreeArea decoItems={userData.decoItems} removeItem={removeItem} />
//         {selectedTab === "deco" ? (
//           <DecoItem
//             buyItem={buyItem}
//             points={userData.points}
//             switchToMyItems={() => setSelectedTab("myItems")}
//             isTreeFull={Object.values(userData.decoItems).every((item) => item !== null)}
//           />
//         ) : (
//           <MyItemList
//             myItems={userData.removeItems}
//             addMyItem={addMyItem}
//             points={userData.points}
//             switchToDeco={() => setSelectedTab("deco")}
//           />
//         )}
//       </div>
//       {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// }



import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState({
    id: null,
    username: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    // Get user info from sessionStorage
    const rawUserData = sessionStorage.getItem("loggedInUser");
    console.log("Raw user data from sessionStorage:", rawUserData);  // original ver

    if (rawUserData) {
      try {
        const parsedData = JSON.parse(rawUserData);
        console.log("Parsed user data:", parsedData);  // parsed ver

        // split user datas and contain them into each variable
        const { id, username, email, role } = parsedData;
        setUserData({ id, username, email, role });

        // console
        console.log("User ID:", id);
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Role:", role);
      } catch (error) {
        console.error("Failed to parse user data from sessionStorage:", error);
      }
    } else {
      console.error("No user data found in sessionStorage.");
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>User ID: {userData.id}</p>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
    </div>
  );
}




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TreeArea from "../components/TreeArea";
// import DecoItem from "../components/DecoItem";
// import MyItemList from "../components/MyItem";
// import TakePic from "../components/TakePic";
// import Modal from "../components/Modal";

// export default function Home() {
//   const navigate = useNavigate();

//   // 상태 선언
//   const [userData, setUserData] = useState({
//     id: null,
//     username: "",
//     email: "",
//     role: "",
//     points: 0,
//     decoItems: {},
//     removeItems: []
//   });
//   const [selectedTab, setSelectedTab] = useState("deco");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   // sessionStorage에서 유저 데이터 로드
//   useEffect(() => {
//     const rawUserData = sessionStorage.getItem("loggedInUser");
//     if (rawUserData) {
//       try {
//         const parsedData = JSON.parse(rawUserData);
//         const { id, username, email, role, points, decoItems, removeItems } = parsedData;
//         setUserData({ id, username, email, role, points, decoItems, removeItems });
//       } catch (error) {
//         console.error("Failed to parse user data:", error);
//       }
//     } else {
//       console.error("No user data found in sessionStorage.");
//     }
//   }, []);

//   // 아이템 구매 함수
//   const buyItem = async (item) => {
//     if (userData.points >= item.points) {
//       const updatedPoints = userData.points - item.points;
//       const emptySpot = Object.keys(userData.decoItems).find((key) => userData.decoItems[key] === null);

//       let updatedDecoItems = { ...userData.decoItems };
//       if (emptySpot) {
//         updatedDecoItems[emptySpot] = item;
//       } else {
//         updatedDecoItems = userData.decoItems;
//         const newItemId = { ...item, id: Date.now() };
//         const updatedRemovedItems = [...userData.removeItems, newItemId];
//         setModalMessage("Your Tree is full! New Item has been added to your Item List");
//         setIsModalVisible(true);
//         await updateUserData(userData.id, { points: updatedPoints, decoItems: updatedDecoItems, removeItems: updatedRemovedItems });
//       }

//       await updateUserData(userData.id, { points: updatedPoints, decoItems: updatedDecoItems });
//       setUserData((prevData) => ({ ...prevData, points: updatedPoints, decoItems: updatedDecoItems }));
//     } else {
//       setModalMessage("Not enough points!");
//       setIsModalVisible(true);
//     }
//   };

//   // 아이템 제거 함수
//   const removeItem = async (key) => {
//     const itemToRemove = userData.decoItems[key];
//     if (itemToRemove) {
//       const newItemId = { ...itemToRemove, id: Date.now() };
//       const updatedRemovedItems = [...userData.removeItems, newItemId];

//       const updatedDecoItems = { ...userData.decoItems };
//       updatedDecoItems[key] = null;

//       await updateUserData(userData.id, { points: userData.points, decoItems: updatedDecoItems, removeItems: updatedRemovedItems });
//       setUserData((prevData) => ({ ...prevData, decoItems: updatedDecoItems, removeItems: updatedRemovedItems }));
//     }
//   };

//   // 내 아이템 추가 함수
//   const addMyItem = async (item) => {
//     if (Object.values(userData.decoItems).every((value) => value !== null)) {
//       setModalMessage("Your Tree is full! Remove an Item first!");
//       setIsModalVisible(true);
//       return;
//     }

//     const updatedDecoItems = { ...userData.decoItems };
//     const emptySpot = Object.keys(updatedDecoItems).find((key) => updatedDecoItems[key] === null);
//     if (emptySpot) {
//       updatedDecoItems[emptySpot] = item;
//     }

//     const updatedRemovedItems = userData.removeItems.filter((myItem) => myItem.id !== item.id);

//     await updateUserData(userData.id, { points: userData.points, decoItems: updatedDecoItems, removeItems: updatedRemovedItems });
//     setUserData((prevData) => ({ ...prevData, decoItems: updatedDecoItems, removeItems: updatedRemovedItems }));
//   };

//   // 모달 닫기 함수
//   const closeModal = () => {
//     setIsModalVisible(false);
//   };

//   // 화면에 렌더링
//   return userData ? (
//     <div className="w-100">
//       <TakePic targetClass=".tree-area" fileName="merrychristmas.png" />
//       <h1 className="treeTitle">
//         <span>{userData.username}</span>'s <br />Christmas Tree
//       </h1>
//       <div className="d-flex flex-column flex-lg-row">
//         <TreeArea decoItems={userData.decoItems} removeItem={removeItem} />
//         {selectedTab === "deco" ? (
//           <DecoItem
//             buyItem={buyItem}
//             points={userData.points}
//             switchToMyItems={() => setSelectedTab("myItems")}
//             isTreeFull={Object.values(userData.decoItems).every((item) => item !== null)}
//           />
//         ) : (
//           <MyItemList
//             myItems={userData.removeItems}
//             addMyItem={addMyItem}
//             points={userData.points}
//             switchToDeco={() => setSelectedTab("deco")}
//           />
//         )}
//       </div>
//       {/* Modal Component */}
//       {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// }
