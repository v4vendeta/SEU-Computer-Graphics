
var theta = [0, 0, 0, 0];
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var deltaX;
var deltaY;

function HandleInput() {
  
  document.addEventListener("mousedown", handleMouseDown, false);
  document.addEventListener("mouseup", handleMouseUp, false);
  document.addEventListener("mousemove", handleMouseMove, false);

  document.onkeydown = keyDown;

}

function keyDown(event) {
  var speed = 10.0 * deltaTime; //move per fps -> move per second
  // 方向键控制元素移动函数
  var event = event || window.event; // 标准化事件对象
  switch (
    event.keyCode // 获取当前按下键盘键的编码
  ) {
    case 65: // a
      cam.CameraMove(2, 1, speed);
      break;
    case 68: // d
      cam.CameraMove(2, -1, speed);
      break;
    case 87: // w
      cam.CameraMove(1, 1, speed);
      break;
    case 83: // s
      cam.CameraMove(1, -1, speed);
      break;
    case 20:
      cam.Calibrate();
      break;
  }
}
function handleMouseDown(e) {
  mouseDown = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
}

function handleMouseUp(e) {
  mouseDown = false;
}

function handleMouseMove(e) {
  if (!mouseDown) return;
  let newMouseX = e.clientX;
  let newMouseY = e.clientY;
  deltaX = newMouseX - lastMouseX;
  deltaY = newMouseY - lastMouseY;
  cam.CameraRotate(radians(-2 * deltaX), 0); //left
  //cam.CameraRotate(radians(-2 * deltaY), 1); //down
  lastMouseX = newMouseX;
  lastMouseY = newMouseY;
}