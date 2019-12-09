import React, { useEffect } from "react";
// tslint:disable-next-line:no-import-side-effect
import "./App.css";
import { Stage } from "./domain/Stage";
import { ScratchScript } from "./ScratchScript";
// tslint:disable-next-line:no-default-import

const CANVAS_WIDTH = 480; // window.innerWidth - 20; // Scratch: 480
const CANVAS_HEIGHT = 360; // window.innerHeight - 20; // Sratch: 360
const canvasId = "stage";

export const App = () => {
  useEffect(() => {
    const stage = new Stage({
      canvasId,
      height: CANVAS_HEIGHT,
      nbFramesPerSecond: 25,
      width: CANVAS_WIDTH
    });

    stage
      .addBackdrop({ backdropSrc: "desert.png" })
      .then(() => ScratchScript(stage))
      .then(() => {
        window.clearInterval(stage.interval);
      })
      .catch(err => {
        throw err;
      });
  });

  return (
    <div className="App">
      <header className="App-header">
        <canvas id={canvasId} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      </header>
    </div>
  );
};
