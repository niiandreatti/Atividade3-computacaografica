var sceneSize = 200
var utils = new Utils({
  width: sceneSize * 3, 
  height: sceneSize * 2, 
});

var vertices = [];
var colors = [];

var cubeVertices = [
  [-0.5, -0.5, 0.5],
  [-0.5, 0.5, 0.5],
  [0.5, 0.5, 0.5],
  [0.5, -0.5, 0.5],
  [-0.5, -0.5, -0.5],
  [-0.5, 0.5, -0.5],
  [0.5, 0.5, -0.5],
  [0.5, -0.5, -0.5],
];
var cubeColors = [
  [0.6, 0.0, 1.0],
  [1.0, 1.0, 0.0],
  [1.0, 0.0, 1.0],
  [0.0, 1.0, 0.0],
  [0.2, 0.0, 0.9],
  [1.0, 0.0, 0.0],
  [1.0, 0.0, 0.0],
  [0.0, 0.0, 1.0],
];


const makeFace = (v1, v2, v3, v4) => {
  var triangles = [v1, v2, v3, v4, v3, v1];

  triangles.forEach((triangle) => {
    cubeColors[v1].forEach((color) => {
      colors.push(color);
    });

    cubeVertices[triangle].forEach((vertice) => {
      vertices.push(vertice);
    });
  });
};

makeFace(0, 1, 5, 4);
makeFace(1, 0, 3, 2);
makeFace(2, 3, 7, 6);
makeFace(3, 0, 4, 7);
makeFace(4, 5, 6, 7);
makeFace(6, 5, 1, 2);

utils.initShader({
  vertexShader: `#version 300 es
  precision mediump float;
  in vec3 aPosition;
  in vec3 aColor;
  out vec4 vColor;
  uniform vec3 theta;
  uniform mat4 uViewMatrix; // Matriz da câmera
  uniform mat4 uProjectionMatrix; // Matriz de projeção

    void main(){
      vec3 angles = radians(theta);
      vec3 c = cos(angles);
      vec3 s = sin(angles);

      mat4 rx = mat4(1.0, 0.0, 0.0, 0.0,
        0.0, c.x, s.x, 0.0,
        0.0, -s.x, c.x, 0.0,
        0.0, 0.0, 0.0, 1.0);
  
      mat4 ry = mat4(c.y, 0.0, -s.y, 0.0,
        0.0, 1.0, 0.0, 0.0,
        s.y, 0.0, c.y, 0.0,
        0.0, 0.0, 0.0, 1.0);
  
      mat4 rz = mat4(c.z, s.z, 0.0, 0.0,
        -s.z, c.z, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0);

      gl_PointSize = 10.0;
      gl_Position = uProjectionMatrix * uViewMatrix * rz * ry * rx * vec4(aPosition, 1.0);
      vColor = vec4(aColor, 1.0);
    }`,
  fragmentShader: `#version 300 es
      precision highp float;
      in vec4 vColor;
      out vec4 fColor;
      void main(){
        fColor = vColor;
      }`,
});

utils.initBuffer({ vertices: vertices });
utils.linkBuffer({ variable: "aPosition", reading: 3 });

utils.initBuffer({ vertices: colors });
utils.linkBuffer({ variable: "aColor", reading: 3 });


var projectionOrthoMatrix = mat4.create();
var size = 1; 
var centerX = 0;
var centerY = 0; 

mat4.ortho(projectionOrthoMatrix,
  centerX - size, // esquerda
  centerX + size, // direta
  centerY - size, // baixo
  centerY + size, // cima
  0.1,
  100.0); 

utils.linkUniformMatrix({
  shaderName: "uProjectionMatrix",
  value: projectionOrthoMatrix,
  kind: "4fv"
});



var viewMatrixFront = mat4.create();
mat4.lookAt(viewMatrixFront,

  [0, 0, 5], 
  [0, 0, 0], 
  [0, 1, 0]);

