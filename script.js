const gameContainer = document.querySelector('div');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  function isOdd (num) {
    return num % 2;
  }
  // to prevent clicking more than two cards
  if (document.querySelector(`#flipped${score-1}`)){
    alert('you clicked too many. You can only pick two at a time');
    document.querySelector(`#flipped${score}`).style.backgroundColor = 'white';
  } else {
  // to prevent clicking a card that is already paired
    if (event.target.id === 'LOCKED'){
      alert('you already paired this card')
    } else {
      // to prevent clicking the same card twice
      if (event.target.id === `flipped${score}` && event.target.style.backgroundColor === event.target.className){
          alert('you cant click the same card twice');
      } else {
          score ++;
          h2.innerText = `Current Score: ${score}`;
          event.target.style.backgroundColor = event.target.classList.value;
          event.target.id = `flipped${score}`;
          // to check if two cards match by className (className is their color)
          if (document.querySelector(`#flipped${score-1}`).className === document.querySelector(`#flipped${score}`).className) {
            console.log('it worked');
            document.querySelector(`#flipped${score-1}`).id = 'LOCKED';
            document.querySelector(`#flipped${score}`).id = 'LOCKED';
            // to prevent the card from resetting on only one click
          } else if (Boolean(isOdd(score))===true) {
            console.log('hey');
            // to reset two cards if they do not match
          } else {
            setTimeout (function(){
              event.target.style.backgroundColor = 'white';
              event.target.removeAttribute('id');
              document.querySelector(`#flipped${score-1}`).style.backgroundColor = 'white';
              document.querySelector(`#flipped${score-1}`).removeAttribute('id');
            }, 1000);
          }
        }
      }
  }
}



// when the DOM loads
createDivsForColors(shuffledColors);

let score = 0;
const h2 = document.querySelector('h2');
const h3 = document.querySelector('h3');
const highScore = localStorage.getItem('score');
h3.innerText = `Best Score: ${highScore}`;


const submitScore=document.querySelector('.submit-score');
submitScore.addEventListener('click', function(e){
  e.preventDefault();
  if (score < highScore) {
    localStorage.setItem('score', score);
    h3.innerText = 'Best Score: ' + score;
} else if (JSON.parse(highScore) === 0 || JSON.parse(highScore)===null) {
    localStorage.setItem('score', score);
    h3.innerText = 'Best Score: ' + score;
} else if (JSON.parse(highScore) === score) {
    alert('Tie Game, try again!');
} else {
  alert('Not good enough, try again!');
}
})

const resetScore = document.querySelector('.reset-best');
resetScore.addEventListener('click', function(e){
  e.preventDefault();
  localStorage.setItem('score', 0);
})

const startButton = document.querySelector('button');
startButton.addEventListener('click', function(){
  gameContainer.id='game';
})