// Module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// Create an engine
var engine = Engine.create();

// Create a renderer
var render = Render.create({
    element: document.getElementById('container'),
    engine: engine,
    options: {
        width: window.innerWidth - 20,
        height: 500, // Fixed height for the visible container
        wireframes: false
    }
});

// Create walls and floor
var floor = Bodies.rectangle(window.innerWidth / 2, 495, window.innerWidth, 10, { isStatic: true, render: { fillStyle: 'black' } });
var leftWall = Bodies.rectangle(0, 250, 20, 500, { isStatic: true, render: { fillStyle: 'black' } });
var rightWall = Bodies.rectangle(window.innerWidth - 20, 250, 20, 500, { isStatic: true, render: { fillStyle: 'black' } });

World.add(engine.world, [floor, leftWall, rightWall]);

// Add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });

World.add(engine.world, mouseConstraint);
render.mouse = mouse;

// Helper function for creating a heart shape
function createHeartVertices(x, y, size) {
    let vertices = [];
    for (let i = 0; i < 360; i++) {
        let angle = i * Math.PI / 180;
        let px = x + 16 * size * Math.pow(Math.sin(angle), 3);
        let py = y - (13 * size * Math.cos(angle) - 5 * size * Math.cos(2 * angle) - 2 * size * Math.cos(3 * angle) - size * Math.cos(4 * angle));
        vertices.push({ x: px, y: py });
    }
    return vertices;
}

// Helper function for creating a star shape
function createStarVertices(x, y, radius1, radius2, numPoints) {
    let vertices = [];
    for (let i = 0; i < 2 * numPoints; i++) {
        const radius = i % 2 === 0 ? radius1 : radius2;
        const angle = Math.PI / numPoints * i;
        vertices.push({ x: x + radius * Math.sin(angle), y: y - radius * Math.cos(angle) });
    }
    return vertices;
}

// Helper function for creating an ellipse shape
function createEllipse(x, y, width, height, sides) {
    let vertices = [];
    for (let i = 0; i < sides; i++) {
        const angle = 2 * Math.PI / sides * i;
        const px = x + width * Math.cos(angle);
        const py = y + height * Math.sin(angle);
        vertices.push({ x: px, y: py });
    }
    return vertices;
}

// Function to create a new shape
function createShape(shapeType) {
    var x = Math.random() * (window.innerWidth - 60) + 30;
    var y = -30;
    var shape;
    switch (shapeType) { // Corrected the switch statement
        case 'circle':
            shape = Bodies.circle(x, y, 30, { restitution: 0.6, render: { fillStyle: 'blue' } });
            break;
        case 'square':
            shape = Bodies.rectangle(x, y, 40, 40, { restitution: 0.6, render: { fillStyle: 'red' } });
            break;
        case 'triangle':
            shape = Bodies.polygon(x, y, 3, 30, { restitution: 0.6, render: { fillStyle: 'green' } });
            break;
        case 'pentagon':
            shape = Bodies.polygon(x, y, 5, 30, { restitution: 0.6, render: { fillStyle: 'yellow' } });
            break;
        case 'hexagon':
            shape = Bodies.polygon(x, y, 6, 30, { restitution: 0.6, render: { fillStyle: 'orange' } });
            break;
        case 'star':
            const starVertices = createStarVertices(x, y, 30, 15, 5);
            shape = Bodies.fromVertices(x, y, starVertices, { restitution: 0.6, render: { fillStyle: 'gold' } });
            break;
        case 'heart':
            const heartVertices = createHeartVertices(x, y, 0.5);
            shape = Bodies.fromVertices(x, y, heartVertices, { restitution: 0.6, render: { fillStyle: 'pink' } });
            break;
        case 'ellipse':
            const ellipseVertices = createEllipse(x, y, 40, 20, 20);
            shape = Bodies.fromVertices(x, y, ellipseVertices, { restitution: 0.6, render: { fillStyle: 'purple' } });
            break;
    }

    World.add(engine.world, shape);
}

// Event listeners for buttons
document.getElementById('circleBtn').addEventListener('click', function() { createShape('circle'); });
document.getElementById('squareBtn').addEventListener('click', function() { createShape('square'); });
document.getElementById('triangleBtn').addEventListener('click', function() { createShape('triangle'); });
document.getElementById('pentagonBtn').addEventListener('click', function() { createShape('pentagon'); });
document.getElementById('hexagonBtn').addEventListener('click', function() { createShape('hexagon'); });
document.getElementById('starBtn').addEventListener('click', function() { createShape('star'); });
document.getElementById('heartBtn').addEventListener('click', function() { createShape('heart'); });
document.getElementById('ellipseBtn').addEventListener('click', function() { createShape('ellipse'); });

// Run the engine and renderer
Engine.run(engine);
Render.run(render);
