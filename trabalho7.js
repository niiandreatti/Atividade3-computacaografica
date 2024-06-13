var utils = new Utils();

var slider = document.getElementById("slider");
var cubeSpeed = 25;  

slider.addEventListener("input", function () {
  cubeSpeed = 100 - parseInt(slider.value);
});

var transform_x = 0;
var transform_y = 0;
var transform_z = 0;
var transform_scale = 0;
var transform_translateX = 0;
var transform_translateY = 0;
var transform_translateZ = 0;

var buttonInitX = document.getElementById("RotationStartX");
buttonInitX.onclick = () => {
  transform_x = 2
}

var buttonStopX = document.getElementById("RotationStopX");
buttonStopX.onclick = () => {
  transform_x = 0;
}

var buttonRotationX = document.getElementById("RotationX");
RotationX.onclick = () => {
  transform_x = -transform_x;
}

var buttonInitY = document.getElementById("RotationStartY");
buttonInitY.onclick = () => {
  transform_y = 2
}

var buttonStopY = document.getElementById("RotationStopY");
buttonStopY.onclick = () => {
  transform_y = 0;
}

var buttonRotationY = document.getElementById("RotationY");
RotationY.onclick = () => {
  transform_y = -transform_y;
}

var buttonInitZ = document.getElementById("RotationStartZ");
buttonInitZ.onclick = () => {
  transform_z = 2
}

var buttonStopZ = document.getElementById("RotationStopZ");
buttonStopZ.onclick = () => {
  transform_z = 0;
}

var buttonRotationZ = document.getElementById("RotationZ");
RotationZ.onclick = () => {
  transform_z = -transform_z;
}

var scale = 1.0;
var buttonZoomIn = document.getElementById("ScaleStart");
buttonZoomIn.onclick = () => {
  transform_scale += 0.001; 
};

var buttonZoomStop = document.getElementById("ScaleStop");
buttonZoomStop.onclick = () => {
  transform_scale = 0; 
};

var buttonZoomDirection = document.getElementById("ScaleDirection");
buttonZoomDirection.onclick = () => {
  transform_scale = -transform_scale; 
};

var translateX = 0.0;
var buttonInitTranslateX = document.getElementById("TranslationStartX");
buttonInitTranslateX.onclick = () => {
  transform_translateX += 0.001;
}

var buttonStopTranslateX = document.getElementById("TranslationStopX");
buttonStopTranslateX.onclick = () => {
  transform_translateX = 0;
}

var buttonDirectionTranslateX = document.getElementById("TranslationX");
buttonDirectionTranslateX.onclick = () => {
  transform_translateX = -transform_translateX;
}

var translateY = 0.0;
var buttonInitTranslateY = document.getElementById("TranslationStartY");
buttonInitTranslateY.onclick = () => {
  transform_translateY += 0.001;
}

var buttonStopTranslateY = document.getElementById("TranslationStopY");
buttonStopTranslateY.onclick = () => {
  transform_translateY = 0;
}

var buttonDirectionTranslateY = document.getElementById("TranslationY");
buttonDirectionTranslateY.onclick = () => {
  transform_translateY = -transform_translateY;
}

var translateZ = 0.0;
var buttonInitTranslateZ = document.getElementById("TranslationStartZ");
buttonInitTranslateZ.onclick = () => {
  transform_translateZ += 0.001;
}

var buttonStopTranslateZ = document.getElementById("TranslationStopZ");
buttonStopTranslateZ.onclick = () => {
  transform_translateZ = 0;
}

var buttonDirectionTranslateZ = document.getElementById("TranslationZ");
buttonDirectionTranslateZ.onclick = () => {
  transform_translateZ = -transform_translateZ;
}
var currentKernel = [
    0.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 0.0
];


function updateKernel(newKernel) {
    currentKernel = newKernel;
}

var buttonSuavizacao = document.getElementById("suavização");
buttonSuavizacao.onclick = () => {
    var kernel = [
        1.0/9.0,1.0/9.0 , 1.0/9.0,
        1.0/9.0, 1.0/9.0, 1.0/9.0,
        1.0/9.0, 1.0/9.0, 1.0/9.0
    ];
    updateKernel(kernel);
};

var buttonRealceBorda = document.getElementById("realce-borda");
buttonRealceBorda.onclick = () => {
    var kernelRealceBorda = [
        -1, -1, -1,
        -1,  9, -1,
        -1, -1, -1
    ];
    updateKernel(kernelRealceBorda);
};


