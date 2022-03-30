import React, { useEffect } from 'react'
import './CanvasChart.css';

function CanvasChart() {

    var iCurrentSpeed = 20,
        iTargetSpeed = 20,
        bDecrement: any = null,
        job: any = null;

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

        ctx.fillRect(circleX, circleY, 10, 10); // Center squre

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

        function drawSpeedometerPart(options: any, alphaValue: any, strokeStyle: any, startPos: any) {
            /* Draw part of the arc that represents
            * the colour speedometer arc
            */

            options.ctx.beginPath();

            options.ctx.globalAlpha = alphaValue;
            options.ctx.lineWidth = 5;
            options.ctx.strokeStyle = strokeStyle;

            options.ctx.arc(options.center.X,
                options.center.Y,
                options.levelRadius,
                Math.PI + (Math.PI / 360 * startPos),
                0 - (Math.PI / 360 * 10),
                false);

            options.ctx.stroke();
        }

        draw()

        function drawLine(options: any, line: any) {
            // Draw a line using the line object passed in
            options.ctx.beginPath();

            // Set attributes of open
            options.ctx.globalAlpha = line.alpha;
            options.ctx.lineWidth = line.lineWidth;
            options.ctx.fillStyle = line.fillStyle;
            options.ctx.strokeStyle = line.fillStyle;
            options.ctx.moveTo(line.from.X,
                line.from.Y);

            // Plot the line
            options.ctx.lineTo(
                line.to.X,
                line.to.Y
            );

            options.ctx.stroke();
        }

        function convertSpeedToAngle(options: any) {
            /* Helper function to convert a speed to the
            * equivelant angle.
            */
            var iSpeed = (options.speed / 10),
                iSpeedAsAngle = ((iSpeed * 20) + 10) % 180;

            // Ensure the angle is within range
            if (iSpeedAsAngle > 180) {
                iSpeedAsAngle = iSpeedAsAngle - 180;
            } else if (iSpeedAsAngle < 0) {
                iSpeedAsAngle = iSpeedAsAngle + 180;
            }

            return iSpeedAsAngle;
        }

        function degToRad(angle: any) {
            // Degrees to radians
            return ((angle * Math.PI) / 180);
        }

        function drawNeedleDial(options: any, alphaValue: any, strokeStyle: any, fillStyle: any) {
            /* Draws the metallic dial that covers the base of the
            * needle.
            */
            var i = 0;

            options.ctx.globalAlpha = alphaValue;
            options.ctx.lineWidth = 3;
            options.ctx.strokeStyle = strokeStyle;
            options.ctx.fillStyle = fillStyle;

            // Draw several transparent circles with alpha
            for (i = 0; i < 30; i++) {

                options.ctx.beginPath();
                options.ctx.arc(options.center.X,
                    options.center.Y,
                    i,
                    0,
                    Math.PI,
                    true);

                options.ctx.fill();
                options.ctx.stroke();
            }
        }

        function createLine(fromX: any, fromY: any, toX: any, toY: any, fillStyle: any, lineWidth: any, alpha: any) {
            // Create a line object using Javascript object notation
            return {
                from: {
                    X: fromX,
                    Y: fromY
                },
                to: {
                    X: toX,
                    Y: toY
                },
                fillStyle: fillStyle,
                lineWidth: lineWidth,
                alpha: alpha
            };
        }

        function drawNeedle(options: any) {
            /* Draw the needle in a nice read colour at the
            * angle that represents the options.speed value.
            */

            var iSpeedAsAngle = convertSpeedToAngle(options),
                iSpeedAsAngleRad = degToRad(iSpeedAsAngle),
                gaugeOptions = options.gaugeOptions,
                innerTickX = gaugeOptions.radius - (Math.cos(iSpeedAsAngleRad) * 10),
                innerTickY = gaugeOptions.radius - (Math.sin(iSpeedAsAngleRad) * 10),
                fromX = (options.center.X - gaugeOptions.radius) + innerTickX,
                fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY,
                endNeedleX = gaugeOptions.radius - (Math.cos(iSpeedAsAngleRad) * gaugeOptions.radius),
                endNeedleY = gaugeOptions.radius - (Math.sin(iSpeedAsAngleRad) * gaugeOptions.radius),
                toX = (options.center.X - gaugeOptions.radius) + endNeedleX,
                toY = (gaugeOptions.center.Y - gaugeOptions.radius) + endNeedleY,
                line = createLine(fromX, fromY, toX, toY, "rgb(0, 50, 100)", 5, 0.6);
                
                console.log(`From X=${fromX}, From Y=${fromY} To X=${toX} To Y=${toY}`)

            drawLine(options, line);

            // Two circle to draw the dial at the base (give its a nice effect?)
            // drawNeedleDial(options, 0.6, "rgb(0, 50, 100)", "rgb(255,255,255)");
            // drawNeedleDial(options, 0.2, "rgb(0, 50, 100)", "rgb(0, 50, 100)");

        }

        function buildOptionsAsJSON(canvas: any, iSpeed: any) {
            /* Setting for the speedometer
            * Alter these to modify its look and feel
            */

            var centerX = 6,
                centerY = -152,
                radius = 180,
                outerRadius = 400;

            // Create a speedometer object using Javascript object notation
            return {
                ctx: canvas.getContext('2d'),
                speed: iSpeed,
                center: {
                    X: centerX,
                    Y: centerY
                },
                levelRadius: radius - 10,
                gaugeOptions: {
                    center: {
                        X: centerX,
                        Y: centerY
                    },
                    radius: radius
                },
                radius: outerRadius
            };
        }

        function draw() {
            console.log('Target: ' + iTargetSpeed);
            console.log('Current: ' + iCurrentSpeed);

            var canvas = document.getElementById('gauge'),
                options = null;


            if (canvas !== null) {
                options = buildOptionsAsJSON(canvas, iCurrentSpeed);

                // Draw speeometer colour arc
                // drawSpeedometerColourArc(options);

                // Draw the needle and base
                drawNeedle(options);
                console.log("In Draw");
            }

            if (iTargetSpeed == iCurrentSpeed) {
                clearTimeout(job);
                return;
            } else if (iTargetSpeed < iCurrentSpeed) {
                bDecrement = true;
            } else if (iTargetSpeed > iCurrentSpeed) {
                bDecrement = false;
            }

            if (bDecrement) {
                if (iCurrentSpeed - 10 < iTargetSpeed)
                    iCurrentSpeed = iCurrentSpeed - 1;
                else
                    iCurrentSpeed = iCurrentSpeed - 5;
            } else {

                if (iCurrentSpeed + 10 > iTargetSpeed)
                    iCurrentSpeed = iCurrentSpeed + 1;
                else
                    iCurrentSpeed = iCurrentSpeed + 5;
            }

            job = setTimeout("draw()", 5);
        }

        function drawWithInputValue() {

            var txtSpeed = 40;

            if (txtSpeed !== null) {

                iTargetSpeed = txtSpeed;

                // Sanity checks
                if (isNaN(iTargetSpeed)) {
                    iTargetSpeed = 0;
                } else if (iTargetSpeed < 0) {
                    iTargetSpeed = 0;
                } else if (iTargetSpeed > 80) {
                    iTargetSpeed = 80;
                }

                job = setTimeout("draw()", 5);

            }
        }


        function getMousePosition(canvas: any, event: any) {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            console.log("Coordinate x: " + x,
                "Coordinate y: " + y);
        }

        let canvasElem:any = document.querySelector("canvas");

        canvasElem.addEventListener("mousedown", function (e:Event) {
            getMousePosition(canvasElem, e);
        });
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