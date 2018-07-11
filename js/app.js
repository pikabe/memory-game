const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
const fragment = document.createDocumentFragment();
let openedCards = [];
let matchedCards = []
let moves = 0;
let movesContainer = document.querySelector("span.moves");
let starNumber = 3;
let starsContainer = document.querySelector("ul.stars");
let timeContainer = document.querySelector("span.time");
let time = 0;
let timerOn = true;
let repeatIconContainer = document.querySelector("i.fa-repeat");
let gameEndPage = document.createElement("div");
let body = document.querySelector("body"); // using query selector retuns a node. using e.g. documen.getElementsByClassName('className') returns a collection




function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function moveCountUpdate(moves) {
  let movesText = document.createTextNode(moves.toString());
  movesContainer.removeChild(movesContainer.firstChild);
  movesContainer.appendChild(movesText);

}

function starCountUpdate(moves) {
  if (moves === 25) {
    starsContainer.removeChild(starsContainer.firstElementChild);
    starNumber -= 1;
  }
  if (moves === 35) {
    starsContainer.removeChild(starsContainer.firstElementChild);
    starNumber -= 1;
  }

}

function timeCountUpdate(time) {
  let gameTime = document.createTextNode(time.toString());
  timeContainer.removeChild(timeContainer.firstChild);
  timeContainer.appendChild(gameTime);
}

function refreshPage() {
  window.location.reload();
}

function gameFinished(stars, moves, time) {
  gameEndPage.classList.add("end-page");

  let endPageTitle = document.createElement("h1")
  let congratulationsHeading = document.createTextNode("Congratulation!!! You've won!");

  endPageTitle.appendChild(congratulationsHeading);

  let endPageStats = document.createElement("p");
  let statsStars;
  if (stars > 1) {
    statsStars = document.createTextNode(`You earned ${stars.toString()} stars!`);

  } else {
    statsStars = document.createTextNode(`You earned ${stars.toString()} star!`);

  }

  let moveStats = document.createTextNode(`Moves used: ${moves.toString()}`);
  let timeStats = document.createTextNode(` time taken: ${time.toString()} seconds`)
  let lineBreakOne = document.createElement("br");
  let lineBreakTwo = document.createElement("br");
  endPageStats.appendChild(statsStars);
  endPageStats.appendChild(lineBreakOne);
  endPageStats.appendChild(moveStats);
  endPageStats.appendChild(lineBreakTwo);
  endPageStats.appendChild(timeStats);

  let buttonText = document.createTextNode('Replay');
  let button = document.createElement("BUTTON");
  button.setAttribute("onClick", "refreshPage()");
  button.appendChild(buttonText);

  gameEndPage.appendChild(endPageTitle);
  gameEndPage.appendChild(endPageStats);
  gameEndPage.appendChild(button); //Appends the stats to container before it's appended to the body.

  body.removeChild(body.firstElementChild);
  body.appendChild(gameEndPage);

}

let shuffledIcons = shuffle(icons);

for (let icon of shuffledIcons) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `<i class="${icon}"></i>`;
  card.addEventListener("click", function() {
    if (timerOn === true) { //This starts timer once the first card is clicked.
      let timer = setInterval(function() {
        time += 1;
        timeCountUpdate(time);
        if (matchedCards.length === 16) { //Once all cards are matched, timer stops. Results page created using gameFinished.
          clearInterval(timer);
          gameFinished(starNumber, moves, time);
        }
      }, 1000);
    }
    timerOn = false // timer on used to make sure setInterval isn't called multiple times. setInterval called the first time the a card is clicked.

    if (openedCards.length === 0) {

      card.classList.add("open", "show");
      openedCards.push(card);
      moves += 1;

    } else if (openedCards.length === 1) {
      if (card.classList.contains("open") === false) {
        card.classList.add("open", "show");
        openedCards.push(card);
        moves += 1;
        if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
          openedCards[0].classList.add("match");
          openedCards[1].classList.add("match");
          matchedCards.push(openedCards[0]);
          matchedCards.push(openedCards[1]);

        }
      }

    } else { //When two cards are open at onece.
      if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
        openedCards = [];
        card.classList.add("open", "show");
        openedCards.push(card);
        moves += 1;

      } else {
        openedCards[0].classList.remove("open", "show");
        openedCards[1].classList.remove("open", "show");
        openedCards = [];;
        card.classList.add("open", "show");
        openedCards.push(card);
        moves += 1;
      }

    }
    moveCountUpdate(moves);
    starCountUpdate(moves); // removes stars depending on the number of moves


  })
  fragment.appendChild(card);

}

const container = document.querySelector("ul.deck");
container.appendChild(fragment);

repeatIconContainer.addEventListener("click", function() {
  refreshPage();
})




// function openCard() {
//   if ((openedCards.length <2) and ()) {
//     (".card").on
//
//   }
//
// }

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
