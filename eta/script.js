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
        width: window.innerWidth,
        height: 500,
        wireframes: false
    }
});

// Create walls and floor
var floor = Bodies.rectangle(window.innerWidth / 2, 500, window.innerWidth, 20, { isStatic: true, render: { fillStyle: 'black' } });
var leftWall = Bodies.rectangle(10, 250, 20, 500, { isStatic: true, render: { fillStyle: 'black' } });
var rightWall = Bodies.rectangle(window.innerWidth - 10, 250, 20, 500, { isStatic: true, render: { fillStyle: 'black' } });

// Add the walls and floor to the world
World.add(engine.world, [floor, leftWall, rightWall]);

// Add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(engine.world, mouseConstraint);

// Keep the mouse in sync with rendering
render.mouse = mouse;

// Function to create a new shape
function createShape(shapeType) {
    var x = Math.random() * (window.innerWidth - 60) + 30;
    var y = -30;
    var shape;

    if (shapeType === 'circle') {
        shape = Bodies.circle(x, y, 25, { restitution: 0.6, render: { fillStyle: 'red' } });
    } else if (shapeType === 'square') {
        shape = Bodies.rectangle(x, y, 50, 50, { restitution: 0.6, render: { fillStyle: 'green' } });
    } else if (shapeType === 'triangle') {
        shape = Bodies.polygon(x, y, 3, 30, { restitution: 0.6, render: { fillStyle: 'blue' } });
    }

    World.add(engine.world, shape);
}

// Event listeners for buttons
document.getElementById('circleBtn').addEventListener('click', function() {
    createShape('circle');
});

document.getElementById('squareBtn').addEventListener('click', function() {
    createShape('square');
});

document.getElementById('triangleBtn').addEventListener('click', function() {
    createShape('triangle');
});

// Run the engine
Engine.run(engine);

// Run the renderer
Render.run(render);
