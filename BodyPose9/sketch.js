let video;
let bodyPose;
let poses = [];
let connections;

function preload(){
  bodyPose = ml5.bodyPose("MoveNet",{flipped: true, modelType: "MULTIPOSE_LIGHTNING"});
  //bodyPose = ml5.bodyPose("MoveNet");
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
  //video = createCapture(VIDEO);
  video.size(1720,1080);

  video.hide();

  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();
}

function draw() {
  background(0,15);
  //image(video,820,50);
  //image(video,0,0);
  // fill("blue");
  // noStroke();
  // rect(50,50,640,480);

  if (poses.length > 0){
    let pose = poses[0];
    let x = pose.nose.x;
    let y = pose.nose.y;
    // fill("white");
    // noStroke();
    // circle(x,y,20);
    //console.log(poses);
  
  for (let i = 0; i < pose.keypoints.length; i++){
    let keypoint = pose.keypoints[i];
    //fill (0,0,255);
    // fill("white");
    // noStroke();
    if (keypoint.confidence > 0.1){
      //circle(keypoint.x,keypoint.y,20);
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
        stroke("white");
        strokeWeight(5);
        line(keyPointA.x ,keyPointA.y,keyPointB.x,keyPointB.y);
      }
    }
    
    let rx = pose.right_wrist.x;
    let ry = pose.right_wrist.y;
  
    let lx = pose.left_wrist.x;
    let ly = pose.left_wrist.y;
  
    // fill("white");
    // circle(rx,ry,15);
    // circle(lx,ly,15);
  
    // let d = dist(rx,ry,lx,ly);
    // stroke("lightblue");
    // strokeWeight(10);
    // line(50,50,d,50);
    // line(50,50,50,d);
    // fill("lightpink");
    // stroke("lightpink");
    // circle(750,600,d);
    // fill("white");
    // noStroke();
    // circle(x,y,d);
  }
}
}
