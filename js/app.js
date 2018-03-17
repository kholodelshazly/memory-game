
let cardsBottoms = ['fa fa-diamond',
                    'fa fa-paper-plane-o',
                    'fa fa-anchor',
                    'fa fa-bolt',
                    'fa fa-cube',
                    'fa fa-anchor',
                    'fa fa-leaf',
                    'fa fa-bicycle',
                    'fa fa-diamond',
                    'fa fa-bomb',
                    'fa fa-leaf',
                    'fa fa-bomb',
                    'fa fa-bolt',
                    'fa fa-bicycle',
                    'fa fa-paper-plane-o',
                    'fa fa-cube'];

//list storing open cards
let openCards = []; 
let matchedCards = []; 
let score = 3; 
let counter = 0;
let isFirstClick = true;
let currentBottoms = [];
var timer;
var Seconds=0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


function countT() {
   ++Seconds;
   var hour = Math.floor(Seconds /3600);
   var minute = Math.floor((Seconds - hour*3600)/60);
   var xseconds = Seconds - (hour*3600 + minute*60);
   document.getElementById("time").innerHTML = hour + ":" + minute + ":" + xseconds;
}
function resetTimer() {
	clearInterval(timer);
	Seconds = 0;
	
}

function starttimer(){
    timer= setInterval(countT, 1000);
    Seconds = 0;
}
function newGame() {
   
      var win=document.getElementById("win");
      win.style.display="none";
      game.style.display="flex";
 	let cards = document.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
     cards[i].setAttribute("class", "card");
}
let newCardsBottoms = shuffle(cardsBottoms);
currentBottoms =document.getElementsByClassName("mine");
  for (i = 0; i <currentBottoms.length; i++) {
    currentBottoms[i].setAttribute("class",newCardsBottoms[i]+" mine");
}
 	//reset global variables and counter
 	openCards = []; 
 	matchedCards = [];
 	score = 3;
 	counter = 0;
 	isFirstClick = true;
		document.getElementById("mov").innerHTML = "0";
		document.getElementById("first-star").style.color = "#000";
		document.getElementById("second-star").style.color = "#000";
		document.getElementById("third-star").style.color = "#000";
      document.getElementById("time").innerHTML = "00"+":"+"00"+":"+"00";
      resetTimer();
      if (!isFirstClick) {
         alert('new');
         resetTimer();
         isFirstClick=true;
	}
     
     
           
      
 }
 // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function show(card) {
	card.setAttribute("class", "card show open");
}

function hide(card) {
card[0].parentElement.setAttribute("class", "card");
card[1].parentElement.setAttribute("class", "card");
}

function OpenOnMatch(card) {
	card[0].parentElement.setAttribute("class", "card match");
	card[1].parentElement.setAttribute("class", "card match");
}
// show win masseage
function showWinnigMessage() {
	var hour = Math.floor(Seconds /3600);
      var minute = Math.floor((Seconds - hour*3600)/60);
      var xseconds = Seconds - (hour*3600 + minute*60);
      var game=document.getElementById("game");
      game.style.display="none";
      var win=document.getElementById("win");
      win.style.display="block";
      document.getElementById("pwin").innerHTML = "With "+counter+" moves"+" and "+score+" stars in "+hour + ":" + minute + ":" + xseconds+"   wooooo!";
}

function showLosingMessage() {
      alert('you looooooooooose!!');
	newGame();
	
}

function addToOpen(card) {
	let cardPic=card.getElementsByTagName('i');
	let ma=cardPic[0].className.split(' ');
	openCards.push(ma[1]);
}

function increaseCounter() {
	counter += 1;
	document.getElementById("mov").innerHTML =counter;
   // decrease the score depending on the amount of moves that were already made
	if (counter===20) {
		document.getElementById("third-star").style.color = "#fefefe";
		score=2;
	} else if (counter===30) {
		document.getElementById("second-star").style.color = "#fefefe";
		score=1;
	} else if (counter>50) {
		showLosingMessage();
	}
}

function checkMatch() {
   //if two cards are show
	if (openCards.length==2) {
	if (openCards[0]==openCards[1]) { 
				var x = document.querySelectorAll("."+openCards[0]);
				OpenOnMatch(x);
			 matchedCards.push(openCards[0]);
          //the player is won when the card match=8
			if (matchedCards.length===8) { 
				 clearInterval(timer);
			 	showWinnigMessage();	
			  }
            //hide the show cards
		} else {
			var y = document.querySelectorAll("."+openCards[0]);
			var z = document.querySelectorAll("."+openCards[1]);
			hide(y);
			hide(z);
		}
		openCards=[];
	} 
}
 function react(obj) {
 if (isFirstClick) {
      starttimer();
		isFirstClick = false;
	}
  var h=obj.getAttribute("class");
  if (h=='card'){
   //if there is one or no cards open
		if (openCards.length<=1) {
		 show(obj);
	    addToOpen(obj);
		 setTimeout(checkMatch,800); //give time to the player to see cards
		}
      if(openCards.length===2){
       increaseCounter() ;
      }
      
}
}
// when player click on reload button
window.addEventListener("load", function(event) {
   
   clearInterval();
   second=0;
   isFirstClick=true;
   
    newGame();
   
   
  });
