import { Costume } from "./Costume";
import { Stage } from "./Stage";

export enum DragMode {
  DRAGGABLE,
  NOT_DRAGGABLE
}

export enum RotationStyle {
  ALL_AROUND,
  DONT_ROTATE,
  LEFT_RIGHT
}

export interface NewSpriteValues {
  costume?: string | Costume;
  direction?: number;
  dragMode?: DragMode;
  layer?: number;
  rotationStyle?: RotationStyle;
  size?: number;
  visible?: boolean;
  x?: number;
  y?: number;
}

const defaultValues = {
  costume: new Costume(),
  direction: 90,
  dragMode: DragMode.DRAGGABLE,
  layer: 0,
  rotationStyle: RotationStyle.ALL_AROUND,
  size: 100,
  visible: true,
  x: 0,
  y: 0
};

export class Sprite {
  public static readonly MIN_SIZE = 5;
  public static readonly MAX_SIZE = 535;
  private readonly _costume: Costume;
  private _direction = defaultValues.direction;
  private _dragMode = defaultValues.dragMode;
  private _height = 0;
  private readonly _layer = defaultValues.layer;
  private _maxX: number;
  private _maxY: number;
  private _minX: number;
  private _minY: number;
  private _rotationStyle = defaultValues.rotationStyle;
  private _size = defaultValues.size;
  private readonly _stage: Stage;
  private _visible = defaultValues.visible;
  private _width = 0;
  private _x = defaultValues.x;
  private _y = defaultValues.y;

  public constructor({
    costume = defaultValues.costume,
    direction = defaultValues.direction,
    dragMode = defaultValues.dragMode,
    layer = defaultValues.layer,
    rotationStyle = defaultValues.rotationStyle,
    size = defaultValues.size,
    stage,
    visible = defaultValues.visible,
    x = defaultValues.x,
    y = defaultValues.y
  }: NewSpriteValues & { stage: Stage }) {
    this._stage = stage;

    this._costume =
      costume instanceof Costume ? costume : new Costume({ src: costume });
    this._layer = layer;
    this._maxX = stage.maxX;
    this._maxY = stage.maxY;
    this._minX = stage.minX;
    this._minY = stage.minY;
    this._visible = visible;

    this.pointInDirection(direction);
    this.setDragmode(dragMode);
    this.setRotationStyle(rotationStyle);
    this.setSizeToPercent(size);
    this.setXTo(x);
    this.setYTo(y);
  }

  public get costume() {
    return this._costume;
  }

  public get direction(): number {
    return this._direction;
  }

  public get directionInRadians(): number {
    let direction = this._direction - 90;

    if (direction < 0) {
      direction = direction + 360;
    } else if (direction > 359) {
      direction = direction - 360;
    }

    return (direction / 360) * Math.PI * 2;
  }

  public get dragMode(): DragMode {
    return this._dragMode;
  }

  public get height() {
    return this._height;
  }

  public get layer(): number {
    return this._layer;
  }

  public async load() {
    await this.costume.load();

    this._height = this.costume.height;
    this._width = this.costume.width;
    this._maxX = this._stage.maxX + (this._width / 2 + 1);
    this._maxY = this._stage.maxY + (this._height / 2 + 1);
    this._minX = this._stage.minX - (this._width / 2 + 1);
    this._minY = this._stage.minY - (this._height / 2 + 1);
  }

  public get maxX() {
    return this._maxX;
  }

  public get maxY() {
    return this._maxY;
  }

  public get minX() {
    return this._minX;
  }

  public get minY() {
    return this._minY;
  }

  public get rotationStyle(): RotationStyle {
    return this._rotationStyle;
  }

  public get size(): number {
    return this._size;
  }

  public get visible(): boolean {
    return this._visible;
  }

  public get width() {
    return this._width;
  }
  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public changeXBy(step: number) {
    this.setXTo(this._x + step);
  }

  public changeSizeBy(step: number) {
    const newSize = this._size + step;

    if (newSize >= Sprite.MIN_SIZE && newSize <= Sprite.MAX_SIZE) {
      this._size = newSize;
    }
  }

  public changeYBy(step: number) {
    this.setYTo(this._y + step);
  }

  public hide() {
    this._visible = false;
  }

  public moveSteps(steps: number) {
    // 0 degrees is upwards in Scratch, left is -90, down is 180
    this.setXYTo(
      this._x + steps * Math.cos(this.directionInRadians),
      this._y - steps * Math.sin(this.directionInRadians)
    );
  }

  public pointInDirection(degrees: number) {
    this._direction = degrees;
    this._bindDirection();
  }

  public setDragmode(dragMode: DragMode) {
    this._dragMode = dragMode;
  }

  public setRotationStyle(rotationStyle: RotationStyle) {
    this._rotationStyle = rotationStyle;
  }

  public setSizeToPercent(newSize: number) {
    if (newSize >= Sprite.MIN_SIZE && newSize <= Sprite.MAX_SIZE) {
      this._size = newSize;
    }
  }

  public setXTo(x: number) {
    this._x = x;
    this._bindX();
  }

  public setXYTo(x: number, y: number) {
    this.setXTo(x);
    this.setYTo(y);
  }

  public setYTo(y: number) {
    this._y = y;
    this._bindY();
  }

  public show() {
    this._visible = true;
  }

  public turnLeftDegrees(degrees: number) {
    this.pointInDirection(this._direction - degrees);
  }

  public turnRightDegrees(degrees: number) {
    this.pointInDirection(this._direction + degrees);
  }

  private _bindDirection() {
    this._direction = this._direction % 360;

    if (this._direction <= -180) {
      this._direction += 360;
    } else if (this._direction > 180) {
      this._direction -= 360;
    }
  }

  private _bindX() {
    if (this._x < this._minX) {
      this._x = this._minX;
    } else if (this._x > this._maxX) {
      this._x = this._maxX;
    }
  }

  private _bindY() {
    if (this._y < this._minY) {
      this._y = this._minY;
    } else if (this._y > this._maxY) {
      this._y = this._maxY;
    }
  }
}
