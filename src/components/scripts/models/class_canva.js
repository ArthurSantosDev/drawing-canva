export class Canvas {
    can_draw = false;
    mouse_x = 0;
    mouse_y = 0;

    constructor (canvas, context, color) {
        this.cnv = canvas;
        this.ctx = context;
        this.color = color;
    }

    setColor (color_code) {
        this.color = color_code;
    }


}