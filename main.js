humans=[];
status="";

function preload() {
    song=loadSound("zapsplat_emergency_nuclear_power_station_meltdown_alarm_42849.mp3");   
}

function setup() {
    canvas=createCanvas(700,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("Status").innerHTML="Status - Detecting Objects";
}


function draw() { 
    
    if(status!="") {
        for(var i=0;i<humans.length;i++) {
             fill("red");
             textSize(20);
             percent=floor(humans[i].confidence*100)
             text(humans[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+20);
             noFill();
             stroke("purple");
             strokeWeight(5);
             rect(humans[i].x,objects[i].y,objects[i].width,objects[i].height);
          }
        
    }
}