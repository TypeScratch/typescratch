import { Stage } from "./domain/Stage";
import { Text } from "./domain/Text";

export const ScratchScript = async (stage: Stage) => {

  const bonjourScript = async () => {
    let texte: Text | undefined;

    for (let compteur = 0; compteur <= 255; compteur += 3) {
      texte = stage.addText({
        color: `rgb(${compteur},${compteur},${compteur})`,
        fontFamily: "Marker",
        fontSize: 50,
        shadowColor: `rgb(0,0,${compteur})`,
        text: "Bonjour",
        x: -100,
        y: 0
      });
      await stage.waitForNextFrame();
      stage.removeSpriteOrText(texte);
    }
  };

  const introScript = async () => {
    for (
      let compteur = 1;
      compteur <= stage.width + 500;
      compteur += stage.width / 200
    ) {
      const texte1 = stage.addText({
        color: "white",
        fontFamily: "Marker",
        fontSize: 25,
        shadowColor: "blue",
        text: "Il était une fois, dans le",
        x: stage.maxX - compteur,
        y: 130
      });
      const texte2 = stage.addText({
        color: "white",
        fontFamily: "Marker",
        fontSize: 25,
        shadowColor: "blue",
        text: "desert du Texas, un chat Geant,",
        x: stage.maxX - compteur,
        y: 60
      });
      const texte3 = stage.addText({
        color: "white",
        fontFamily: "Marker",
        fontSize: 25,
        shadowColor: "blue",
        text: "une pomme folle, un dromadaire",
        x: stage.maxX - compteur,
        y: -10
      });
      const texte4 = stage.addText({
        color: "white",
        fontFamily: "Marker",
        fontSize: 25,
        shadowColor: "blue",
        text: "mutant, qui voulaient DETRUIR",
        x: stage.maxX - compteur,
        y: -80
      });
      const texte5 = stage.addText({
        color: "white",
        fontFamily: "Marker",
        fontSize: 25,
        shadowColor: "blue",
        text: "la Terre!!",
        x: stage.maxX - compteur,
        y: -150
      });
      await stage.waitForNextFrame();

      stage.removeSpriteOrText(texte2);
      stage.removeSpriteOrText(texte1);
      stage.removeSpriteOrText(texte3);
      stage.removeSpriteOrText(texte4);
      stage.removeSpriteOrText(texte5);
    }
    for (
      let compteur = 1;
      compteur <= stage.width + 500;
      compteur += stage.width / 75
    ) {
      const texte6 = stage.addText({
        color: "white",
        fontFamily: "Marker",
        fontSize: 50,
        shadowColor: "blue",
        text: "Une soucoupe les en empeche!!",
        x: stage.maxX - compteur,
        y: 0
      });

      await stage.waitForNextFrame();
      stage.removeSpriteOrText(texte6);
    }
  };
  const plante = await stage.addSprite({
    costume: "plante.png",
    size: 30,
    visible: false,
    x: stage.maxX,
    y: stage.minY / 2
  });

  const cat = await stage.addSprite({ visible: false, x: stage.minX, y: -70 });

  const apple = await stage.addSprite({
    costume: "apple",
    visible: false,
    x: stage.maxX,
    y: stage.maxY
  });

  const saucoupe = await stage.addSprite({
    costume: "Saucoupe.png",
    size: 30,
    visible: false,
    y: stage.maxY
  });

  const droma = await stage.addSprite({
    costume: "dromadaire.png",
    size: 10,
    visible: false,
    x: stage.minX
  });


  let saucoupeDemarre = false;

  const distMaxX0 = -stage.maxX - 0;

  const planteScript = async () => {
    plante.show();
    while (plante.x > stage.minX) {
      plante.setXTo(plante.x - 4);
      await stage.waitForNextFrame();
    }
    plante.hide()
  };
  const planteScript2 = async () => {
    while (plante.x > stage.minX) {
      plante.turnLeftDegrees(10);
      await stage.waitForNextFrame();
    }
  };
  const planteYmax = -(stage.maxY * 0.5)
  const planteYmin = -(stage.maxY * 0.7)

  const planteScript3 = async () => {
    console.log(`plante.x : ${plante.x}`);
    console.log(`stage.minX : ${stage.minX}`);
    console.log(`plante.y : ${plante.y}`);
    console.log(`planteYmin : ${planteYmin}`);
    console.log(`planteYmax : ${planteYmax}`);

    plante.show();

    while (plante.x > stage.minX) {
      console.log(`plante.x : ${plante.x}`);

      console.log(`plante.y : ${plante.y}`);
      console.log(`planteYmin : ${planteYmin}`);
      console.log(`planteYmax : ${planteYmax}`);

      const positionX = plante.x - stage.maxX;
      const positionXBorneeA360 = positionX % 360;
      const angleEnDegres = positionXBorneeA360;
      const angleEnRadians = (angleEnDegres * 2 * Math.PI) / 360;
      const amplitudeDeplacement = Math.abs(Math.cos(angleEnRadians)) * 50;
      plante.setYTo((-stage.maxY * 0.7) + amplitudeDeplacement);

      await stage.waitForNextFrame();
    }
  }

  await stage.waitForNextFrame();
  const dromaScript = async () => {
    droma.show();
    while (droma.x < distMaxX0 / 2) {
      // droma.setXTo(-saucoupe.y);
      droma.moveSteps(6);
      await stage.waitForNextFrame();
    }
    saucoupeDemarre = true;

    while (droma.x < 0) {
      droma.moveSteps(6); // (Math.max(dromaX, -saucoupe.y));
      // droma.moveSteps(4);
      await stage.waitForNextFrame();
    }
    droma.hide();
    await stage.waitForNextFrame();
  };

  const dromaScript2 = async () => {
    while (droma.x < 0) {
      droma.changeSizeBy(10);
      await stage.waitForNextFrame();
      droma.changeSizeBy(-10);
      await stage.waitForNextFrame();
    }
  };

  const catScript = async () => {
    cat.show();
    while (!(cat.x > -1)) {
      cat.moveSteps((0 - cat.x) / 7); // 20);
      await stage.waitForNextFrame();
    }

    cat.turnLeftDegrees(10);
    await stage.waitForNextFrame();

    while (!(cat.direction === 90)) {
      cat.turnLeftDegrees(10);
      cat.moveSteps(5);
      await stage.waitForNextFrame();
    }

    while (cat.x < stage.maxX - 182) {
      cat.changeSizeBy(5);
      cat.changeXBy((stage.maxX - 180 - cat.x) / 20);
      cat.changeYBy((stage.maxY - 180 - cat.y) / 20);
      await stage.waitForNextFrame();
    }
  };

  const appleScript = async () => {
    apple.show();
    const appleXTarget = Math.round(apple.width / 2 + 3 - stage.maxX);
    const appleYTarget = Math.round(apple.height / 2 + 3 - stage.maxY);

    while (!(apple.x < appleXTarget + 2 && apple.y < appleYTarget + 2)) {
      let newX = apple.x;
      let newY = apple.y;

      if (apple.x > appleXTarget) {
        newX = apple.x - (apple.x - appleXTarget) / 20;
      }

      if (apple.y > appleYTarget) {
        newY = apple.y - (apple.y - appleYTarget) / 30;
      }

      apple.turnLeftDegrees(10);
      apple.setXYTo(newX, newY);
      await stage.waitForNextFrame();
    }

    while (!(apple.direction === 90)) {
      apple.turnLeftDegrees(10);
      await stage.waitForNextFrame();
    }
  };

  const saucoupeScript = async () => {
    while (!saucoupeDemarre) {
      await stage.waitForNextFrame();
    }
    saucoupe.show();
    while (saucoupe.y > 0) {
      saucoupe.setXYTo(saucoupe.x, -droma.x * 6);
      await stage.waitForNextFrame();
    }
    while (saucoupe.y > apple.y + 10 || saucoupe.x > apple.x + 10) {
      if (saucoupe.x > apple.x + 10) {
        saucoupe.setXYTo(saucoupe.x - 8, saucoupe.y);
      }
      if (saucoupe.y > apple.y + 10) {
        saucoupe.setXYTo(saucoupe.x, saucoupe.y - 8);
      }
      await stage.waitForNextFrame();
    }
    apple.hide();
    while (saucoupe.x < cat.x - 10 || saucoupe.y < cat.y - 10) {
      if (saucoupe.x < cat.x - 10) {
        saucoupe.setXYTo(saucoupe.x + 8, saucoupe.y);
      }
      if (saucoupe.y < cat.y - 10) {
        saucoupe.setXYTo(saucoupe.x, saucoupe.y + 8);
      }
      await stage.waitForNextFrame();
    }
    cat.hide();
    await stage.waitForNextFrame();
    while (saucoupe.x > 0 || saucoupe.y > 0) {
      if (saucoupe.x > 0) {
        saucoupe.setXYTo(saucoupe.x - 8, saucoupe.y);
      }
      if (saucoupe.y > 0) {
        saucoupe.setXYTo(saucoupe.x, saucoupe.y - 8);
      }
      await stage.waitForNextFrame();
    }
    console.log(saucoupe.size, 30);
    saucoupe.setSizeToPercent(25);
    while (saucoupe.size > 5) {
      saucoupe.changeSizeBy(-1);
      await stage.waitForNextFrame();
    }
    saucoupe.hide();
    await stage.waitForNextFrame();
  };

  // on lance tout !

  await bonjourScript();

  await introScript();

  await stage.addBackdrop({
    backdropSrc: "desert.png"
  });

  await Promise.all([
    catScript(),
    appleScript(),
    dromaScript(),
    dromaScript2(),
    saucoupeScript(),
    planteScript(),
    planteScript2(),
    planteScript3()
  ]);

  for (
    let compteur = 1;
    compteur <= stage.width + 100;
    compteur += stage.width / 100
  ) {
    const texte7 = stage.addText({
      color: "black",
      fontFamily: "Marker",
      fontSize: ((stage.maxX - compteur / 2) / stage.maxX) * 400,
      shadowColor: "white",
      text: "The end!",
      x: stage.maxX - compteur,
      y: 0
    });

    await stage.waitForNextFrame();
    stage.removeSpriteOrText(texte7);
  }

  stage.removeBackdrop();
  await stage.waitForNextFrame();
};
