import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/"; // Đường dẫn tương đối
import { Container } from "@mui/material";

import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import './firebase/config'

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// ✅ Polyfill setImmediate nếu không có (tránh lỗi khi dùng draft-js)
if (typeof setImmediate === "undefined") {
  window.setImmediate = function (fn, ...args) {
    return setTimeout(fn, 0, ...args);
  };
}


ReactDOM.createRoot(document.getElementById("root")).render(

    <Container maxWidth="lg" sx={{textAlign: "center", marginTop: "50px"}}>
      <RouterProvider router={router} />
    </Container>
  
);