var buttonAgucamento = document.getElementById("Aguçamento");
buttonAgucamento.onclick = () => {
    var kernel13 = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ];
    updateKernel(kernel13);
};

var buttonNada = document.getElementById("nada");
buttonNada.onclick = () => {
    var kernel0 = [
        0.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 0.0
    ];
    updateKernel(kernel0);

};

var gl = utils.gl;
var textureAnimals = gl.createTexture();
var textureGato = gl.createTexture();

var textureImage = new Image();
textureImage.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, textureAnimals)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE,);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE,);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
}
textureImage.src = 'texturas/imagens.png';
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, textureAnimals);

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
  [1.0, 0.0, 0.0], //vermelho
  [1.0, 0.79, 0.85], //rosa
  [0.6, 0.2, 0.6], //roxo
  [0.0, 0.0, 1.0], //azul
  [0.25, 0.25, 0.0], //amarelo
  [0.25, 0.16, 0.0], //laranja
];

function makeFace(v1, v2, v3, v4) {
  var triangulos = [v1, v2, v4, v2, v3, v4];

  for (var i = 0; i < triangulos.length; i++) {
    for (var j = 0; j < 3; j++) {
      vertices.push(cubeVertices[triangulos[i]][j]);
      colors.push(cubeColors[v1][j]);
    }
  }
}

makeFace(0, 3, 2, 1); 
makeFace(2, 3, 7, 6); 
makeFace(3, 0, 4, 7); 
makeFace(1, 2, 6, 5); 
makeFace(4, 5, 6, 7); 
makeFace(5, 4, 0, 1); 

utils.initShader({
  vertexShader: `#version 300 es
  in vec2 textCoords;
  out vec2 textureCoords;

  precision mediump float;
  in vec3 aPosition;
  in vec3 aColor;
  out vec4 vColor;
  uniform vec3 theta;
  uniform float scale;
  uniform float translateX;
  uniform float translateY;
  uniform float translateZ;
  void main(){
  
  vec3 angles = radians(theta);
  vec3 c = cos(angles);
  vec3 s = sin(angles);

  mat4 rx = mat4( 1.0, 0.0, 0.0, 0.0,
    0.0, c.x, s.x, 0.0,
    0.0, -s.x, c.x, 0.0,
    0.0, 0.0, 0.0, 1.0);

  mat4 rz = mat4( c.z, s.z, 0.0, 0.0,
    -s.z, c.z, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0);
  
  mat4 ry = mat4( c.y, 0.0, -s.y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    s.y, 0.0, c.y, 0.0,
    0.0, 0.0, 0.0, 1.0);

  mat4 scaleMx = mat4( scale, 0.0, 0.0, 0.0,
    0.0, scale, 0.0, 0.0,
    0.0, 0.0, scale, 0.0,
    0.0, 0.0, 0.0, 1);

  mat4 translateXMx = mat4 ( 1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translateX, 0.0, 0.0, 1.0);
  
    mat4 translateYMx = mat4 ( 1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, translateY, 0.0, 1.0);
  
    mat4 translateZMx = mat4 ( 1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, translateZ, 1.0);
      
      gl_Position = scaleMx * translateZMx * translateYMx * translateXMx * rz * ry * rx * vec4(aPosition, 1.0);
      vColor = vec4(aColor, 1.0);
      textureCoords = textCoords;
      }
  `,

  fragmentShader: `#version 300 es
  precision highp float;
  
  
  in vec2 textureCoords;
  uniform sampler2D uSampler;
  uniform vec2 uTextureSize;
  uniform float uKernel[9];
  
  
  out vec4 fColor;
  
  
  void main(){
      vec2 onePixel = vec2(1.0, 1.0) / uTextureSize;
  
  
        vec4 soma =
          texture(uSampler, textureCoords + onePixel * vec2(-1.0, -1.0)) * uKernel[0] +
          texture(uSampler, textureCoords + onePixel * vec2( 0.0, -1.0)) * uKernel[1] +
          texture(uSampler, textureCoords + onePixel * vec2(+1.0, -1.0)) * uKernel[2] +
          texture(uSampler, textureCoords + onePixel * vec2(-1.0,  0.0)) * uKernel[3] +
          texture(uSampler, textureCoords + onePixel * vec2(0.0,  0.0)) * uKernel[4] +
          texture(uSampler, textureCoords + onePixel * vec2(+1.0,  0.0)) * uKernel[5] +
          texture(uSampler, textureCoords + onePixel * vec2(-1.0,  +1.0)) * uKernel[6] +
          texture(uSampler, textureCoords + onePixel * vec2( 0.0, +1.0)) * uKernel[7] +
          texture(uSampler, textureCoords + onePixel * vec2( +1.0, +1.0)) * uKernel[8];
  
  
      fColor = soma;
  }`,
});

