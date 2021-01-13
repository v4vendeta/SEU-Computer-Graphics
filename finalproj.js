"use strict";
// camera
var cam, eye = vec3(0, 2, 5), at = vec3(0, 2, 0);

var main_context = [];

//
var canvas, gl, program, skyboxprogram;
var modelmatrix, viewmatrix, projectionmatrix;
var vPosition, vNormal, vTexCoord;
var sky_context;
var texture;

var light_pos = vec4(2.0, 5.0, 5.0, 1.0);
var light_a = vec4(0.2, 0.2, 0.2);
var light_d = vec4(0.5, 0.5, 0.5);
var light_s = vec4(1.0, 1.0, 1.0, 1.0);
var light_trans_mat = translate(0, 0, 0);
window.onload = function init() {
  //basic settings
  canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }
  canvas.height = 720;
  canvas.width = 1280;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // init skybox
  skyboxprogram = initShaders(gl, "skybox-vert", "skybox-frag");
  gl.useProgram(skyboxprogram);
  sky_context = new RenderContext("front");
  var imgarr = [document.getElementById("right"), document.getElementById("left"), document.getElementById("top"), document.getElementById("bottom"), document.getElementById("back"), document.getElementById("front")];
  //var imgarr = [document.getElementById("foot_right"), document.getElementById("foot_left"), document.getElementById("foot_top"), document.getElementById("foot_bottom"), document.getElementById("foot_back"), document.getElementById("foot_front")];
  [sky_context.vertex_buffer, sky_context.index_buffer, sky_context.texture] = LoadCubeMap(skyboxprogram, imgarr);


  //ground
  var plane_context = new RenderContext("cube1");
  [plane_context.vertex_arr, plane_context.normal_arr, plane_context.index_arr, plane_context.texcoord_arr] = ParseObj(simplecube);
  plane_context.texcoord_arr = flatten(plane_context.texcoord_arr);
  for (var index = 0; index < plane_context.texcoord_arr.length; index++) {
    plane_context.texcoord_arr[index] = plane_context.texcoord_arr[index] * 200.0;
  }
  [plane_context.ka, plane_context.kd, plane_context.ks, plane_context.shininess] = [vec4(0.7, 0.7, 0.7), vec4(1.0, 1.0, 0.8), vec4(1.0, 1.0, 1.0), 1];


  // cyborg
  var cyborg_context = new RenderContext("cyborg_base");
  [cyborg_context.vertex_arr, cyborg_context.normal_arr, cyborg_context.index_arr, cyborg_context.texcoord_arr] = ParseObj(cyborg);
  [cyborg_context.ka, cyborg_context.kd, cyborg_context.ks, cyborg_context.shininess] = [vec4(0.2, 0.2, 0.2), vec4(0.5, 0.5, 0.5), vec4(1.0, 1.0, 1.0), 32];
  //rock
  var rock_context = new RenderContext("rock");
  [rock_context.vertex_arr, rock_context.normal_arr, rock_context.index_arr, rock_context.texcoord_arr] = ParseObj(rock);
  [rock_context.ka, rock_context.kd, rock_context.ks, rock_context.shininess] = [vec4(0., 0., 0., 1.0), vec4(0.64, 0.64, 0.64, 1.0), vec4(0.007937, 0.007937, 0.007937, 1.0), 1];

  //shotgun
  var gun_context = new RenderContext("shotgun");
  [gun_context.vertex_arr, gun_context.normal_arr, gun_context.index_arr, gun_context.texcoord_arr] = ParseObj(shotgun);
  [gun_context.ka, gun_context.kd, gun_context.ks, gun_context.shininess] = [vec4(0., 0., 0., 1.0), vec4(0.64, 0.64, 0.64, 1.0), vec4(0.8, 0.8, 0.8, 1.0), 100];

  // cerberusffvii_gun_model_by_andrew_maximov
  var gun2_context = new RenderContext("gun2");
  [gun2_context.vertex_arr, gun2_context.normal_arr, gun2_context.index_arr, gun2_context.texcoord_arr] = ParseObj(gun2);
  [gun2_context.ka, gun2_context.kd, gun2_context.ks, gun2_context.shininess] = [vec4(1.0, 1.0, 1.0, 1.0), vec4(0.8, 0.8, 0.8, 1.0), vec4(0.5, 0.5, 0.5, 1.0), 32];

  //damaged helmet 
  var helmet_context = new RenderContext("helmet");
  [helmet_context.vertex_arr, helmet_context.normal_arr, helmet_context.index_arr, helmet_context.texcoord_arr] = ParseObj(helmet);
  [helmet_context.ka, helmet_context.kd, helmet_context.ks, helmet_context.shininess] = [vec4(1.0, 1.0, 1.0, 1.0), vec4(0.8, 0.8, 0.8, 1.0), vec4(0.5, 0.5, 0.5, 1.0), 32];



  // a windmill 
  init_cube();
  init_ball();
  var windmill = translate(0, 2, -5);
  var cube1_context = new RenderContext("texImage3");
  [cube1_context.vertex_arr, cube1_context.normal_arr, cube1_context.index_arr, cube1_context.texcoord_arr] = [cube_vertices, cube_normals, cube_index, texCoordsArray];
  cube1_context.modelmat = mult(windmill, scalem(1.6, 8, 1.6));
  var cube2_context = new RenderContext("texImage3");
  [cube2_context.vertex_arr, cube2_context.normal_arr, cube2_context.index_arr, cube2_context.texcoord_arr] = [cube_vertices, cube_normals, cube_index, texCoordsArray];
  windmill = mult(windmill, translate(0.0, 4.4, 1));
  windmill = mult(windmill, rotate(0, 0, 0, 1));
  cube2_context.modelmat = mult(windmill, scalem(0.8, 0.8, 4));
  var ball_context = new RenderContext("texImage3");
  [ball_context.vertex_arr, ball_context.normal_arr, ball_context.index_arr, ball_context.texcoord_arr] = [ball_points, ball_normals, ball_index, ball_texture];
  windmill = mult(windmill, rotate(t, 0, 0, 1));
  windmill = mult(windmill, translate(0.0, 0, 2));
  windmill = mult(windmill, rotate(0, 90, 0, 1));
  ball_context.modelmat = mult(windmill, scalem(0.6, 0.6, 0.6));
  var cube3_context = new RenderContext("texImage3");
  [cube3_context.vertex_arr, cube3_context.normal_arr, cube3_context.index_arr, cube3_context.texcoord_arr] = [cube_vertices, cube_normals, cube_index, texCoordsArray];
  windmill = mult(windmill, rotate(0, 0, 0, 1));
  cube3_context.modelmat = mult(windmill, scalem(10, 0.6, 0.2));
  var cube4_context = new RenderContext("texImage3");
  [cube4_context.vertex_arr, cube4_context.normal_arr, cube4_context.index_arr, cube4_context.texcoord_arr] = [cube_vertices, cube_normals, cube_index, texCoordsArray];
  //windmill = mult(windmill, translate(0.0, 0, 0.0));
  windmill = mult(windmill, rotate(0, 0, 0, 1));
  cube4_context.modelmat = mult(windmill, scalem(0.6, 10, 0.2));


  cyborg_context.modelmat = translate(-2, 0, 0);
  rock_context.modelmat = translate(-5, 0, 0);
  var basetrans = mult(translate(eye[0] + 0.2, eye[1] - 0.5, eye[2] - 0.4), rotateY(90));
  gun_context.modelmat = basetrans;
  plane_context.modelmat = mult(translate(0, -0, 0), scalem(100, 0.001, 100));
  gun2_context.modelmat = mult(translate(2, 1, 3), scalem(0.01, 0.01, 0.01));
  helmet_context.modelmat = mult(translate(-2, 3.5, 0), scalem(0.3, 0.3, 0.3));
  //console.log(rock_context.texcoord_arr)
  main_context.push(cyborg_context, rock_context, gun_context, helmet_context, plane_context, gun2_context, cube1_context,
    cube2_context, ball_context, cube3_context, cube4_context);


  // add 25 cyborg
  for (var row = 0; row < 25; row++) {
    var tempcyborg = { ...cyborg_context };
    tempcyborg.modelmat = mult(translate(-100 + 8 * row, 0, -2), scalem(Math.abs(12.5 - row) / 5.0, Math.abs(12.5 - row) / 5, Math.abs(12.5 - row) / 5));
    main_context.push(tempcyborg);
  }


  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);
  vPosition = gl.getAttribLocation(program, "vPosition");
  vNormal = gl.getAttribLocation(program, "vNormal");
  vTexCoord = gl.getAttribLocation(program, "vTexCoord");

  CreateBuffers(main_context);

  InitMVP();

  render();
};

