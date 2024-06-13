    /*
    Vamos dividir a nossa área em um seis quadrados de lado
    sceneSize. A dimensão do grid será 2x3, duas linhas
    e três colunas. Nesse caso, devemos especificar
    o tamanho da tela de acordo com isso.
    */
    var sceneSize = 200
    var utils = new Utils();

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


    var vertices = [];
    var colors = [];
var coords = []
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
    [0.5, 0., 1.0],
    [1.0, 1.0, 0.0],
    [1.0, 0.0, 1.0],
    [0.0, 1.0, 0.0],
    [0.2, 0.0, 0.9],
    [1.0, 0.0, 0.0],
    [1.0, 0.0, 0.0],
    [0.0, 0.0, 1.0],
    ];


    var textureCoordinates = [
        // Front face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Back face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Top face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Bottom face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Right face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Left face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    ];
    

        var faceIds = [
            0, 0, 0, 0, // Face frontal
            1, 1, 1, 1, // Face traseira
            2, 2, 2, 2, // Face superior
            3, 3, 3, 3, // Face inferior
            4, 4, 4, 4, // Face direita
            5, 5, 5, 5  // Face esquerda
        ];
        
        const makeFace = (v1, v2, v3, v4, faceId) => {
            var triangles = [v1, v2, v3, v4, v3, v1];
        
            triangles.forEach((triangle) => {
                // Adicione as cores
                cubeColors[faceId].forEach((color) => {
                    colors.push(color);
                });
        
                // Adicione os vértices
                cubeVertices[triangle].forEach((vertice) => {
                    vertices.push(vertice);
                });
        
                // Adicione as coordenadas de textura
                for (var i = 0; i < 2; i++) {
                    coords.push(textureCoordinates[(faceId * 12) + (triangle * 2) + i]);
                }
        
                // Adicione o identificador de face
                faceIds.push(faceId);
            });
        };
        
        
        // Atualize a chamada para incluir o índice da textura em vez da cor
        makeFace(0, 1, 5, 4, 0); // Face 1 com índice de textura 0
        makeFace(1, 0, 3, 2, 1); // Face 2 com índice de textura 1
        makeFace(2, 3, 7, 6, 2); // Face 3 com índice de textura 2
        makeFace(3, 0, 4, 7, 3); // Face 4 com índice de textura 3
        makeFace(4, 5, 6, 7, 4); // Face 5 com índice de textura 4
        makeFace(6, 5, 1, 2, 5); // Face 6 com índice de textura 5
        
        

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
        scaleDirection *= -1; 
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
    in int aFaceID;
    flat out int faceID;


    uniform vec3 theta;
    uniform vec3 translation;
        uniform float scale;

        
    uniform mat4 uViewMatrix; // Matriz da câmera
    uniform mat4 uProjectionMatrix; // Matriz de projeção
    in vec2 textCoords;
    uniform sampler2D uSampler1;
    out vec2 textureCoords;


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

            mat4 scaleMatrix = mat4(scale, 0.0, 0.0, 0.0,
                0.0, scale, 0.0, 0.0,
                0.0, 0.0, scale, 0.0,
                0.0, 0.0, 0.0, 1.0);

                vec4 rotatedPosition = scaleMatrix * uProjectionMatrix * uViewMatrix * rz * ry * rx * vec4(aPosition, 1.0);
                rotatedPosition += vec4(translation, 0.0);

                gl_Position =  rotatedPosition;
                vColor = vec4(aColor, 1.0);
                textureCoords = textCoords;
        }`,
    fragmentShader: `#version 300 es
    precision highp float;
    
    uniform sampler2D uSampler1; 
    uniform sampler2D uSampler2; 
    uniform sampler2D uSampler3; 
    uniform sampler2D uSampler4; 
    uniform sampler2D uSampler5; 
    uniform sampler2D uSampler6; 
    
    in vec2 textureCoords;
    flat in int faceID; // Use 'flat' interpolation
    
    out vec4 fColor;
    
    void main() {
        vec4 color;
    
        // Seleciona a textura com base no identificador de face
        if (faceID == 0) {
            color = texture(uSampler1, textureCoords);
        } else if (faceID == 1) {
            color = texture(uSampler2, textureCoords);
        } else if (faceID == 2) {
            color = texture(uSampler3, textureCoords);
        } else if (faceID == 3) {
            color = texture(uSampler4, textureCoords);
        } else if (faceID == 4) {
            color = texture(uSampler5, textureCoords);
        } else if (faceID == 5) {
            color = texture(uSampler6, textureCoords);
        }
    
        fColor = color;
    }
    `,
    });

utils.initBuffer({ vertices: vertices });
utils.linkBuffer({ variable: "aPosition", reading: 3 });

utils.initBuffer({ vertices: colors });
utils.linkBuffer({ variable: "aColor", reading: 3 });


    var projectionOrthoMatrix = mat4.create();
    var size = 1; // Metade da largura/altura total desejada
    var centerX = 0; // Posição X central da janela de projeção
    var centerY = 0; // Posição Y central da janela de projeção
    mat4.ortho(projectionOrthoMatrix,
    centerX - size, // esquerda
    centerX + size, // direta
    centerY - size, // baixo
    centerY + size, // cima
    0.1, // Quão perto objetos podem estar da câmera
    // antes de serem recortados
    100.0); // Quão longe objetos podem estar da câmera antes
    // de serem recortados

    utils.linkUniformMatrix({
    shaderName: "uProjectionMatrix",
    value: projectionOrthoMatrix,
    kind: "4fv"
    });

    var viewMatrixTop = mat4.create();
    mat4.lookAt(viewMatrixTop,

    [0, 10, 0], 
    [0, 0, 0], 
    [0, 0, -1]); 

    var gl = utils.gl; // Certifique-se de que utils.gl esteja corretamente definido

    var imagePaths = [
        '01_gato_persa.webp',
        'mario - cópia.png',
        '06_praia - cópia.webp.png',
        '05_monte_fuji - cópia.webp.png',
        '03_bolinhas.webp',
        '02_onca_pintada.webp'
    ];
    
    var textureSamplers = [];
    function loadTexture(index) {
        var texture = gl.createTexture();
        var image = new Image();
        image.onload = function() {
            gl.activeTexture(gl.TEXTURE0 + index);
            gl.bindTexture(gl.TEXTURE_2D, texture); 
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    
            textureSamplers[index] = texture;
            console.log("Textura carregada e vinculada com sucesso:", texture);
        };
        image.src = imagePaths[index];
        return texture;
    }
    
    for (var i = 0; i < imagePaths.length; i++) {
        loadTexture(i);
    }
    


    utils.initBuffer({ vertices: textureCoordinates });
    utils.linkBuffer({ reading: 2, variable: "textCoords" });

    function render() {
        utils.linkUniformVariable({ shaderName: "theta", value: theta, kind: "3fv" });
        utils.linkUniformMatrix({ shaderName: "uProjectionMatrix", value: projectionOrthoMatrix, kind: "4fv" });
    
        for (var i = 0; i < 6; i++) {
            gl.activeTexture(gl.TEXTURE0 + i);
            gl.bindTexture(gl.TEXTURE_2D, textureSamplers[i]);
            utils.linkUniformVariable({ shaderName: "uSampler" + (i + 1), value: i, kind: "1i" });
        }
    
        utils.linkUniformMatrix({ shaderName: "uViewMatrix", value: viewMatrixTop, kind: "4fv" });
    
        theta[0] += transform_x;
        theta[1] += transform_y;
        theta[2] += transform_z;
    
        utils.drawElements({ method: "TRIANGLES" });
    
        setTimeout(render, speed);
    }
    
    
    render();
    

    translade();
    movecamera();