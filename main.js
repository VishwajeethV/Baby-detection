humans=[];
status="";

function preload() {
    song=loadSound("zapsplat_emergency_nuclear_power_station_meltdown_alarm_42849.mp3"); 
    console.log("song is loaded");
}

function setup() {
    canvas=createCanvas(500,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}


function start() {
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("Status").innerHTML="status = detecting";
}



function modelloaded() {
    console.log("model is loaded");
    status=true;
}

function getresults(error,results) {
if(error){
    console.log(error);
}
else{
    console.log(results);
    humans=results;
}
}

function draw() { 
    image(video,0,0,500,350);
    if(status!="") {
        objectdetector.detect(video,getresults);
        for(var i=0;i<humans.length;i++) {
             fill("red");
             textSize(20);
             percent=floor(humans[i].confidence*100)
             text(humans[i].label+" "+percent+"%",humans[i].x+15,humans[i].y+20);
             noFill();
             stroke("red");
             strokeWeight(5);
             rect(humans[i].x,humans[i].y,humans[i].width,humans[i].height);
             if(humans[i].label=="person"){
               document.getElementById("Status").innerHTML="Status - Baby found";
               song.stop();
             }
             else{
                document.getElementById("Status").innerHTML="Status - Baby Missing";
                song.play();
             }
          }
        
    }
  }
