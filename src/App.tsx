import { Button, Typography } from "antd";
import React, { useState } from "react";

export function App() {
  const [state, setState] = useState(false);

  return (
    <div>
      <div>This is Header</div>
      <div>
        <button onClick={() => setState((state) => !state)}>
          change image
        </button>

        {/* Attention, critical code here */}
        <img src={require(state ? "./test.png" : "./test2.png")} alt="" />

        <Typography>This is Content</Typography>
        <p className="text">this is a text</p>
        <Button onClick={() => alert("test")}>Button</Button>
      </div>
      <div>This is Footer</div>
    </div>
  );
}
