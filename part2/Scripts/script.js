/**
 * Assignment 1
 * Course: COMP 466
 * Student: Evgeny Zaev
 * Student #: 3270903
 * Date:19 Jan 2022
 * 
 */

var image_array = []; // stores 
var image_array_length; 
var currentImage = 0;
var play = false;
var intervalTimerID;
var randomizeSlides = false;

//buttons controlling slide show
const btn_playStop = document.getElementById('btn_startStop');
const btn_prev = document.getElementById('btn_prev');
const btn_randomOrSequential = document.getElementById('btn_randOrSeq');

//event listeners for the buttons
$("#btn_next").click(showNextImage);
$("#btn_prev").click(ShowPrevImage);
$("#btn_startStop").click(stopPlay);
$("#btn_randOrSeq").click(changeRandToSeq);
// when window loads read image data by class
window.addEventListener('load', e => {
	$(document).ready(function () {

		$(".image_shown").each(function () {
			image_array.push(this);
		});
		image_array[0].style.display = "inline-block";
		image_array_length = image_array.length;
	});

});


//function determines which image is next and
//depending on transition chooses displays it 
function showNextImage() {
	//hide current image
	$("#" + image_array[currentImage].id).toggle();

	if (randomizeSlides) {
		selectRandom(0, image_array_length - 1);
	} else {
		currentImage = incrementIndex(currentImage);
    }

	//show next iamge
	$("#" + image_array[currentImage].id).toggle();
}

//show previuos image 
function ShowPrevImage() {
	$("#" + image_array[currentImage].id).toggle();
	currentImage = decrementCircle(currentImage);
	$("#" + image_array[currentImage].id).toggle();
}

//Function selects a random number, different from current slide
function selectRandom(min, max) {
	let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

	while (currentImage == randomNumber) {
		randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
	}
	currentImage = randomNumber;
}

// decrement number, if number was at zero set it to last index
function decrementCircle(number) {
	number -= 1;

	if (number < 0) {
		number = image_array_length - 1;
	}

	return number;
}

//Function increments current and next img index by one  
function incrementIndex(number) {

	if (number == image_array_length - 1) {
		number = 0;
	} else {
		number++;
	}
	return number;
}

// if automatic transition is on function pauses it
// if its in paused(not in play) then it turns it on
function stopPlay() {
	if (!play) {
		play = true;
		$("#btn_startStop").html("Stop");
		intervalTimerID = setInterval(showNextImage, 2500);
	} else {
		play = false;
		//reset data used in transitions
		clearInterval(intervalTimerID);
		$("#btn_startStop").html("Play");
	}
}

// change to/from random to Sequential
// disable back/forward buttons on random
function changeRandToSeq() {
	if (randomizeSlides) {
		randomizeSlides = false;
		$("#btn_randOrSeq").html("Sequential");
		$("#btn_next").prop('disabled', false);
		$("#btn_prev").prop('disabled', false);
		$("#btn_next #btn_prev").css('background-color', "rgb(153, 197, 255)");
		//btn_prev.style.backgroundColor = "rgb(153, 197, 255)";
		//btn_next.style.backgroundColor = "rgb(153, 197, 255)";
	} else {
		randomizeSlides = true;
		$("#btn_randOrSeq").html("Random");
		$("#btn_next").prop('disabled', true);
		$("#btn_prev").prop('disabled', true);
		$("#btn_next #btn_prev").css('background-color', 'grey');
		//$("#btn_prev").css('background-color', 'red');
	
	}
}