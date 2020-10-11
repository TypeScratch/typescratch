import { Stage } from "./domain/Stage";

export const ScratchScript = async (stage: Stage) => {
  const cat = await stage.addSprite();

  stage.addText({
    color: "white",
    fontFamily: "Marker",
    shadowColor: "black",
    text: () => `Cat x : ${cat.x.toPrecision(9)}`,
  });

  stage.addText({
    color: "white",
    shadowColor: "black",
    text: () => `Cat y : ${cat.y.toPrecision(9)}`,
    y: stage.maxY - 60,
  });

  stage.addText({
    color: "white",
    shadowColor: "black",
    text: () => `Cat direction : ${cat.direction.toString()}`,
    y: stage.maxY - 90,
  });

  const apple = await stage.addSprite({
    costume: "apple",
  });

  const catScript = async () => {
    cat.setXYTo(-273, -70);

    while (!(cat.x > -1)) {
      cat.moveSteps((0 - cat.x) / 20);
      await stage.waitForNextFrame();
    }

    cat.turnLeftDegrees(5);
    await stage.waitForNextFrame();

    while (!(cat.direction === 90)) {
      cat.turnLeftDegrees(5);
      cat.moveSteps(5);
      await stage.waitForNextFrame();
    }

    while (!(cat.x > 279)) {
      cat.changeSizeBy(2);
      cat.changeXBy((280 - cat.x) / 20);
      cat.changeYBy((280 - cat.x) / 20);
      await stage.waitForNextFrame();
    }
  };

  const appleScript = async () => {
    apple.setXYTo(256, 197);

    const appleXTarget = Math.round(apple.width / 2 + 3 - 240);
    const appleYTarget = Math.round(apple.height / 2 + 3 - 180);

    while (!(apple.x < appleXTarget + 2 && apple.y < appleYTarget + 2)) {
      let newX = apple.x;
      let newY = apple.y;

      if (apple.x > appleXTarget) {
        newX = apple.x - (apple.x - appleXTarget) / 20;
      }

      if (apple.y > appleYTarget) {
        newY = apple.y - (apple.y - appleYTarget) / 30;
      }

      apple.turnLeftDegrees(5);
      apple.setXYTo(newX, newY);
      await stage.waitForNextFrame();
    }

    while (!(apple.direction === 90)) {
      apple.turnLeftDegrees(5);
      await stage.waitForNextFrame();
    }
  };

  await Promise.all([catScript(), appleScript()]);
};
