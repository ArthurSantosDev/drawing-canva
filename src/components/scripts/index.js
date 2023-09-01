import { Canvas } from "./models/class_canva.js";

(() => {
    const cnv = document.querySelector('canvas#cnv');
    const ctx = cnv.getContext('2d');

    const color = document.querySelector('input[type=color]');

    const quadro = new Canvas(cnv, ctx, color.value);

    color.addEventListener('change', () => quadro.setColor(color.value));

})()