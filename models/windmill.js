"use strict";
var canvas, gl, program;
var modelmatrix, projectionMatrix, lightmatrix;
var viewmatrix;
var vColor, vPosition,vNormal;
var modelmatrixLoc, lightmatrixLoc, ambientloc, diffuseloc, specularloc, shininessloc;

var texCoordsArray = [];
var texSize = 64;
var texture;

var texCoord = [
    vec2(0, 0),
    vec2(1, 0),
    vec2(1, 1),
    vec2(0, 1)
];


function scale4(a, b, c) {
  var result = mat4();
  result[0][0] = a;
  result[1][1] = b;
  result[2][2] = c;
  return result;
}

var cube_vbuffer, cube_cbuffer, cube_nbuffer;
var cube_num_vertices = 36;
var cube_points = [];
var cube_colors = [];
var cube_normals = [];

var cube_vertices = [
  vec4(-0.5, -0.5, 0.5, 1.0),
  vec4(-0.5, 0.5, 0.5, 1.0),
  vec4(0.5, 0.5, 0.5, 1.0),
  vec4(0.5, -0.5, 0.5, 1.0),
  vec4(-0.5, -0.5, -0.5, 1.0),
  vec4(-0.5, 0.5, -0.5, 1.0),
  vec4(0.5, 0.5, -0.5, 1.0),
  vec4(0.5, -0.5, -0.5, 1.0),
];

var cube_index = []
function quad(a, b, c, d) {

  var t1 = subtract(cube_vertices[b], cube_vertices[a]);
  var t2 = subtract(cube_vertices[c], cube_vertices[b]);
  var normal = cross(t1, t2);
  var normal = vec3(normal);

  //cube_colors.push(cube_vertex_colors[a]);
  cube_points.push(cube_vertices[a]);
  cube_index.push(a);
  cube_normals.push(normal);
  texCoordsArray.push(texCoord[0]);
  
  //ube_colors.push(cube_vertex_colors[a]);
  cube_points.push(cube_vertices[b]);
  cube_index.push(b);
  cube_normals.push(normal);
  texCoordsArray.push(texCoord[1]);
  
  //cube_colors.push(cube_vertex_colors[a]);
  cube_points.push(cube_vertices[c]);
  cube_index.push(c);
  cube_normals.push(normal);
  texCoordsArray.push(texCoord[2]);
  
  //cube_colors.push(cube_vertex_colors[a]);
  cube_points.push(cube_vertices[a]);
  cube_index.push(a);
  cube_normals.push(normal);
  texCoordsArray.push(texCoord[3]);
  
  //cube_colors.push(cube_vertex_colors[a]);
  cube_points.push(cube_vertices[c]);
  cube_index.push(c);
  cube_normals.push(normal);
  //texCoordsArray.push(texCoord[0]);
  
  //cube_colors.push(cube_vertex_colors[a]);
  cube_points.push(cube_vertices[d]);
  cube_index.push(d);
  cube_normals.push(normal);
  //texCoordsArray.push(texCoord[1]);
   
}
function init_cube() {
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
}

//----------------------------------------------------------------------
//ball
//var ball_cbuffer, ball_index_buffer, ball_vbuffer, ball_nbuffer;
var ball_latitude = 40;
var ball_longitude = 40;
var ball_radius = 1;
var ball_num_index = ball_latitude * ball_longitude * 6;
var ball_points = [];
//var ball_colors = [];
var ball_index = [];
var ball_normals = [];
var ball_texture = []

function init_ball() {
  //var color1 = 0;
  for (var latitude_num = 0; latitude_num <= ball_latitude; latitude_num++) {
    var temp_theta = (latitude_num * Math.PI) / ball_latitude;
    var sin_temp_theta = Math.sin(temp_theta);
    var cos_temp_theta = Math.cos(temp_theta);

    for (
      var longitude_num = 0;
      longitude_num <= ball_longitude;
      longitude_num++
    ) {
      var temp_phi = (longitude_num * 2 * Math.PI) / ball_longitude;
      var sin_temp_phi = Math.sin(temp_phi);
      var cos_temp_phi = Math.cos(temp_phi);

      var x = cos_temp_phi * sin_temp_theta;
      var y = cos_temp_theta;
      var z = sin_temp_phi * sin_temp_theta;
      ball_points.push(vec4(ball_radius * x, ball_radius * y, ball_radius * z, 1));
      ball_normals.push(normalize(vec4((ball_radius * x), (ball_radius * y), (ball_radius * z,0))));
      

      ball_texture.push(vec2(0.5*Math.acos(ball_radius * x)/Math.PI, 
                        0.5*Math.asin(ball_radius * y/Math.sqrt(1.0-ball_radius * x*ball_radius * x))/Math.PI))
      //ball_colors.push(vec4(1, 0.0, 0.0, 1.0));
      
    }
  }
  for (var latitude_num = 0; latitude_num <= ball_latitude; latitude_num++) {
    for (
      var longitude_num = 0;
      longitude_num <= ball_longitude;
      longitude_num++
    ) {
      var first = latitude_num * (ball_longitude + 1) + longitude_num;
      var second = first + ball_longitude + 1;

      ball_index.push(second+1);
      ball_index.push(second );
      ball_index.push(first + 1);
      
      ball_index.push(first);
      ball_index.push(first+1);
      ball_index.push(second);


    }
  }

  console.log(ball_normals);
}