let hw1;
let hw2;
let hw3;
let hw4;
let hw5;
let hw6;

let id;

 function preload(){
  hw1=loadImage("hw1.png");
  hw2=loadImage("hw2.png");
  hw3=loadImage("hw3.png");
  hw4=loadImage("hw4.png");
  hw5=loadImage("hw5.png");
  hw6=loadImage("hw6.png");
 }


function setup(){
  createCanvas(800,600,WEBGL);
  colorMode(HSB);

  stroke(255);
  strokeWeight(3);
}

  function draw(){
    translate(-width/2, -height/2, 0);
    clear();
    if(detections != undefined){
      if(detections.multiFaceLandmarks != undefined && detections.multiFaceLandmarks.length >= 1){

        //get edge as x-axis direction
        let right_edge_x = detections.multiFaceLandmarks[0][280].x * width;
        let right_edge_y = detections.multiFaceLandmarks[0][280].y * height;
        let right_edge_z = detections.multiFaceLandmarks[0][280].z * width;
        let left_edge_x = detections.multiFaceLandmarks[0][50].x * width;
        let left_edge_y = detections.multiFaceLandmarks[0][50].y * height;
        let left_edge_z = detections.multiFaceLandmarks[0][50].z * width;

        //get jaw as y-axis direction
        let jaw_x = detections.multiFaceLandmarks[0][199].x * width;
        let jaw_y = detections.multiFaceLandmarks[0][199].y * height;
        let jaw_z = detections.multiFaceLandmarks[0][199].z * width;

        //find face size as radius
        let size = 0.5 * dist(left_edge_x, left_edge_y, left_edge_z, 
                              right_edge_x, right_edge_y, right_edge_z);
        //let size = 400;
        //find a circle center in 3d
        let center = createVector((left_edge_x+right_edge_x)/2, 
                                  (left_edge_y+right_edge_y)/2,
                                  (left_edge_z+right_edge_z)/2);

        
        
        //3d align
        let from = center;
        let to = createVector(right_edge_x, right_edge_y, right_edge_z);
        let align = p5.Vector.sub(to, from);
        let jaw = createVector(jaw_x, jaw_y, jaw_z);
        let pitch = p5.Vector.sub(jaw, from);

        let rotateAngles = calculateAngleAlongAxis(align, pitch);

        translate(from.x, from.y, from.z);
        rotateZ(rotateAngles[0]);
        rotateY(rotateAngles[1]);
        rotateX(rotateAngles[2]);

        //patel shown & position settings
        push();
        //translate(1.5 * size, 0, 0);
        drawHeadwear(size*8);
        pop();

         /*
         for(let i = 0; i<20; i++){
          push();
          let angle = TWO_PI/20*i;
          rotateZ(angle);
          translate(1.5 * size, 0, 0);
          drawPatel(size*1.2);
          pop();
         }
         */
        
      }else{
         let ids=[1,2,3,4,5,6];
         id=random(ids);
     }
    }else{
      clear();
    }
  }

  function drawHeadwear(size){
        noStroke();

        switch(id){
          case 1: 
                texture(hw1);
                break;
          case 2: 
                texture(hw2);
                break;
          case 3: 
                texture(hw3);
                break;
          case 4: 
                texture(hw4);
                break;
          case 5: 
                texture(hw5);
                break;
          default: 
                texture(hw6);
        }
       // console.log(id);
        rect(-size/2.5, -size/2, 0.82*size, 1.18*size);
        
  }

  function calculateAngleAlongAxis(align, pitch){
  let V1 = pitch;
  let V1xy = createVector(V1.x, V1.y, 0);
  let phy = -atan2(V1.z, sqrt(V1xy.y*V1xy.y + V1xy.x*V1xy.x));

  let V2 = align;
  let V2xy = createVector(V2.x, V2.y, 0);
  let omega = atan2(V2xy.y, V2xy.x);
  let theta = atan2(V2.z, sqrt(V2xy.y*V2xy.y + V2xy.x*V2xy.x));

  return [omega, theta, phy];
}