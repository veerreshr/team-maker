import React from "react";

const Message = ({ variant, children }) => {
  return <div class={`alert alert-${variant}`} role="alert">{children}</div>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
