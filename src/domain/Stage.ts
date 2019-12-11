import { Costume } from "./Costume";
import { NewSpriteValues, Sprite } from "./Sprite";
import { NewTextValues, Text } from "./Text";

export const defaultValues = {
  canvasId: "stage",
  height: 360,
  nbFramesPerSecond: 25,
  width: 480
};

export class Stage {
  public readonly ctx: CanvasRenderingContext2D;
  public readonly height: number = defaultValues.height;
  public readonly maxX: number = 0;
  public readonly maxY: number = 0;
  public readonly minX: number = 0;
  public readonly minY: number = 0;
  public readonly nbFramesPerSecond: number = defaultValues.nbFramesPerSecond;
  public readonly width: number = defaultValues.width;
  private readonly _awaiters: ((value?: unknown) => void)[] = [];
  private _backdrop: Costume | undefined;
  private readonly _interval: number;
  private readonly _delayBetweenFramesMs: number = 0;
  private readonly _spritesByLayer: (Sprite | Text)[] = [];

  public constructor({
    canvasId = defaultValues.canvasId,
    height = defaultValues.height,
    nbFramesPerSecond = defaultValues.nbFramesPerSecond,
    width = defaultValues.width
  }: {
    canvasId?: string;
    height?: number;
    nbFramesPerSecond?: number;
    width?: number;
  } = defaultValues) {
    const canvasElement = document.getElementById(canvasId);

    if (!canvasElement || !(canvasElement instanceof HTMLCanvasElement)) {
      throw new Error("Could not get canvas element");
    }

    const ctx = canvasElement.getContext("2d");

    if (!ctx) {
      throw new Error("Could not get 2d context for canvas");
    }

    this.ctx = ctx;
    this._delayBetweenFramesMs = 1000 / nbFramesPerSecond;
    this.height = height;
    this.maxX = width / 2;
    this.maxY = height / 2;
    this.minX = 0 - width / 2;
    this.minY = 0 - height / 2;
    this.nbFramesPerSecond = nbFramesPerSecond;
    this._spritesByLayer = [];
    this.width = width;

    ctx.translate(width / 2, height / 2);

    this._interval = window.setInterval(() => {
      this._doFrame();
    }, this._delayBetweenFramesMs);
  }

  public async addBackdrop({ backdropSrc }: { backdropSrc: string }) {
    this._backdrop = new Costume({ src: backdropSrc });

    return this._backdrop.load();
  }

  public async addSprite(attributes: NewSpriteValues = {}): Promise<Sprite> {
    const sprite = new Sprite({
      ...attributes,
      layer: this._spritesByLayer.length,
      stage: this
    });

    this._spritesByLayer.push(sprite);

    await sprite.load();

    return sprite;
  }

  public addText(attributes: NewTextValues) {
    const text = new Text({
      ...attributes,
      stage: this
    });

    this._spritesByLayer.push(text);

    return text;
  }

  public drawBackdrop() {
    if (this._backdrop) {
      this.ctx.drawImage(
        this._backdrop.img,
        this.minX,
        this.minY,
        this.width,
        this.height
      );
    } else {
      this.ctx.clearRect(this.minX, this.minY, this.width, this.height);
    }
  }

  public drawFrame() {
    this.drawBackdrop();
    this.drawSprites();
  }

  public drawSprites() {
    this._spritesByLayer.forEach(sprite => {
      if (sprite instanceof Text) {
        const text =
          typeof sprite.text === "string" ? sprite.text : sprite.text();
        this.ctx.font = `${sprite.fontSize}px ${sprite.fontFamily}`;
        if (sprite.shadowColor && sprite.shadowColor !== "transparent") {
          this.ctx.fillStyle = sprite.shadowColor;
          this.ctx.fillText(text, sprite.x - 1, -sprite.y - 1);
          this.ctx.fillText(text, sprite.x + 0, -sprite.y - 1);
          this.ctx.fillText(text, sprite.x + 1, -sprite.y - 1);
          this.ctx.fillText(text, sprite.x - 1, -sprite.y + 0);
          this.ctx.fillText(text, sprite.x + 0, -sprite.y + 0);
          this.ctx.fillText(text, sprite.x + 1, -sprite.y + 0);
          this.ctx.fillText(text, sprite.x - 1, -sprite.y + 1);
          this.ctx.fillText(text, sprite.x + 0, -sprite.y + 1);
          this.ctx.fillText(text, sprite.x + 1, -sprite.y + 1);
          this.ctx.fillText(text, sprite.x, -sprite.y);
        }
        this.ctx.fillStyle = sprite.color;
        this.ctx.fillText(text, sprite.x, -sprite.y);

        return;
      }

      if (sprite.visible) {
        const costume = sprite.costume;
        const height = costume.height * (sprite.size / 100);
        const width = costume.width * (sprite.size / 100);
        this.ctx.save();
        this.ctx.translate(sprite.x, -sprite.y);
        const rotation = sprite.directionInRadians;
        this.ctx.rotate(rotation);
        this.ctx.drawImage(
          costume.img,
          0 - width / 2,
          0 - height / 2,
          width,
          height
        );
        this.ctx.rotate(-rotation);
        this.ctx.restore();
      }
    });
  }

  public get interval() {
    return this._interval;
  }

  public removeBackdrop() {
    this._backdrop = undefined;
  }

  public removeSpriteOrText(spriteOrText: Sprite | Text) {
    const spriteOrTextIndex = this._spritesByLayer.indexOf(spriteOrText);

    if (spriteOrTextIndex !== -1) {
      this._spritesByLayer.splice(spriteOrTextIndex, 1);
    }
  }

  public async waitForNextFrame() {
    return new Promise(resolve => {
      this._awaiters.push(resolve);
    });
  }

  private _doFrame() {
    this.drawFrame();

    let awaiter = this._awaiters.shift();

    while (awaiter) {
      awaiter();
      awaiter = this._awaiters.shift();
    }
  }
}
