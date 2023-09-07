export class Canvas {
    can_draw = false;
    drawing_touch = false; // Variável para identificar se o desenho está sendo feito com toque
    last_touch = { x: 0, y: 0 };

    constructor(canvas, context, color) {
        this.cnv = canvas;
        this.ctx = context;
        this.color = color;

        this.cnv.addEventListener('mousedown', this.mouseDown.bind(this));
        this.cnv.addEventListener('mousemove', this.mouseMove.bind(this));
        this.cnv.addEventListener('mouseup', this.mouseUp.bind(this));

        this.cnv.addEventListener('touchstart', this.touchStart.bind(this));
        this.cnv.addEventListener('touchmove', this.touchMove.bind(this));
        this.cnv.addEventListener('touchend', this.touchEnd.bind(this));
    }

    setColor(color_code) {
        this.color = color_code;
    }

    mouseDown(ev) {
        this.can_draw = true;
        const rect = this.cnv.getBoundingClientRect();

        this.mouse_x = ev.clientX - rect.left;
        this.mouse_y = ev.clientY - rect.top;
    }

    mouseMove(ev) {
        if (this.can_draw) {
            this.draw(ev.clientX, ev.clientY);
        }
    }

    mouseUp(ev) {
        this.can_draw = false;
    }

    touchStart(ev) {
        ev.preventDefault();
        this.drawing_touch = true;
        const touch = ev.touches[0];
        const rect = this.cnv.getBoundingClientRect();

        this.last_touch.x = touch.clientX - rect.left;
        this.last_touch.y = touch.clientY - rect.top;
    }

    touchMove(ev) {
        ev.preventDefault();
        if (this.drawing_touch) {
            const touch = ev.touches[0];
            const rect = this.cnv.getBoundingClientRect();

            this.draw(touch.clientX, touch.clientY);
            this.last_touch.x = touch.clientX - rect.left;
            this.last_touch.y = touch.clientY - rect.top;
        }
    }

    touchEnd(ev) {
        ev.preventDefault();
        this.drawing_touch = false;
    }

    draw(x, y) {
        const rect = this.cnv.getBoundingClientRect();
        const ponto_x = x - rect.left;
        const ponto_y = y - rect.top;

        if (this.can_draw || this.drawing_touch) {
            this.ctx.lineWidth = 5;
            this.ctx.lineJoin = 'round';
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = this.color;

            this.ctx.beginPath();

            if (this.drawing_touch) {
                this.ctx.moveTo(this.last_touch.x, this.last_touch.y);
            } else {
                this.ctx.moveTo(this.mouse_x, this.mouse_y);
            }

            this.ctx.lineTo(ponto_x, ponto_y);
            this.ctx.stroke();
            this.ctx.closePath();
        }

        this.last_touch.x = ponto_x;
        this.last_touch.y = ponto_y;

        if (!this.drawing_touch) {
            this.mouse_x = ponto_x;
            this.mouse_y = ponto_y;
        }
    }

    clearBoard() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    }
}
