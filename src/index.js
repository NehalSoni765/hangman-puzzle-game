import Hangman from "./hungman";
import {
  getPuzzleAsyncAwait,
  getPuzzle,
  getPuzzleSync,
  getPuzzlePromises,
  getCountries,
  getPuzzleBYFetchAPI,
  getLocation,
  callBackPuzzle,
} from "./request";

let hangman;
// = new Hangman("car paerts", 2);
const puzzleElem = document.querySelector("#puzzle"); //cat
const statusMessageElem = document.querySelector("#statusMessage"); //[]

// puzzleElem.textContent = hangman.puzzle;
// statusMessageElem.textContent = hangman.statusMessage;

window.addEventListener("keypress", function (e) {
  if (this.remainingGuesses < 0) return;
  hangman.makePuzzle(e.key);
  render();
  hangman.calculateStatus();
});

const render = () => {
  puzzleElem.textContent = "";
  statusMessageElem.textContent = hangman.statusMessage;
  hangman.puzzle.split("").forEach((element) => {
    const letterElem = document.createElement("span");
    letterElem.textContent = element;
    puzzleElem.appendChild(letterElem);
  });
};

const startGame = async () => {
  const puzzle = await getPuzzleAsyncAwait("2");
  console.log("puzzle ", puzzle);
  hangman = new Hangman(puzzle, 5);
  render();
};

document.querySelector("#reset").addEventListener("click", startGame);
startGame();

callBackPuzzle((puzzle) => console.log(puzzle));

//async callback
getPuzzle("2", (error, puzzle) => {
  if (error) {
    console.log("Error ", error);
  } else {
    console.log(puzzle);
  }
});

//below sync using this when checkbox checked browser locked so not change the value
const puzzle = getPuzzleSync();
console.log("puzzle ", puzzle);
console.log("Do something ");

//promises
getPuzzlePromises(2).then((data) => console.log("Puzzle BY PROMISE ", data));
getCountries("MX").then(
  (data) => console.log("COUNTRY: ", data.name.common),
  (error) => console.log(error)
);

//fetch puzzle api
getPuzzleBYFetchAPI(2)
  .then((data) => console.log("fetch Puzzle API Data ", data.puzzle))
  .catch((error) => console.log("fetch Puzzle API Error", error));

getLocation()
  .then((data) => getCountries(data.country))
  .then((data) => console.log("COUNTRY: ", data.name.common))
  .catch((error) => console.log("error ", error));

//async await
getPuzzleAsyncAwait()
  .then((data) => console.log("Async Puzzle Data ", data))
  .catch((error) => console.log("Async Puzzle Error", error));
