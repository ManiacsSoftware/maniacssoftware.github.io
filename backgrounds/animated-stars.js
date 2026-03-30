const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl')

// -------------------- VERTEX SHADER --------------------
const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, `
precision highp float;

uniform mat4 u_mvp;
uniform float u_height;

attribute vec3 a_position;

varying float v_w;

void main(void) {

  vec4 finalPosition = u_mvp * vec4(a_position, 1.0);

  gl_Position = finalPosition;
  v_w = 1.0 / finalPosition.w;

  if (gl_Position.w > 0.0) {
    gl_PointSize = (5.0 * u_height / 1080.0) / gl_Position.w;

    if (gl_PointSize > 8.0) {
      gl_PointSize = 8.0;
    }
  } else {
    gl_PointSize = 0.0;
  }
}
`)
gl.compileShader(vertexShader)
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.error(gl.getShaderInfoLog(vertexShader))
}

// -------------------- FRAGMENT SHADER --------------------
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, `
precision highp float;

varying float v_w;

const vec4 begin = vec4(0.55, 0.55, 1.0, 1.0);
const vec4 end = vec4(1.0, 1.0, 1.0, 1.0);

vec4 interpolate4f(vec4 a, vec4 b, float p) {
  return p * b + (1.0 - p) * a;
}

void main(void) {

  vec2 pc = (gl_PointCoord - 0.5) * 2.0;

  float dist = (1.0 - sqrt(pc.x * pc.x + pc.y * pc.y));
  vec4 color = interpolate4f(begin, end, dist);

  float distPart = v_w / 70.0 + dist;
  float opa = dist * v_w / 1.5 - 0.1;

  gl_FragColor = vec4(distPart, distPart, distPart, opa) * color;
}
`)
gl.compileShader(fragmentShader)
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  console.error(gl.getShaderInfoLog(fragmentShader))
}

// -------------------- PROGRAM --------------------
const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

const attributes = {
  position: gl.getAttribLocation(program, 'a_position')
}

const uniforms = {
  mvp: gl.getUniformLocation(program, 'u_mvp'),
  height: gl.getUniformLocation(program, 'u_height')
}

// -------------------- POINTS --------------------
const NUM_POINTS = 20000
const points = []

for (let i = 0; i < NUM_POINTS; i++) {
  points.push((Math.random() - 0.5) * 8)
  points.push((Math.random() - 0.5) * 2)
  points.push((Math.random() - 0.5) * 8)
}

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)

// -------------------- SETUP --------------------
gl.clearColor(1.0, 1.0, 1.0, 1.0)
gl.enable(gl.BLEND)
gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

gl.useProgram(program)

gl.enableVertexAttribArray(attributes.position)
gl.vertexAttribPointer(
  attributes.position,
  3,
  gl.FLOAT,
  false,
  3 * 4,
  0
)

// -------------------- MATRICES --------------------
const pMatrix = mat4.create()
const vMatrix = mat4.create()
const ivMatrix = mat4.create()
const mMatrix = mat4.create()
const mvMatrix = mat4.create()
const mvpMatrix = mat4.create()

const position = vec3.create()
vec3.set(position, 0.0, 0.0, 0.0)

let angle = 0.0
let isDirty = true

function render(now) {

  if (canvas.width !== canvas.clientWidth) {
    canvas.width = canvas.clientWidth
    isDirty = true
  }

  if (canvas.height !== canvas.clientHeight) {
    canvas.height = canvas.clientHeight
    isDirty = true
  }

  if (isDirty) {
    gl.viewport(0, 0, canvas.width, canvas.height)

    mat4.perspective(
      pMatrix,
      Math.PI * 0.55,
      canvas.width / canvas.height,
      0.01,
      1000.0
    )

    isDirty = false
  }

  // update uniform: viewport height scaling
  gl.uniform1f(uniforms.height, canvas.height)

  angle += 0.0003
  position[2] = Math.sin(now / 20000) / 3

  mat4.identity(vMatrix)
  mat4.translate(vMatrix, vMatrix, position)
  mat4.rotateX(vMatrix, vMatrix, angle)
  mat4.rotateY(vMatrix, vMatrix, angle)
  mat4.rotateZ(vMatrix, vMatrix, angle)

  mat4.invert(ivMatrix, vMatrix)

  mat4.multiply(mvMatrix, ivMatrix, mMatrix)
  mat4.multiply(mvpMatrix, pMatrix, mvMatrix)

  gl.uniformMatrix4fv(uniforms.mvp, false, mvpMatrix)

  gl.drawArrays(gl.POINTS, 0, NUM_POINTS)

  requestAnimationFrame(render)
}

requestAnimationFrame(render)