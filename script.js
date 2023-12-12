const questions = [
  {
    question: "Which country are you visiting if you are in the Taj Mahal??",
    answers: [
      { text: "India", correct: true },
      { text: "Kenya", correct: false },
      { text: "America", correct: false },
      { text: "Mexico", correct: false },
    ],
  },
  {
    question: " What company makes the Xperia model of smartphone?",
    answers: [
      { text: "Samsung", correct: false },
      { text: "Sony", correct: true },
      { text: "Nokia", correct: false },
      { text: "Iphone", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a fruit?",
    answers: [
      { text: "Rhubarb", correct: true },
      { text: "Tomatoes", correct: false },
      { text: "Avocadoes", correct: false },
      { text: "Mangoes", correct: false },
    ],
  },
  {
    question: "Which app has the most total users?",
    answers: [
      { text: "TikTok", correct: false },
      { text: "Snapchat", correct: false },
      { text: "Instagram", correct: true },
      { text: "X", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0; //reset it to 0
  score = 0; //reset the quiz to 0
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
} 
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct =="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    })
    nextButton.style.display = "block";

}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of 
    ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length ){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
       handleNextButton(); 
    }else{
        startQuiz();
    }
});
startQuiz();
