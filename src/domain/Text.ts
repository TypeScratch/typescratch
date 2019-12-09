import { Stage } from "./Stage";

export interface NewTextValues {
  fontFamily?: string;
  fontSize?: number;
  text: string | (() => string);
  x?: number;
  y?: number;
}

const defaultValues = {
  fontFamily: "Arial",
  fontSize: 16
};

export class Text {
  public readonly fontFamily = defaultValues.fontFamily;
  public readonly fontSize = defaultValues.fontSize;
  public readonly text: string | (() => string);
  public readonly x: number;
  public readonly y: number;
  private readonly _stage: Stage;

  public constructor({
    fontFamily = defaultValues.fontFamily,
    fontSize = defaultValues.fontSize,
    stage,
    text,
    x = stage.minX + fontSize,
    y = stage.maxY - fontSize * 2
  }: NewTextValues & { stage: Stage }) {
    this._stage = stage;

    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.text = text;
    this.x = x;
    this.y = y;
  }
}
