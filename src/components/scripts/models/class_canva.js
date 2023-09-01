export class Canvas {
    can_draw = false;
    mouse_x = 0;
    mouse_y = 0;

    constructor(canvas, context, color) {
        this.cnv = canvas;
        this.ctx = context;
        this.color = color;
    }

    setColor(color_code) {
        this.color = color_code;
    }

    mouseDown(ev) {
        this.can_draw = true;
        this.mouse_x = ev.pageX - this.cnv.offsetLeft;
        this.mouse_y = ev.pageY - this.cnv.offsetTop;
    }

    mouseMove(ev) {
        if (this.can_draw) {
            this.draw(ev.pageX, ev.pageY);
        }
    }

    mouseUp(ev) {
        this.can_draw = false;
    }

    draw(x, y) {
        let ponto_x = x - this.cnv.offsetLeft;
        let ponto_y = y - this.cnv.offsetTop;

        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.lineJoin = 'round';
        this.ctx.moveTo(this.mouse_x, this.mouse_y);
        this.ctx.lineTo(ponto_x, ponto_y);
        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();

        this.mouse_x = ponto_x;
        this.mouse_y = ponto_y;
    }

    clearBoard () {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
