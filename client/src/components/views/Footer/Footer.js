import React from "react";
import { Icon } from "antd";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p style={{ marginBottom: "5px" }}>
        {" "}
        LKH Coding <Icon type="smile" />
      </p>
      <a
        style={{ color: "rgba(0, 0, 0, 0.65)" }}
        href="https://github.com/LKHcoding/ReactYoutube"
      >
        {" "}
        https://github.com/LKHcoding/ReactYoutube
      </a>
    </div>
  );
}

export default Footer;
