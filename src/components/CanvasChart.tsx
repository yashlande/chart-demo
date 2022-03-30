import React, { useEffect, useState } from 'react'
import './CanvasChart.css';

function CanvasChart() {

    // const [reloadCanvas, setReloadCanvas] = useState(0)

    var iCurrentSpeed = 20,
        iTargetSpeed = 20,
        bDecrement: any = null,
        job: any = null,
        options: any = null;
    
    function twoCanvas(){

    }

    function applyDefaultContextSettings(options: any) {
        /* Helper function to revert to gauges
         * default settings
         */

        options.ctx.lineWidth = 2;
        options.ctx.globalAlpha = 0.5;
        options.ctx.strokeStyle = "rgb(255, 255, 255)";
        options.ctx.fillStyle = 'rgb(255,255,255)';
    }


    function clearCanvas(options: any) {
        options.ctx.clearRect(-200, -400, 400, 450);
        // options.ctx.strokeStyle = 'green';
        // options.ctx.strokeRect(-200, -400, 400, 450);
        applyDefaultContextSettings(options);
    }

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

        // console.log(`From X=${fromX}, From Y=${fromY} To X=${toX} To Y=${toY}`)

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

        var canvas = document.getElementById('gauge');


        if (canvas !== null) {
            options = buildOptionsAsJSON(canvas, iCurrentSpeed);
            // Clear canvas
            // clearCanvas(options);

            // Draw speeometer colour arc
            // drawSpeedometerColourArc(options);

            // Draw the needle and base
            drawNeedle(options);
            // console.log("In Draw");            
            // drawSpeedometer();
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

        job = setTimeout(() => draw(), 5);

        console.log("Draw Finished")
    }

    function drawWithInputValue() {
        // console.log("Animation Button Clicked")

        var txtSpeed = 50

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

            job = setTimeout(() => draw(), 5);
            // setReloadCanvas(1);
        }
    }

    function drawSpeedometer() {
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
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "/CanvasStack-2v01.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    useEffect(() => {
        drawSpeedometer();
        draw();
    }, [])


    // useEffect(()=>{
    //     drawSpeedometer();
    // },[reloadCanvas])

    return (
        <div>
            <div className="container">
                <canvas id="gauge" width="400" height="400">
                </canvas>
            </div>
            <button onClick={() => drawWithInputValue()}>Check Animation</button>
        </div>
    )
}

export default CanvasChart