var viewMatrixTop = mat4.create();
mat4.lookAt(viewMatrixTop,

  [0, 5, 0], /* Posição da câmera, ou seja, onde a câmera
está localizada no espaço 3D. Neste caso, a
câmera está cinco unidades para cima em Y.*/
  [0, 0, 0], // Ponto de referência para onde a câmera está olhando.

  [0, 0, -1]); /*

Vetor Up aponta para trás nesse caso. */

// Visão lateral esquerda de um cubo parado na origem
var viewMatrixSide = mat4.create();
mat4.lookAt(viewMatrixSide,
  [-5, 0, 0], // Posição da câmera está 5 unidades à esquerda em X
  [0, 0, 0],
  [0, 1, 0]
);

// Visão da frente e lateral esquerda de um cubo parado na origem
var viewMatrixFrontSide = mat4.create();
mat4.lookAt(viewMatrixFrontSide,
  [-5, 0, 5], // Posição da câmera está 5 unidades à esquerda em X
  [0, 0, 0],
  [0, 1, 0]
);

// Visão isométrica de um cubo parado na origem
var viewMatrixIsometric = mat4.create();
mat4.lookAt(viewMatrixIsometric,
  [-5, 5, 5], // Posição da câmera para obter uma vista isométrica
  [0, 0, 0],
  [0, 1, 0]
);

var viewMatrixIsometric2 = mat4.create();
mat4.lookAt(viewMatrixIsometric2,
  [5, -5, 5], // Posição da câmera para obter uma vista isométrica
  [0, 0, 0],
  [0, 1, 0]
);


var theta = [0, 0, 0];
var transform_x = 1;
var transform_y = 0;
var transform_z = 0;
var speed = 100;

function render() {
  utils.linkUniformVariable({
    shaderName: "theta",
    value: theta,
    kind: "3fv",
  });

  utils.linkUniformMatrix({
    shaderName: "uProjectionMatrix",
    value: projectionOrthoMatrix,
    kind: "4fv",
  });

  
  // Primeira célula
  utils.linkUniformMatrix({
    shaderName: "uViewMatrix",
    value: viewMatrixFront,
    kind: "4fv"
  });
  utils.drawScene({
    method: "TRIANGLES",
    viewport: {
      x: 0, y: sceneSize,
      width: sceneSize,
      height: sceneSize
    }
  });
  // Segunda célula
  utils.linkUniformMatrix({
    shaderName: "uViewMatrix",
    value: viewMatrixTop,
    kind: "4fv"
  });
  utils.drawScene({
    method: "TRIANGLES",

    viewport: {
      x: sceneSize, y: sceneSize,

      width: sceneSize,
      height: sceneSize
    }
  });
  // Terceira célula
  utils.linkUniformMatrix({
    shaderName: "uViewMatrix",
    value: viewMatrixSide,
    kind: "4fv"
  });
  utils.drawScene({
    method: "TRIANGLES",

    viewport: {
      x: 2 * sceneSize, y: sceneSize,

      width: sceneSize,
      height: sceneSize
    }
  });
  // Quarta Célula
  utils.linkUniformMatrix({
    shaderName: "uViewMatrix",
    value: viewMatrixFrontSide,
    kind: "4fv"
  });
  utils.drawScene({
    method: "TRIANGLES",
    viewport: {
      x: 0, y: 0,
      width: sceneSize,
      height: sceneSize
    }
  });
  // Quinta Célula
  utils.linkUniformMatrix({
    shaderName: "uViewMatrix",
    value: viewMatrixIsometric,
    kind: "4fv"
  });
  utils.drawScene({
    method: "TRIANGLES",
    viewport: {
      x: sceneSize, y: 0,
      width: sceneSize,
      height: sceneSize
    }
  });
  // Sexta célula
  utils.linkUniformMatrix({
    shaderName: "uViewMatrix",
    value: viewMatrixIsometric2,
    kind: "4fv"
  });
  utils.drawScene({
    method: "TRIANGLES",
    viewport: {
      x: 2 * sceneSize, y: 0,
      width: sceneSize,
      height: sceneSize
    }
  });
  theta[0] += transform_x;
  theta[1] += transform_y;
  theta[2] += transform_z;

  setTimeout(
    render, speed
  );
}

render();