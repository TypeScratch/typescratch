import React, { useEffect } from 'react';
import './App.css';
import { default as background } from "./images/background.png";
const App = () => {
  useEffect(() => {
    const stage = document.getElementById("stage") as HTMLCanvasElement;

    if (!stage) {
      return;
    }

    const ctx = stage.getContext("2d");

    if (!ctx) {
      return;
    }

    const backgroundImg = new Image();
    backgroundImg.src = background;

    const callback = () => {
      ctx.translate(240, 180);
      ctx.rotate(45);
      ctx.fillRect(-10, -10, 20, 20);
      ctx.fillRect(-40, -40, 10, 10);
      ctx.rotate(45);
      ctx.fillRect(-10, -10, 20, 20);
      ctx.fillRect(-40, -40, 10, 10);
      ctx.rotate(45);
      ctx.fillRect(-10, -10, 20, 20);
      ctx.fillRect(-40, -40, 10, 10);
    };

    backgroundImg.onload = function () {
      ctx.drawImage(backgroundImg, 0, 0, 480, 360);
      callback();
    }

  });


  return (
    <div className="App">
      <header className="App-header">
        <canvas id="stage" width="480" height="360" style={{
          backgroundColor: "transparent",
          backgroundImage: `data:image/png;base64,${background}`,
          border: "0.0625rem solid hsla(0, 0%, 0%, 0.15)",
          borderRadius: "0.5rem",
          height: "360px",
          width: "480px"
        }}></canvas>
      </header>
    </div>
  );
}

export default App;
