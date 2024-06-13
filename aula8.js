var utils = new Utils();
var vertices = [];
var colors = [];


var theta = [0, 0, 0];
var transform_x = 0;
var transform_y = 0;
var transform_z = 0;
var speed = 100;


var translateSpeed = 0.1;
var translateDirection = [0, 0, 0];
var translation = [0, 0, 0];

var scaling = false; 
var scaleDirection = 1; 
var scale = 1.0;

var cubeVertices = [
    -0.5, -0.5, 0.5,   
    -0.5, 0.5, 0.5,    
    0.5, 0.5, 0.5,     
    0.5, -0.5, 0.5,    

    -0.5, 0.0, 0.5,   
    -0.5, -0.30, 0.5,  
    0.5, -0.30, 0.5,    
    0.5, 0.0, 0.5    
];


var cubeColors = [
    0.0, 0.5, 0.0,   
    0.0, 0.0, 0.7,    
];

function makeFace(v1, v2, v3, v4, colorIndex) {
    var triangulos = [v1, v2, v3, v1, v3, v4];

    for (var i = 0; i < triangulos.length; i++) {
        var vertexIndex = triangulos[i];
        var vertex = [
            cubeVertices[vertexIndex * 3],     
            cubeVertices[vertexIndex * 3 + 1], 
            cubeVertices[vertexIndex * 3 + 2]  
        ];
        vertices.push(vertex[0], vertex[1], vertex[2]);
        
        colors.push(cubeColors[colorIndex * 3], cubeColors[colorIndex * 3 + 1], cubeColors[colorIndex * 3 + 2]);
    }
}

makeFace(1, 0, 4, 5, 0); 
makeFace(5, 4, 7, 6, 1); 
makeFace(6, 7, 3, 2, 1);
makeFace(2, 3, 0, 1, 0);
makeFace(1, 5, 6, 2, 1);
makeFace(0, 3, 7, 4, 0);


function movecamera() {
    utils.linkUniformVariable({
        shaderName: "scale",
        value: scale,
        kind: "1f",
    });
    
    if (scaling) {
        scale += 0.01 * scaleDirection; 
    }

    utils.drawElements({ method: "TRIANGLES" });

    setTimeout(movecamera, speed);
}

function render(){

    utils.linkUniformVariable({
        shaderName: "theta",
        value: theta,
        kind: "3fv",
    });
    utils.drawElements({ method: "TRIANGLES" });
    
    theta[0] += transform_x;
    theta[1] += transform_y;
    theta[2] += transform_z;
    setTimeout(render, speed);
}


function translade() {

    utils.linkUniformVariable({ shaderName: "translation", value: translation, kind: "3fv", });
    utils.drawElements({ method: "TRIANGLES" });

    translation[0] += translateSpeed * translateDirection[0];
    translation[1] += translateSpeed * translateDirection[1];
    translation[2] += translateSpeed * translateDirection[2];


    setTimeout(translade, speed);
}

document.getElementById("slider").addEventListener("input", function() {
    speed = parseFloat(this.max) - parseFloat(this.value);
});

document.getElementById("RotationX").addEventListener("click", function() {
    transform_x *= -1;
});

document.getElementById("RotationStartX").addEventListener("click", function() {
    transform_x = 1;
});

document.getElementById("RotationStopX").addEventListener("click", function() {
    transform_x = 0;
});

document.getElementById("RotationY").addEventListener("click", function() {
    transform_y *= -1;
});

document.getElementById("RotationStartY").addEventListener("click", function() {
    transform_y = 1;
});

document.getElementById("RotationStopY").addEventListener("click", function() {
    transform_y = 0;
});

document.getElementById("RotationZ").addEventListener("click", function() {
    transform_z *= -1;
});

document.getElementById("RotationStartZ").addEventListener("click", function() {
    transform_z = 1;
});

document.getElementById("RotationStopZ").addEventListener("click", function() {
    transform_z = 0;
});

document.getElementById("ScaleDirection").addEventListener("click", function() {
    scaleDirection *= -1; // Inverte a direção da mudança de escala
});

document.getElementById("ScaleStart").addEventListener("click", function() {
    scaling = true; 
});

document.getElementById("ScaleStop").addEventListener("click", function() {
    scaling = false; 
});

document.getElementById("TranslationX").addEventListener("click", function() {
    translateDirection[0] *= -1; 
});

document.getElementById("TranslationStartX").addEventListener("click", function() {
    translateDirection[0] = 1; 
});

document.getElementById("TranslationStopX").addEventListener("click", function() {
    translateDirection[0] = 0; 
});

document.getElementById("TranslationY").addEventListener("click", function() {
    translateDirection[1] *= -1; 
});

document.getElementById("TranslationStartY").addEventListener("click", function() {
    translateDirection[1] = 1;
});

document.getElementById("TranslationStopY").addEventListener("click", function() {
    translateDirection[1] = 0; 
});

document.getElementById("TranslationStartZ").addEventListener("click", function() {
    translateDirection[2] = 1; 
});

document.getElementById("TranslationStopZ").addEventListener("click", function() {
    translateDirection[2] = 0; 
});

document.getElementById("TranslationZ").addEventListener("click", function() {
    translateDirection[2] *= -1; 
});


utils.initShader({
    vertexShader: `#version 300 es
    precision mediump float;
    
    in vec3 aPosition;
    in vec3 aColor;
    
    out vec4 vColor;
    
    uniform vec3 theta;
    uniform vec3 translation;
    uniform float scale; // Adiciona a variável de escala

    void main() {
        vec3 angles = radians(theta);
        vec3 c = cos(angles);
        vec3 s = sin(angles);
    
        mat4 rx = mat4(1.0, 0.0, 0.0, 0.0,
            0.0, c.x, -s.x, 0.0, // Corrigido: -s.x em vez de s.x
            0.0, s.x, c.x, 0.0,  // Corrigido: s.x em vez de -s.x
            0.0, 0.0, 0.0, 1.0);
      
        mat4 ry = mat4(c.y, 0.0, s.y, 0.0,  // Corrigido: s.y em vez de -s.y
            0.0, 1.0, 0.0, 0.0,
            -s.y, 0.0, c.y, 0.0, // Corrigido: -s.y em vez de s.y
            0.0, 0.0, 0.0, 1.0);
        
        mat4 rz = mat4(c.z, -s.z, 0.0, 0.0,
            s.z, c.z, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0);

        // Aplique a escala
        mat4 scaleMatrix = mat4(scale, 0.0, 0.0, 0.0,
                                0.0, scale, 0.0, 0.0,
                                0.0, 0.0, scale, 0.0,
                                0.0, 0.0, 0.0, 1.0);

        vec4 rotatedPosition = rz * ry * rx * vec4(aPosition, 1.0); // Corrigido: ordem das operações de rotação
        
        rotatedPosition += vec4(translation, 0.0);
        
        // Aplique a escala
        rotatedPosition *= scaleMatrix;
        
        gl_Position = rotatedPosition;
        vColor = vec4(aColor, 1.0);
    }
    `,
    fragmentShader: `#version 300 es
    precision mediump float;
    in vec4 vColor;
    out vec4 fColor;
    void main() {
        fColor = vColor;
    }`
});



utils.initBuffer({ vertices: vertices });
utils.linkBuffer({ reading: 3 });

utils.initBuffer({ vertices: colors });
utils.linkBuffer({ variable: "aColor", reading: 3 });

render();
translade();
movecamera()