var song_1 = ""
var song_2 = ""

var leftWristX = 0
var leftWristY = 0

var rightWristX = 0
var rightWristY = 0

var leftWristScore = 0

var song_1_isPlaying = ""
var song_2_isPlaying = ""

function preload(){

song_1 = loadSound('music.mp3')
song_2 = loadSound('music2.mp3')

}

function setup(){
canvas = createCanvas(600,500)

canvas.center();

video = createCapture(VIDEO);
video.hide();


posenet = ml5.poseNet(video, modelLoaded)
posenet.on('pose',gotPoses)
}

function draw(){

    image(video,0,0,600,500)

    fill('#ff0000')
    stroke('#ff0000')

    song_1_isPlaying = song_1.isPlaying();
    song_2_isPlaying = song_2.isPlaying();
    console.log(song_1_isPlaying)

    if(leftWristScore >= 0.2){

        circle(leftWristX,leftWristY,10)
        song_2.stop()

        if(song_1_isPlaying == false){
        song_1.play();
        
        document.getElementById("songName").innerHTML = "Sonng Playing - Harry Potter"
        }
    }

}

function modelLoaded(){
    console.log("posenet is inisialised")
}

function gotPoses(results){

    if(results.length > 0){
        console.log(results)

        leftWristX =  results[0].pose.leftWrist.x
        
        leftWristY =  results[0].pose.leftWrist.y

        rightWristX =  results[0].pose.rightWrist.x
        
        rightWristY =  results[0].pose.rightWrist.y

        console.log(results)

        leftWristScore = results[0].pose.keypoints[9].score

        song_1_isPlaying = song_1.isPlaying();

    }


}

function stop(){
    song_1.stop()
    song_2.stop()
}

