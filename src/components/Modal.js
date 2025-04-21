const Modal = (props) => {
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.description}</div>
      <div>{props.sql}</div>
      <div>{props.data}</div>
      <button onClick={props.onClose}>Close</button>
    </div>
  );
};

export default Modal;
