varying vec3 vertexNormal;

void main(){
  float intensity=pow(.62-dot(vertexNormal,vec3(2.1,1.3,1.9)),0.99);
  gl_FragColor = vec4(0.5216, 0.8549, 0.9765, 0.451) * intensity;
}