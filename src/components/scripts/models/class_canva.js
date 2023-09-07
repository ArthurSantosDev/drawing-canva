/** 
 * Classe que representa o quadro canvas da página
*/
export class Canvas {
    can_draw = false;
    drawing_touch = false; // Variável para identificar se o desenho está sendo feito com toque
    last_touch = { x: 0, y: 0 };

    /** Construtor da Classe 
     * @param { HTMLCanvasElement } canvas Elemento HTML Canvas
     * @param { number } color Código Hexadecimal da cor da caneta
     * @param { CanvasRenderingContext2D } context Contexto de Renderização do Canvas (2d)
    */
    constructor(canvas, context, color) {
        this.cnv = canvas;
        this.ctx = context;
        this.color = color;

        // Adicionando listeners para eventos de toque e de mouse
        
        this.cnv.addEventListener('mousedown', this.mouseDown.bind(this));
        this.cnv.addEventListener('mousemove', this.mouseMove.bind(this));
        this.cnv.addEventListener('mouseup', this.mouseUp.bind(this));

        this.cnv.addEventListener('touchstart', this.touchStart.bind(this));
        this.cnv.addEventListener('touchmove', this.touchMove.bind(this));
        this.cnv.addEventListener('touchend', this.touchEnd.bind(this));
    }

    /** Modifica a cor da caneta */
    setColor(color_code) {
        this.color = color_code;
    }
    
    mouseDown(ev) {
        this.can_draw = true;
        const rect = this.cnv.getBoundingClientRect(); // Obtenha o retângulo do canvas
    
        this.mouse_x = ev.clientX - rect.left; // Use clientX e clientY para obter as coordenadas do evento em relação ao canvas
        this.mouse_y = ev.clientY - rect.top;
    }
    
    mouseMove(ev) {
        if (this.can_draw) {
            const rect = this.cnv.getBoundingClientRect();
            this.draw(ev.clientX - rect.left, ev.clientY - rect.top);
        }
    }
    // ...
    
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
    
            this.draw(touch.clientX - rect.left, touch.clientY - rect.top);
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
        let ponto_x = x - rect.left;
        let ponto_y = y - rect.top;
    
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.lineJoin = 'round';
    
        if (this.drawing_touch) {
            this.ctx.moveTo(this.last_touch.x, this.last_touch.y);
        } else {
            this.ctx.moveTo(this.mouse_x, this.mouse_y);
        }
    
        this.ctx.lineTo(ponto_x, ponto_y);
        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    
        if (this.drawing_touch) {
            this.last_touch.x = ponto_x;
            this.last_touch.y = ponto_y;
        } else {
            this.mouse_x = ponto_x;
            this.mouse_y = ponto_y;
        }
    }

    /** Função que limpa o quadro canvas */
    clearBoard () {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