var t = 0;
let then = 0;
var deltaTime;
const fpsElem = document.querySelector("#fps");

function render() {
  HandleInput();
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  ComputeFPS();
  viewmatrix = cam.LookAt();
  cam.pos
  gl.useProgram(skyboxprogram);
  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.CULL_FACE);
  gl.uniformMatrix4fv(
    gl.getUniformLocation(skyboxprogram, "view"),
    false,
    flatten(viewmatrix));
  DrawSky(sky_context);


  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.useProgram(program);
  gl.uniformMatrix4fv(
    gl.getUniformLocation(program, "view"),
    false,
    flatten(viewmatrix)
  );//update view mat

  main_context[1].modelmat = mult(main_context[1].modelmat, rotateY(5)); //rotate rock

  //rotate windmill
  var windmill = translate(0, 2, -5);
  windmill = mult(windmill, translate(0.0, 4.4, 1));
  windmill = mult(windmill, rotate(t++, 0, 0, 1));
  windmill = mult(windmill, translate(0.0, 0, 2));
  windmill = mult(windmill, rotate(0, 90, 0, 1));
  main_context[8].modelmat = mult(windmill, scalem(0.6, 0.6, 0.6));
  windmill = mult(windmill, rotate(0, 0, 0, 1));
  main_context[9].modelmat = mult(windmill, scalem(10, 0.6, 0.2));
  windmill = mult(windmill, rotate(0, 0, 0, 1));
  main_context[10].modelmat = mult(windmill, scalem(0.6, 10, 0.2));


  //move gun
  main_context[2].modelmat = cam.GetdirMat();
  Draw(main_context);

  requestAnimFrame(render);
}









