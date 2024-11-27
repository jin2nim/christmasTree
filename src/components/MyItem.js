import '../css/treeGrid.css';

export default function MyItemList({ myItems, switchToDeco, points, addMyItem }) {
  const myItemClick = (item) => {
    addMyItem(item)
  }
  
    return (
    <div className="itemList">
      <div className="titleArea">
        <h2>Your Points : {points}</h2>   
        <h4 onClick={switchToDeco}>All List &#62;</h4>
      </div>
      
        <ul className="MyItem">
            {myItems.map((item, index) => (
            <li key={index} onClick={() => myItemClick(item)}>
              <img src={`${process.env.PUBLIC_URL}/${item.img}`} alt={item.deco_name} />
              <p>{item.deco_name}</p>
            </li>
            ))}
        </ul>
    </div>
  );
}
