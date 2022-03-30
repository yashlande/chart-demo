import React, { useEffect } from 'react'
import './CanvasChart.css';

function CanvasChart() {

    useEffect(() => {
        const gauge: any = document.querySelector('#gauge');
        const gb = gauge.getBoundingClientRect();
        const ctx = gauge.getContext("2d");
        const circleX = gb.width / 2;
        const circleY = gb.height / 2;
        const circleR = Math.min(gb.width, gb.height) / 2 - 0.05 * gb.width;
        const barWidth = 1;
        const barSeparatorInterval = 3;
        const bars = 100;

        ctx.lineWidth = 15;

        // Green Arc
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleR, 6 * Math.PI / 8, 10 * Math.PI / 8);
        ctx.stroke();

        // Orange Arc
        ctx.strokeStyle = "orange";
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleR, 10.1 * Math.PI / 8, 14 * Math.PI / 8);
        ctx.stroke();

        // Red Arc
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleR, 14.1 * Math.PI / 8, 18 * Math.PI / 8);
        ctx.stroke();

        // Draw lines
        let count = 0;
        ctx.fillStyle = "gray";
        for (var i = 2 * Math.PI / 8; i < 14 * Math.PI / 8; i += (Math.PI * 2 / bars)) {
            length = (count % barSeparatorInterval === 0) ? 24 : 10;
            draw_rectangle(i, length);
            count++;
        }

        function draw_rectangle(rad: any, barHeight: any) {
            // reset and move to the center of our circle
            ctx.setTransform(1, 0, 0, 1, circleX, circleY);
            // rotate the context so we face the correct angle
            ctx.rotate(rad);
            // move along y axis to reach the inner radius
            ctx.translate(0, circleR - 0.08 * circleX);
            // draw the bar
            ctx.fillRect(
                -barWidth / 2, // centered on x
                0, // from the inner radius
                barWidth,
                -barHeight // until its own height
            );
        }
    })

    return (
        <div>
            <div className="container">
                <canvas id="gauge" width="400" height="400">
                </canvas>
            </div>
        </div>
    )
}

export default CanvasChart