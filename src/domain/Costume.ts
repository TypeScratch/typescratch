export const defaultValues = {
  src: "ScratchCat-costume1"
};

export class Costume {
  private _height = 0;
  private readonly _img = new Image();
  private readonly _src = defaultValues.src;
  private _width = 0;

  public constructor({
    src = defaultValues.src
  }: { src: string } = defaultValues) {
    let resolvedSrc = src;

    if (!(resolvedSrc.startsWith("/") || resolvedSrc.startsWith("http"))) {
      resolvedSrc = `/images/${resolvedSrc}`;
    }

    if (!resolvedSrc.match(/\.\w+$/)) {
      resolvedSrc = `${resolvedSrc}.svg`;
    }

    this._src = resolvedSrc;
  }

  public async load() {
    if (this._width) {
      return Promise.resolve();
    }

    await new Promise(resolve => {
      this._img.src = this._src;

      this._img.onload = () => {
        this._width = this._img.width;
        this._height = this._img.height;

        resolve();
      };
    });
  }

  public get height() {
    return this._height;
  }

  public get img(): CanvasImageSource {
    return this._img;
  }

  public get src() {
    return this._src;
  }

  public get width() {
    return this._width;
  }
}
