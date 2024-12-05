import "../css/main.css";

const Modal = ({ message, onClose }) => {
    const handleConfirm = () => onClose(true); // confirm btn
  
    // if click outside of modal, close modal
    const handleModalClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose(false);
      }
    };
  
    return (
      <div className="modal-deco" onClick={handleModalClick}>
        <div className="modalContent-deco">
          <p className="modal-msg">{message}</p>
            <button onClick={handleConfirm} className="confirmButton">
              Confirm
            </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  