import { Stage } from "./Stage";

export interface NewTextValues {
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  shadowColor?: string;
  text: string | (() => string);
  x?: number;
  y?: number;
}

const defaultValues = {
  color: "black",
  fontFamily: "Arial",
  fontSize: 16
};

export class Text {
  public readonly color = defaultValues.color;
  public readonly fontFamily = defaultValues.fontFamily;
  public readonly fontSize = defaultValues.fontSize;
  public readonly shadowColor?: string;
  public readonly text: string | (() => string);
  public readonly x: number;
  public readonly y: number;
  private readonly _stage: Stage;

  public constructor({
    color = defaultValues.color,
    fontFamily = defaultValues.fontFamily,
    fontSize = defaultValues.fontSize,
    shadowColor,
    stage,
    text,
    x = stage.minX + fontSize,
    y = stage.maxY - fontSize * 2
  }: NewTextValues & { stage: Stage }) {
    this._stage = stage;

    this.color = color;
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.shadowColor = shadowColor;
    this.text = text;
    this.x = x;
    this.y = y;
  }
}
