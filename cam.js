//-----------------------------
// Camera Class-hanyang lu
// seu computer graphics lab
//----------------------------
class Camera {
  constructor(pos, at) {
    this.pos = pos;
    this.at = at;

    this.roll = normalize(
      vec3(
        this.pos[0] - this.at[0],
        this.pos[1] - this.at[1],
        this.pos[2] - this.at[2]
      ));
    //this.roll = negate(this.roll);
    this.up = vec3(0, 1, 0);
    this.pitch = normalize(cross(this.up, this.roll));
    this.yaw = normalize(cross(this.roll, this.pitch));

    this.original_pos = pos;
    this.origin_at = at;
  }

  CameraMove(dir, sign, speed) {

    switch (dir) {
      case 1: {
        this.pos = vec3(
          this.pos[0] - this.roll[0] * sign * speed,
          this.pos[1] - this.roll[1] * sign * speed,
          this.pos[2] - this.roll[2] * sign * speed
        );

        break;
      }
      case 2: {
        this.pos = vec3(
          this.pos[0] - this.pitch[0] * sign * speed,
          this.pos[1] - this.pitch[1] * sign * speed,
          this.pos[2] - this.pitch[2] * sign * speed
        );
        break;
      }
      default:
        break;
    }

    //console.log(this.pos);
    //console.log(this.roll);
  }

  // the camera rotate method 
  CameraRotate(angle, axis) {
    switch (
    axis // 0 : rotate by yaw, 1: rotate by pitch
    ) {
      case 0: // a
        var rt = rotate(angle, this.yaw);
        var p4 = vec4(this.pitch[0], this.pitch[1], this.pitch[2], 0.0);
        p4 = vec4mulmat4(p4, rt);
        this.pitch = vec3(p4[0], p4[1], p4[2]);

        var r4 = vec4(this.roll[0], this.roll[1], this.roll[2], 0.0);
        r4 = vec4mulmat4(r4, rt);
        this.roll = vec3(r4[0], r4[1], r4[2]);
        break;
      case 1:
        var rt = rotate(angle, this.pitch);
        var y4 = vec4(this.yaw[0], this.yaw[1], this.yaw[2], 0.0);
        y4 = vec4mulmat4(y4, rt);
        this.yaw = vec3(y4[0], y4[1], y4[2]);

        var r4 = vec4(this.roll[0], this.roll[1], this.roll[2], 0.0);
        r4 = vec4mulmat4(r4, rt);
        this.roll = vec3(r4[0], r4[1], r4[2]);
        break;
    }
  }

  // calculate lookat mat through pos,yaw,roll,pitch
  LookAt() {
    var viewmat = mat4();
    viewmat[0][0] = this.pitch[0];
    viewmat[0][1] = this.pitch[1];
    viewmat[0][2] = this.pitch[2];
    viewmat[0][3] = -dot(this.pitch, this.pos);
    viewmat[1][0] = this.yaw[0];
    viewmat[1][1] = this.yaw[1];
    viewmat[1][2] = this.yaw[2];
    viewmat[1][3] = -dot(this.yaw, this.pos);
    viewmat[2][0] = this.roll[0];
    viewmat[2][1] = this.roll[1];
    viewmat[2][2] = this.roll[2];
    viewmat[2][3] = -dot(this.roll, this.pos);
    viewmat[3][3] = 1;

    //console.log(this.roll);
    //viewmat = translate(viewmat);
    return viewmat;

  }

  Calibrate() {
    this.pitch = vec3(1, 0, 0);
    this.yaw = vec3(0, 1, 0);
    this.roll = vec3(0, 0, 1);
  }


  GetPos() {
    return this.pos;
  }

  GetdirMat() {
    //return this.roll;
    // var origin_dir = normalize(subtract(this.origin_at,this.original_pos));
    // var current_dir = vec3(-this.roll[0],-this.roll[1],-this.roll[2]);

    // var rad = Math.acos((origin_dir[0] * current_dir[0] + origin_dir[1] * current_dir[1] + origin_dir[2] * current_dir[2])/(length(origin_dir)*length(current_dir)));

    // console.log(origin_dir, current_dir, rad);
    


    // //camdir = mult(gun_trans, camdir);
    // var rot = rotateY(rad2angle(-rad));
    // //return basetrans;
    var movewithcam = translate(this.pos[0], this.pos[1], this.pos[2] - 4);
    var basetrans = mult(translate(0.2, -0.5, 4),rotateY(90));
    return mult(movewithcam,basetrans);
    
  }
}


function rad2angle(rad) {
  return rad * 180 / Math.PI;
}

// mat4x4*vec4
function vec4mulmat4(v, m) {
  var result = vec4();
  for (var j = 0; j < 4; ++j) {
    var sum = 0.0;
    for (var i = 0; i < 4; ++i) {
      sum += m[j][i] * v[i];
    }
    result[j] = sum;
  }
  return result;
}
