prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:100

});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_picture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='snap' src='"+data_uri+"'>";

});
}

console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tMverBS5H/model.json",modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
    
}

function speak(){
    synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction1;
    speak_data_2="The second prediction is "+prediction2;
    utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function result(){
    img=document.getElementById("snap");
    classifier.classify(img,gotResults);

}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name1").innerHTML=results[0].label;
        document.getElementById("result_gesture_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(prediction1=="Nice"){
            document.getElementById("update_emoji1").innerHTML="&#128076;";
        }
        else if(prediction1=="Victory"){
            document.getElementById("update_emoji1").innerHTML="&#9996;";	
        }
        else if(prediction1=="Hello"){
            document.getElementById("update_emoji1").innerHTML="&#128075;";	
        }
        else if(prediction1=="Well Done"){
            document.getElementById("update_emoji1").innerHTML="&#128077;";	
        }
        if(prediction2=="Nice"){
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
        else if(prediction2=="Victory"){
            document.getElementById("update_emoji2").innerHTML="&#9996;";	
        }
        else if(prediction2=="Hello"){
            document.getElementById("update_emoji2").innerHTML="&#128075;";	
        }
        else if(prediction2=="Well Done"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";	
        }
        
    }
}


