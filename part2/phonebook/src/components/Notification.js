const Notification = ({ message, errorType }) => {
  if (message === null) {
    return null;
  }
  let myClass = "";
  if (errorType === "success") {
    myClass = "success";
  } else if (errorType === "error") {
    myClass = "error";
  } else {
    myClass = "";
  }

  return <div className={myClass}>{message}</div>;
};

export default Notification;
