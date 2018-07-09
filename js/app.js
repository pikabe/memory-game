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
let openedCards = [];
let matchedCards = [];
let moves = 0;
let movesContainer = document.querySelector("span.moves");
let starsContainer = document.querySelector("ul.stars")


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

function StarCount (moveCount) {
  if (moveCount === 15) {
  starsContainer.removeChild(starsContainer.firstElementChild);
  }
  if (moveCount === 25) {
  starsContainer.removeChild(starsContainer.firstElementChild);
  }

}

let shuffledIcons = shuffle(icons);

const fragment = document.createDocumentFragment();

for (let icon of shuffledIcons) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `<i class="${icon}"></i>`;
  card.addEventListener("click", function() {
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
          matchedCards.push(openedCards[1])
        }
      }

    } else {
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
    let movesText =document.createTextNode(moves.toString());
    movesContainer.removeChild(movesContainer.firstChild);
    movesContainer.appendChild(movesText);
    StarCount(moves); // removes stars depending on the number of moves


  })
  fragment.appendChild(card);

}

const container = document.querySelector("ul.deck");
container.appendChild(fragment);








// function openCard() {
//   if ((openedCards.length <2) and ()) {
//     (".card").on
//
//   }
//
// }

function checkMatch() {


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
