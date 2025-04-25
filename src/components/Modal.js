import "./Modal.css";

const Modal = (props) => {
  console.log("props.data", props.data);
  // let headings = [];
  // if (props.data[0]) {
  const headings = Object.keys(props.data[0]);
  // }
  return (
    <div className='popup-content-container'>
      <div>{props.title}</div>
      <div>{props.description}</div>
      <div>
        <pre>{props.query}</pre>
      </div>
      <div>
        {!props.isloading && (
          <table>
            <thead>
              <tr>
                {headings.map((heading, index) => {
                  return <th key={index}>{heading}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {props.data.map((item, index) => {
                const rowData = headings.map((heading) => {
                  return <td>{item[heading]}</td>;
                });
                return <tr key={index}>{rowData}</tr>;
              })}
            </tbody>
          </table>
        )}
      </div>
      {/* <div>{props.data}</div> */}
      <button onClick={props.onClose}>Close</button>
    </div>
  );
};

export default Modal;
