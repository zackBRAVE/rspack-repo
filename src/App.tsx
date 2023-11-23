import { Button, Typography } from "antd";
import React from "react";
import "./render.css";

export function App() {
  return (
    <div>
      <div>This is Header</div>
      <div>
        <Typography>This is Content</Typography>
        <p className="text">this is a text</p>
        <Button onClick={() => alert("test")}>Button</Button>
      </div>
      <div>This is Footer</div>
    </div>
  );
}
