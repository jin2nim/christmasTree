import '../css/treeGrid.css';

export default function TreeArea({ decoItems, removeItem }) {
  const removeClick = (key) => {
    removeItem(key);
  }

  return (
    <div className="tree-area">
      <img
        src={`${process.env.PUBLIC_URL}/svg/Main-Tree.svg`}
        alt="Main Tree"
      />
      <div className="tree-grid">
        {Object.keys(decoItems).map((key) => (
          <div key={key} id={key} onClick={() => removeClick(key)}>
            {decoItems[key] && (
              <img src={`${process.env.PUBLIC_URL}/${decoItems[key].img}`} alt={decoItems[key].deco_name} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
