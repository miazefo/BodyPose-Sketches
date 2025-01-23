let video;
let bodyPose;
let poses = [];
let connections;

  let port;
  let str;
  let connectBtn;
  let numInputs = 4;
  let values = [];
  let d1,d2,d3,d4;

function preload(){
  bodyPose = ml5.bodyPose("MoveNet",{flipped: true, modelType: "MULTIPOSE_LIGHTNING", enableTracking: true});
 //bodyPose = ml5.bodyPose("MoveNet", {flipped: true});
}

function gotPoses(results){
  poses = results;
}

function mousePressed(){
  console.log(poses);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, {flipped: true});
 video.size(1720,1080);
  //video.size(640*2,480*2);
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();

    port = createSerial();
    connectBtn = createButton("Connect");
    connectBtn.position(10, 20);
    connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background(0,10);
  //background("black");

  str = port.readUntil("\n");
  if (str){
    values = int(split(str, ","));
    let data = values;
    console.log("values: "+values);

  for (let i = 0; i < values.length; i++){
    if (i < numInputs){
      d1 = data[0];
      d2 = data[1];
      d3 = data[2];
      d4 = data[3];

      console.log(d1);
      console.log(d2);
      console.log(d3);
      console.log(d4);
    }
  }
  }

  if (poses.length > 0){
    let pose = poses[0];

    //nose
    let x = pose.nose.x;
    let y = pose.nose.y;
    //console.log(poses);
  
    //eye
    let rx = pose.right_eye.x;
    let ry = pose.right_eye.y;
    let lx = pose.left_eye.x;
    let ly = pose.left_eye.y;

    //ears
    let rx2 = pose.right_ear.x;
    let ry2 = pose.right_ear.y;
    let lx2 = pose.left_ear.x;
    let ly2 = pose.left_ear.y; 

    //shoulders
    let rx3 = pose.right_shoulder.x;
    let ry3 = pose.right_shoulder.y;
    let lx3 = pose.left_shoulder.x;
    let ly3 = pose.left_shoulder.y;


    //elbows
    let rx4 = pose.right_elbow.x;
    let ry4 = pose.right_elbow.y;
    let lx4 = pose.left_elbow.x;
    let ly4 = pose.left_elbow.y;

    //wrists
    let rx5 = pose.right_wrist.x;
    let ry5 = pose.right_wrist.y;
    let lx5 = pose.left_wrist.x;
    let ly5 = pose.left_wrist.y;


    //hips
    let rx6 = pose.right_hip.x;
    let ry6 = pose.right_hip.y;
    let lx6 = pose.left_hip.x;
    let ly6 = pose.left_hip.y;

    //knees
    let rx7 = pose.right_knee.x;
    let ry7 = pose.right_knee.y;
    let lx7 = pose.left_knee.x;
    let ly7 = pose.left_knee.y;

    //ankles
    let rx8 = pose.right_ankle.x;
    let ry8 = pose.right_ankle.y;
    let lx8 = pose.left_ankle.x;
    let ly8 = pose.left_ankle.y;

    
    //wrist distance
    let m = dist(rx5,ry5,lx5,ly5);
    stroke("white");
    //thicker lines further from ultrasonic
    // if (d4<=300){
    //   strokeWeight(30);
    // }
    // if (d4> 200 && d4<=250){
    //   strokeWeight(25);
    // }
    // if (d4 > 150 && d4<=200){
    //   strokeWeight(20);
    // }
    // if (d4>100 && d4>=150){
    //   strokeWeight(15);
    // }
    // if (d4> 50 && d4 >=100){
    //   strokeWeight(10);
    // }
    // if (d4>=50){
    //   strokeWeight(5);
    // }

    //thicker lines closer to ultrasonic
        if (d4<=300){
          strokeWeight(5);
        }
        if (d4> 200 && d4<=250){
          strokeWeight(15);
        }
        if (d4 > 150 && d4<=200){
          strokeWeight(25);
        }
        if (d4>100 && d4>=150){
          strokeWeight(50);
        }
        if (d4>50 && d4 >=100){
          strokeWeight(75);
        }
        // if (d4> 50 && d4 >=100){
        //   strokeWeight(75);
        // }
        if (d4>50){
          strokeWeight(100);
        }
        // if (d4>=25){
        //   strokeWeight(100);
        // }
    //strokeWeight(d4+1);
    noFill();
    // circle(900,500,d*2);
    circle(900,500,m*2);

   //ankle distance
    let m2 = dist(rx8,ry8,lx8,ly8);
   // stroke("red");
    stroke(210,4,45);
    //stroke(220, 20, 60);
   //strokeWeight(d4+1);
    strokeWeight(5);
    noFill();
    circle(900,500,m2*2);

    //stroke("blue");
    stroke(0, 71, 171);
    //strokeWeight(d4+1);
    strokeWeight(5);
    noFill();
    circle(900,500,d2*3);


    if (!port.opened()) {
      connectBtn.html("Connect");
    } else {
      connectBtn.html("Disconnect");
    }
  }
}
function connectBtnClick() {
  if (!port.opened()) {
    port.open("Arduino", 115200);
  } else {
    port.close();
  }
}