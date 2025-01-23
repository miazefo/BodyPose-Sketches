let video;
let bodyPose;
let poses = [];
let connections;

function preload(){
  bodyPose = ml5.bodyPose("MoveNet",{flipped: true});
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

}

function draw() {
  background(0,20);
  //background("black");


  if (poses.length > 0){
    let pose = poses[0];

    //nose
    let x = pose.nose.x;
    let y = pose.nose.y;
    //console.log(poses);
    
    //eyes
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

    stroke(255);
    strokeWeight(10);
    noFill();
  line(rx,ry,lx,ly);
  line(rx,ry,rx2,ry2);    
  line(rx2,ry2,rx3,ry3);
  line(rx3,ry3,rx4,ry4);
  line(rx4,ry4,rx5,ry5);
         //line(rx5,ry5,rx6,ry6);
       //line(rx5,ry5,rx7,ry7);
  line(rx5,ry5,rx8,ry8);
        // line(rx6,ry6,rx7,ry7);
      // line(rx7,ry7,rx8,ry8);
  line(rx8,ry8,lx8,ly8);
      // line(lx8,ly8,lx7,ly7);
  line(lx8,ly8,lx5,ly5);
         //line(lx7,ly7,lx6,ly6);
       // line(lx7,ly7,lx5,ly5);
         //line(lx6,ly6,lx5,ly5);
  line(lx5,ly5,lx4,ly4);
  line(lx4,ly4,lx3,ly3);
  line(lx3,ly3,lx2,ly2);
  line(lx2,ly2,lx,ly);

    
   
  }
  
}