var textureCoordinates = [

  0.0, 0.0, 0.0, 1/3, 1/2, 0.0,
  0.0, 1/3, 1/2, 1/3, 1/2, 0.0,

  0.0, 1/3, 0.0, 2/3, 1/2, 1/3,
  0.0, 2/3, 1/2, 2/3, 1/2, 1/3,

  0.5, 0.0, 0.5, 1/3, 1, 0.0,
  0.5, 1/3, 1, 1/3, 1, 0.0,

  0.5, 1/3, 0.5, 2/3, 1, 1/3,
  0.5, 2/3, 1, 2/3, 1, 1/3,

  0.0, 2/3, 0.0, 3/3, 1/2, 2/3,
  0.0, 3/3, 1/2, 3/3, 1/2, 2/3,

  0.5, 2/3, 0.5, 3/3, 2/2, 2/3,
  0.5, 3/3, 2/2, 3/3, 2/2, 2/3,
];
document.addEventListener('keydown', function(event) {
    var tSpeed = 0.005; 
    var rSpeed = 0.1; 

    switch (event.key) {
        case 'ArrowLeft':
            console.log("Seta para a esquerda pressionada.");
            transform_translateX -= tSpeed;
            break;
        case 'ArrowRight':
            console.log("Seta para a direita pressionada.");
            transform_translateX += tSpeed;
            break;
        case 'ArrowUp':
            console.log("Seta para cima pressionada.");
            transform_translateY += tSpeed;
            break;
        case 'ArrowDown':
            console.log("Seta para baixo pressionada.");
            transform_translateY -= tSpeed;
            break;
        case 'g':
            console.log("Tecla 'g' pressionada.");
            transform_translateZ += tSpeed;
            break;
        case 'h':
            console.log("Tecla 'h' pressionada.");
            transform_translateZ -= tSpeed;
            break;
        case 'b':
            console.log("Tecla 'b' pressionada.");
            transform_x += rSpeed;
            break;
        case 'a':
            console.log("Tecla 'a' pressionada.");
            transform_x -= rSpeed;
            break;
        case 'd':
            console.log("Tecla 'd' pressionada.");
            transform_y += rSpeed;
            break;
        case 'c':
            console.log("Tecla 'c' pressionada.");
            transform_y -= rSpeed;
            break;
        case 'f':
            console.log("Tecla 'f' pressionada.");
            transform_z += rSpeed;
            break;
        case 'e':
            console.log("Tecla 'e' pressionada.");
            transform_z -= rSpeed;
            break;
        case 'i':
            console.log("Tecla 'i' pressionada.");
            transform_scale -= tSpeed;
            break;
        case 'j':
            console.log("Tecla 'j' pressionada.");
            transform_scale += tSpeed;
            break;
            default:
            console.log("Tecla não mapeada pressionada: " + event.key);
            break;
    }
});



utils.initBuffer({ vertices });
utils.linkBuffer({ reading: 3 });
utils.initBuffer({ vertices: textureCoordinates });
utils.linkBuffer({reading : 2, variable : "textCoords"});
utils.drawElements({method: "TRIANGLES"});

var theta = [0, 0, 0];

function render() {
  translateX += transform_translateX;
  translateY += transform_translateY;
  translateZ += transform_translateZ;
  scale += transform_scale;

  theta[0] += transform_x;
  theta[1] += transform_y;
  theta[2] += transform_z;
  utils.linkUniformVariable({
    shaderName: "theta",
    value: theta,
    kind: "3fv",
  });
  utils.linkUniformVariable({
    shaderName: "scale",
    value: scale,
    kind: "1f",
  });
  utils.linkUniformVariable({
    shaderName: "translateX",
    value: translateX,
    kind: "1f",
  });
  utils.linkUniformVariable({
    shaderName: "translateY",
    value: translateY,
    kind: "1f",
  });
  utils.linkUniformVariable({
    shaderName: "translateZ",
    value: translateZ,
    kind: "1f",
  });

  utils.linkUniformVariable({
    shaderName: "uKernel",
    value: currentKernel,
    kind: "1fv",
  });
  
  utils.linkUniformVariable({shaderName:"uSampler", value:0, kind:"1i"});

  utils.drawElements({ method: "TRIANGLES" });
  setTimeout(render, cubeSpeed);
}

render();