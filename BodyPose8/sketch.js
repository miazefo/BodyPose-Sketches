let video;
let bodyPose;
let poses = [];
let connections;
let port; 
let connectBtn;
let filteredData1 = 0;
let filteredData2 = 0;
let filteredData3 = 0;
let val = 0;
let myVal = 0;
let myVal2 = 0

function preload(){
  bodyPose = ml5.bodyPose("MoveNet", 'multiple', {flipped: true});
 // bodyPose = ml5.bodyPose("BlazePose",{flipped: true});
}

function gotPoses(results){
  poses = results;
}

function mousePressed(){
  console.log(poses);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  port = createSerial();
  //fill(200);
  connectBtn = createButton('.');
  connectBtn.position(10, 10,);
  connectBtn.mousePressed(connectBtnClick);

  video = createCapture(VIDEO, {flipped: true});
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();

}

function draw() {
  background(0,8);
  //image(video,0,0);

  if (poses.length > 0){
    let pose = poses[0];
    let x = pose.nose.x;
    let y = pose.nose.y;
    //fill(255,0,0);
    // fill(255);
    // noStroke();
    // circle(x,y,10);
  
    for (let i = 0; i < pose.keypoints.length; i++){
      let keypoint = pose.keypoints[i];
      //fill (0,0,255);
      //fill(255,0,0);
      // fill(255);
      // noStroke();
      if (keypoint.confidence > 0.1){
       // circle(keypoint.x,keypoint.y,10);
      }
    
    for (let i = 0; i < connections.length; i++){
      let connection = connections[i];
      let a = connection [0];
      let b = connection[1];
      let keyPointA = pose.keypoints[a];
      let keyPointB = pose.keypoints[b];
  
      let confA = keyPointA.confidence;
      let confB = keyPointB.confidence;
  
      if (confA > 0.1 && confB > 0.1){
       // stroke(0,0,255);
        // stroke(255);
        // strokeWeight(2);
        // line(keyPointA.x,keyPointA.y,keyPointB.x,keyPointB.y);
      }
    }

  let rx = pose.right_wrist.x;
  let ry = pose.right_wrist.y;

  let lx = pose.left_wrist.x;
  let ly = pose.left_wrist.y;

  let rx2 = pose.right_ankle.x;
  let ry2 = pose.right_ankle.y;

  let lx2 = pose.left_ankle.x;
  let ly2 = pose.left_ankle.y;

  //fill(0,0,255);
  // fill("yellow");
  // stroke("yellow");
  // circle(rx,ry,10);
  // circle(lx,ly,10);

  let d = dist(rx,ry,lx,ly);
  stroke("white");
  noFill();
  // circle(900,500,d*2);
  circle(800,500,d*2);

  let d2 = dist(rx2,ry2,lx2,ly2);
  stroke("red");
  noFill();
  circle(800,500,d2*2);

  let filteredData1 = port.readUntil("\n"); 
  let filteredData2 = port.readUntil("\n"); 
 // let filteredData3 = port.readUntil("\n");

  if(filteredData1.length > 0){
   val = filteredData1;
  }
stroke("blue")
strokeWeight(5);
// circle(900,500,val);
circle(800,500,val*2);
  // if (val <= 600){
  //   stroke("lightblue");
  //   //strokeWeight(10);
  //   strokeWeight(5);
  //   //fill("lightblue");
  //   circle(800,500,d*2);
  // }

  //else{
  //   //stroke("white");
  //   strokeWeight(5);
  //   noFill();
  //   circle(1100,500,d);
  //  }

  if(filteredData2.length > 0){
    myVal = filteredData2;
  }

  stroke("yellow")
  strokeWeight(5);
  // circle(900,500,myVal);
  circle(800,500,myVal*2);
  // if (myVal <= 600){
  //   stroke("pink");
  //   //strokeWeight(20);
  //   strokeWeight(5);
  //  // fill("pink");
  //   circle(800,500,d*2);
  // }

   // else{
  //   //stroke("white");
  //   strokeWeight(5);
  //   noFill();
  //   circle(1100,500,d);
  //  }

  // if(filteredData3.length > 0){
  //   myVal2 = filteredData3;
  // }

  // stroke("red")
  // strokeWeight(5);
  // // circle(900,500,myVal2);
  // circle(800,500,myVal2*2);

  //  if (myVal2 <= 600){
  //   stroke("red");
  //   strokeWeight(5);
  //   //fill("red");
  //   circle(800,500,d*2);
  // }

  // else{
  //   //stroke("white");
  //   strokeWeight(5);
  //   noFill();
  //   circle(1100,500,d);
  //  }

  
  console.log(filteredData1);
  console.log(filteredData2);
  console.log(filteredData3);
}
}
}


function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}