const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Telefono išradėjas buvo Tomas Edisonas",
    choice1: "Taip",
    choice2: "Ne",
    answer: 2
  },
  {
    question: "Pasaulyje iš viso yra 197-ios šalys (atpažintos jungtinių tautų)",
    choice1: "Taip",
    choice2: "Ne",
    answer: 1
  },
  {
    question: "Turkija buvo pirmoji šalis pripažinus Lietuvą šalimi",
    choice1: "Taip",
    choice2: "Ne",
    answer: 2
  },
  {
    question: "Eurovizija kiekvienais metais vyksta sekmadienį",
    choice1: "Taip",
    choice2: "Ne",
    answer: 2
  },
  {
    question: "Šių metų (2023) eurovizija laimėjo Vokietija",
    choice1: "Taip",
    choice2: "Ne",
    answer: 2
  },
  {
    question: "Prieš eurą lietuvos valiuta buvo Latas",
    choice1: "Taip",
    choice2: "Ne",
    answer: 2
  },
  {
    question: "Lietuva yra didžiausia Baltijos šalis",
    choice1: "Taip",
    choice2: "Ne",
    answer: 1
  },
  {
    question: "Didžiausia pasaulio šalis yra Rusija",
    choice1: "Taip",
    choice2: "Ne",
    answer: 1
  },
  {
    question: "Seniausia kalba europoje yra graikų",
    choice1: "Taip",
    choice2: "Ne",
    answer: 2
  },
  {
    question: "Kiekvieną minutę į 'Youtube' yra įkeliama po 100 valandų turinio",
    choice1: "Taip",
    choice2: "Ne",
    answer: 1
  }
];

//CONSTANTS
const INCORRECT_TAX = 0;
const MAX_QUESTIONS = 10;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Klausimas ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};


startGame();
