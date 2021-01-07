// function to pase obj text
// referenced https://github.com/frenchtoast747/webgl-obj-loader/tree/gh-pages

function ParseObj(obj) {
  var verts = [],
    vertNormals = [],
    textures = [],
    unpacked = {};
  // unpacking stuff
  unpacked.verts = [];
  unpacked.norms = [];
  unpacked.textures = [];
  unpacked.hashindices = {};
  unpacked.indices = [];
  unpacked.index = 0;
  // array of lines separated by the newline

  var VERTEX_RE = /^v\s/;
  var NORMAL_RE = /^vn\s/;
  var TEXTURE_RE = /^vt\s/;
  var FACE_RE = /^f\s/;
  var WHITESPACE_RE = /\s+/;

  var lines = obj.split(",");
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    var elements = line.split(WHITESPACE_RE);
    elements.shift();

    if (VERTEX_RE.test(line)) {
      // if this is a vertex
      verts.push.apply(verts, elements);
    } else if (NORMAL_RE.test(line)) {
      // if this is a vertex normal
      vertNormals.push.apply(vertNormals, elements);
    } else if (TEXTURE_RE.test(line)) {
      // if this is a texture
      textures.push.apply(textures, elements);
    } else if (FACE_RE.test(line)) {
      // if this is a face
      /*
        split this face into an array of vertex groups
        for example:
           f 16/92/11 14/101/22 1/69/1
        becomes:
          ['16/92/11', '14/101/22', '1/69/1'];
        */
      var quad = false;
      for (var j = 0, eleLen = elements.length; j < eleLen; j++) {
        // Triangulating quads
        // quad: 'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2 v3/t3/vn3/'
        // corresponding triangles:
        //      'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2'
        //      'f v2/t2/vn2 v3/t3/vn3 v0/t0/vn0'
        if (j === 3 && !quad) {
          // add v2/t2/vn2 in again before continuing to 3
          j = 2;
          quad = true;
        }
        if (elements[j] in unpacked.hashindices) {
          unpacked.indices.push(unpacked.hashindices[elements[j]]);
        } else {
          /*
                Each element of the face line array is a vertex which has its
                attributes delimited by a forward slash. This will separate
                each attribute into another array:
                    '19/92/11'
                becomes:
                    vertex = ['19', '92', '11'];
                where
                    vertex[0] is the vertex index
                    vertex[1] is the texture index
                    vertex[2] is the normal index
                 Think of faces having Vertices which are comprised of the
                 attributes location (v), texture (vt), and normal (vn).
                 */
          var vertex = elements[j].split("/");
          /*
                 The verts, textures, and vertNormals arrays each contain a
                 flattend array of coordinates.
                 Because it gets confusing by referring to vertex and then
                 vertex (both are different in my descriptions) I will explain
                 what's going on using the vertexNormals array:
                 vertex[2] will contain the one-based index of the vertexNormals
                 section (vn). One is subtracted from this index number to play
                 nice with javascript's zero-based array indexing.
                 Because vertexNormal is a flattened array of x, y, z values,
                 simple pointer arithmetic is used to skip to the start of the
                 vertexNormal, then the offset is added to get the correct
                 component: +0 is x, +1 is y, +2 is z.
                 This same process is repeated for verts and textures.
                 */
          // vertex position
          unpacked.verts.push(verts[(vertex[0] - 1) * 3 + 0]);
          unpacked.verts.push(verts[(vertex[0] - 1) * 3 + 1]);
          unpacked.verts.push(verts[(vertex[0] - 1) * 3 + 2]);
          // vertex textures
          unpacked.textures.push(textures[(vertex[1] - 1) * 2 + 0]);
          unpacked.textures.push(textures[(vertex[1] - 1) * 2 + 1]);
          // vertex normals
          unpacked.norms.push(vertNormals[(vertex[2] - 1) * 3 + 0]);
          unpacked.norms.push(vertNormals[(vertex[2] - 1) * 3 + 1]);
          unpacked.norms.push(vertNormals[(vertex[2] - 1) * 3 + 2]);
          // add the newly created vertex to the list of indices
          unpacked.hashindices[elements[j]] = unpacked.index;
          unpacked.indices.push(unpacked.index);
          // increment the counter
          unpacked.index += 1;
        }
        if (j === 3 && quad) {
          // add v0/t0/vn0 onto the second triangle
          unpacked.indices.push(unpacked.hashindices[elements[0]]);
        }
      }
    }
  }
  var vertices = unpacked.verts;
  var normals = unpacked.norms;
  var texcoords = unpacked.textures;
  var indices = unpacked.indices;
  console.log(
    "v",
    vertices.length/3,
    "\ni",
    indices.length/3,
    "\nn",
    normals.length/3,
    "\nt",
    texcoords.length/2
  );

  var v = [];
  var t = [];
  for (var i = 0; i < vertices.length; i += 3) {
    v.push(vec4(vertices[i], vertices[i + 1], vertices[i + 2], 1.0));
  }

  for (var i = 0; i < texcoords.length; i +=2) {
    t.push(vec2(texcoords[i], texcoords[i + 1]));
  }
  var ret = [v, normals, indices,t];
  return ret;
}