function CreateBuffers(context) {
  //[vertices, indices, normals,texcoords]
  for (var i = 0; i < context.length; i++) {
    context[i].vertex_buffer = gl.createBuffer();//vertex
    gl.bindBuffer(gl.ARRAY_BUFFER, context[i].vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(context[i].vertex_arr), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    context[i].normal_buffer = gl.createBuffer();//normal
    gl.bindBuffer(gl.ARRAY_BUFFER, context[i].normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(context[i].normal_arr), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);
    context[i].index_buffer = gl.createBuffer();//index
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, context[i].index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(flatten(context[i].index_arr)), gl.STATIC_DRAW);
    context[i].texture_buffer = gl.createBuffer();//texture
    gl.bindBuffer(gl.ARRAY_BUFFER, context[i].texture_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(context[i].texcoord_arr), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);
    context[i].texture = gl.createTexture();//bind texture
    gl.bindTexture(gl.TEXTURE_2D, context[i].texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, document.getElementById(context[i].texname));
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);


  }

}

function InitMVP() {

  cam = new Camera(eye, at);
  viewmatrix = cam.LookAt(eye, at);
  var basemodelmat = translate(0, 0, 0);
  //projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
  projectionmatrix = perspective(90.0, 1.33, 0.01, 1000);

  gl.uniformMatrix4fv(gl.getUniformLocation(program, "model"), false, flatten(basemodelmat));
  gl.uniformMatrix4fv(
    gl.getUniformLocation(program, "view"),
    false,
    flatten(viewmatrix)
  );
  gl.uniformMatrix4fv(
    gl.getUniformLocation(program, "projection"),
    false,
    flatten(projectionmatrix)
  );
}

function Draw(context) {

  //light_pos=vec4mulmat4(rotateY(5),light_pos);
  // update light for all objects
  gl.uniform4fv(gl.getUniformLocation(program, "ka"), flatten(light_a));
  gl.uniform4fv(gl.getUniformLocation(program, "light_diffuse"), flatten(light_d));
  gl.uniform4fv(gl.getUniformLocation(program, "light_specular"), flatten(light_s));
  gl.uniform4fv(gl.getUniformLocation(program, "lightpos"), flatten(light_pos));

  //t += 2;
  var lightmatrix = rotate(t, 0, 1, 0);
  var lightmatrixLoc = gl.getUniformLocation(program, "light");
  gl.uniformMatrix4fv(lightmatrixLoc, false, flatten(lightmatrix));


  for (var i = 0; i < context.length; i++) {
    gl.bindBuffer(gl.ARRAY_BUFFER, context[i].vertex_buffer); // vertex buffer 
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, context[i].normal_buffer); //normal buffer
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, context[i].texture_buffer);//texture
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, context[i].index_buffer); // index buffer
    gl.bindTexture(gl.TEXTURE_2D, context[i].texture);
    // update material parameter
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "model"), false, flatten(context[i].modelmat));
    gl.uniform1f(gl.getUniformLocation(program, "shininess"), context[i].shininess);
    gl.uniform4fv(gl.getUniformLocation(program, "ka"), flatten(context[i].ka));
    gl.uniform4fv(gl.getUniformLocation(program, "kd"), flatten(context[i].kd));
    gl.uniform4fv(gl.getUniformLocation(program, "ks"), flatten(context[i].ks));

    gl.drawElements(gl.TRIANGLES, context[i].index_arr.length, gl.UNSIGNED_SHORT, 0);
  }


}

function ComputeFPS() {
  //theta[0]+=1;
  var now = Date.now();
  now *= 0.001; // convert to seconds
  deltaTime = now - then; // compute time since last frame
  then = now; // remember time for next frame
  const fps = 1 / deltaTime; // compute frames per second
  fpsElem.textContent = fps.toFixed(1); // update fps display
}

