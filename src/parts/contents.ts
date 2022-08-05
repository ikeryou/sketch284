import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Item } from "./item";
import { Color } from 'three/src/math/Color';
import { HSL } from "../libs/hsl";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _id:number;
  private _item:Array<Item> = [];
  private _color:Color;

  constructor(opt:any) {
    super(opt)

    this._id = opt.id;

    // ベースカラー
    const hsl = new HSL();
    hsl.h = Util.instance.random(0, 360);
    hsl.s = 1;
    hsl.l = 0.5;
    this._color = new Color();
    this._color.setHSL(hsl.h, hsl.s, hsl.l);

    // const txt = Util.instance.randomArr('ACDEFGHIKLMNOPRSTUVWXYZ0123456789'.split(''));
    let txt = Util.instance.randomArr('!'.split(''));
    // txt = '?'

    const num = Conf.instance.ITEM_NUM;
    for(let i = 0; i < num; i++) {
      const itemEl = document.createElement('span');
      itemEl.classList.add('item');
      this.getEl().append(itemEl);

      const item = new Item({
        id:i,
        el:itemEl,
        txt:txt,
        color:'#FFF',
      });
      this._item.push(item);
    }

    this._resize();
  }


  protected _update(): void {
    super._update();
  }


  protected _resize(): void {
    super._resize();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    const line = Conf.instance.LINE_NUM;

    const ix = this._id % line;
    const iy = ~~(this._id / line);

    const sizeX = (sw / line) * 0.45;
    const sizeY = (sw / line) * 0.45
    Tween.instance.set(this.getEl(), {
      x: ix * sizeX + sw * 0.5 - sizeX * 0.5,
      y: iy * sizeY + (sh * 0.5 - sizeY * 0.5),
    })
  }
}