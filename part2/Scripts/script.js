/**
 * Assignment 1
 * Course: COMP 466
 * Student: Evgeny Zaev
 * Student #: 3270903
 * Date:19 Jan 2022
 * 
 */

//buttons controlling slide show
const btn_playStop = document.getElementById('btn_startStop');
const btn_prev = document.getElementById('btn_prev');
const btn_next = document.getElementById('btn_next');
const btn_randomOrSequential = document.getElementById('btn_randOrSeq');

var img_objects; //array storing image JSON ojects
	
var currentImage = 0;
var nextImage = 1;
var now = null;
var play = false;
var intervalTimerID;
var timeoutTimerID;
var numberOfQuestions; // stores amount of slides
var randomizeSlides = false;

//hold image objects drawn onto canvas
var imgCurrent = document.createElement("img");
var imgNext = document.createElement("img");

//event listeners for the buttons
btn_randomOrSequential.addEventListener('click', changeRandToSeq);
btn_playStop.addEventListener('click', stopPlay);
btn_prev.addEventListener('click', prevImage);
btn_next.addEventListener('click', e => {
	if(play){
		stopPlay();		
	}
	showNextImage();
});

// when window loads read image data from file, set the button listeners
window.addEventListener('load', e => {
	loadJsonFile();
});

// read data from imgData.JSON file
function loadJsonFile(){
	var xhttpReq = new XMLHttpRequest();  
    xhttpReq.addEventListener("load", parseAndStoreJsonResponse);
    xhttpReq.open("GET", "imgData.JSON"); 
    xhttpReq.send();
}

// parse json file and assign img source to first img displayed
function parseAndStoreJsonResponse(){
	img_objects = JSON.parse(this.responseText);
	numberOfQuestions = img_objects.length;	
	assignImageSources(); //assign the source for the first image displayed
}

// change to/from random to Sequential
// disable back/forward buttons on random
function changeRandToSeq(){
	if(randomizeSlides){
		randomizeSlides = false;
		btn_randomOrSequential.innerHTML = "Sequential";
		btn_prev.disabled = false;
		btn_next.disabled = false;
		btn_prev.style.backgroundColor = "rgb(153, 197, 255)";
		btn_next.style.backgroundColor = "rgb(153, 197, 255)";
	} else {
		randomizeSlides = true;
		btn_randomOrSequential.innerHTML = "Random";
		btn_prev.disabled = true;
		btn_next.disabled = true;
		btn_prev.style.backgroundColor = "grey";
		btn_next.style.backgroundColor = "grey";
	}
}

// if automatic transition is on function pauses it
// if its in paused(not in play) then it turns it on
function stopPlay(){
	if(!play){
		play = true;
		btn_playStop.innerHTML = "Stop";	
		timeoutTimerID = setTimeout(showNextImage, 2000);
	} else {
		play = false;
		//reset data used in transitions
		clearInterval(intervalTimerID);
		clearTimeout(timeoutTimerID);
		btn_playStop.innerHTML = "Play";
	}
}

//function determines which image is next and
//depending on transition chooses displays it 
function showNextImage(){
	if(randomizeSlides){
		selectRandom(0, numberOfQuestions-1);
	} else {
		incrementIndex();
	}
		assignImageSources();
		if(play)
			timeoutTimerID = setTimeout(showNextImage, 3000);
}

//show previuos image 
function prevImage() {
	//stop automatically switching slides 
	if(play)
		stopPlay();

	if(currentImage == 0){
		currentImage = img_objects.length - 1;
		if(img_objects.length > 1)
			nextImage--;
	} else {
		nextImage = currentImage;
		currentImage -= 1;
	} 

	assignImageSources();
}

//Function increments current and next img index by one  
function incrementIndex(){
	previousImage = currentImage;

	if(currentImage == img_objects.length - 1){
		currentImage = 0;
	} else {
		currentImage++;
	}

	if(img_objects.length > 1){
		if(nextImage == img_objects.length - 1){
			nextImage = 0;
		} else {
			nextImage++;
		}
	}
}

//Function selects a random number, different from current slide
function selectRandom(min, max){
	min = Math.ceil(min);
 	max = Math.floor(max);
  	let randomNumber = Math.floor(Math.random() * (max - min + 1) + min); 

  	while(currentImage == randomNumber){
  		randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  	} 
  	currentImage = randomNumber;
}

//set sources for next and current images based on currentImage and 
// nextimage indexes
function assignImageSources(){
	imgCurrent.src = img_objects[currentImage].imageLocation;
	if(img_objects.length > 1)
		imgNext.src = img_objects[nextImage].imageLocation;
}

//adds caption to context provided and xposition is used to find center of the slide
// slide number used to draw slide caption
function addCaption(context, xPosition, slideNumber){
	context.fillStyle = "black";
	context.globalAlpha = 0.4;
	let captionHeight = CANVAS_HEIGHT * 0.2;
	context.fillRect(0, (CANVAS_HEIGHT-captionHeight), CANVAS_WIDTH, captionHeight);
	context.globalAlpha = 1;
	context.font = "20px Arial";
	context.fillStyle = "white";
	context.textAlign = "center";
	context.fillText(img_objects[slideNumber].imageCaption, xPosition + (CANVAS_WIDTH/2), (CANVAS_HEIGHT-captionHeight/2), (CANVAS_WIDTH*0.9));
}

// decrement number, if number was at zero set it to last index
function decrementCircle(number){
	number -= 1;

	if(number < 0){
		number = numberOfQuestions - 1;
	}

	return number;
}