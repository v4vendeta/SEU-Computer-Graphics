var a_Position;
var u_SkyTexMap;
function LoadCubeMap(skyboxprogram, imgArray) {
    //if (imgArray.length != 6) return null;

    var a_Position = gl.getAttribLocation(skyboxprogram, "vPosition");
    var u_ViewMatrix = gl.getUniformLocation(skyboxprogram, "view");
    var u_ProjMatrix = gl.getUniformLocation(skyboxprogram, "projection");
    var u_SkyTexMap = gl.getUniformLocation(skyboxprogram, "u_SkyTexMap");
    if (a_Position < 0 || !u_ViewMatrix || !u_ProjMatrix || !u_SkyTexMap) {
        alert("Failed to get store location from progrom");
        return;
    }
    var eye = vec3(0, 2, 5), at = vec3(0, 2, 0);
    var cam = new Camera(eye, at);
    var sky_view = cam.LookAt(eye, at);
    var sky_proj = perspective(90.0, 1.33, 0.01, 1000);

    gl.uniformMatrix4fv(u_ViewMatrix, false, flatten(sky_view));
    gl.uniformMatrix4fv(u_ProjMatrix, false, flatten(sky_proj));

    var vertexSkybox = [
        vec4(100.0, 100.0, 100.0),
        vec4(-100.0, 100.0, 100.0),
        vec4(-100.0, -100.0, 100.0),
        vec4(100.0, -100.0, 100.0),
        vec4(100.0, -100.0, -100.0),
        vec4(100.0, 100.0, -100.0),
        vec4(-100.0, 100.0, -100.0),
        vec4(-100.0, -100.0, -100.0)];
    


    var skyboxIndex = new Uint16Array([
        0, 1, 2, 0, 2, 3,    // front
        0, 3, 4, 0, 4, 5,    // right
        0, 5, 6, 0, 6, 1,    // up
        1, 6, 7, 1, 7, 2,    // left
        7, 4, 3, 7, 3, 2,    // down
        4, 7, 6, 4, 6, 5     // back
    ]);

    var sky_vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sky_vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexSkybox), gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    var sky_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sky_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, skyboxIndex, gl.STATIC_DRAW);

    var sky_tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, sky_tex);
    for (let i = 0; i < 6; i++) {
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgArray[i]);
    }
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    //gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

    gl.uniform1i(u_SkyTexMap, 0);
    //gl.drawElements(gl.TRIANGLES, skyboxIndex.length, gl.UNSIGNED_SHORT, 0);
    return [sky_vertex_buffer, sky_index_buffer, sky_tex];


}

function DrawSky(context) {


    
    gl.bindBuffer(gl.ARRAY_BUFFER, context.vertex_buffer); // vertex buffer 
    gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, context.index_buffer); // index buffer
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, context.texture);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

}
