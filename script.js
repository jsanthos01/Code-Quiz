let header = document.getElementById("header");
let startButton = document.getElementById("btnStart");

let quizContainer = document.querySelector("#quiz-container");
let questionsDisplayed = document.getElementById("displayQuestion");
let scoreTracker = document.querySelector("#userScore");
let timerDisplay = document.querySelector("#timeTrack");
let displayMessage = document.querySelector("#message");
var qIndex = 0; // current index

let scoreContainer = document.getElementById("scoreContainer");
var subEl = document.querySelector(".subQuiz")
subEl.classList.add('hide');
scoreContainer.classList.add('hide');

let secondsLeft = 60;
let score = 0;
var timerInterval;
//Question and Answer is displayed as an array of Objects
const questionsObj = [
    {
        question: " Q1: What does HTML stand for?",
        answer: {
            a: "Hyperlinks and Text Markup Language", //Correct Answer
            b: "Hyper Text Markup Language",
            c: "Hyperlinks Tool Maker Language",
            
        },
        correctAnswer: "Hyperlinks and Text Markup Language"
    },

    {
        question: "Q2: What does CSS stand for?",
        answer: {
            a: "Cascading Style Sheet", //Correct Answer
            b: "Colorful Style Sheet",
            c: "Computer Style Sheets"
        },
        correctAnswer: "Cascading Style Sheet"
    },

    {
        question:"Q3: Which HTML attribute is used to define inline styles?",
        answer: {
            //how to make the tag a text?
            a: "font",
            b: "style",
            c: "class" //Correct Answer
        },
        correctAnswer: "style"

    },

    {
        question:"Q4: How do you insert a comment in a CSS file?",
        answer: {
            a: "'this is a comment",
            b: "//this is a comment//", //correct answer
            c: "/* this is a comment*/"
        },
        correctAnswer: "/* this is a comment*/"

    },

    {
        question:"Q5: How do you create a function in JavaScript?",
        answer: {
            a: "function:myFunction()",
            b: "function myFunction()",  //Correct Answer
            c: "function = myFunction()"
        },
        correctAnswer: "function myFunction()"

    }
]

// Start Button 
startButton.addEventListener( "click", startQuiz);

function startQuiz() {
    header.style.display = "none";
    subEl.classList.remove('hide');
    quizTimer();
    showQuestions(qIndex);
    
}

function showQuestions(i) {
    questionsDisplayed.innerHTML = `<form><h4>${questionsObj[i].question}</h4>
                                <div class="multipleChoice"><button type="button" class="btn btn-primary  btn-lg btn-block mb-3 pr-5 pl-5" onclick="checkAnswer(this,${i})">${questionsObj[i].answer.a}</button></div>
                                <div class="multipleChoice"><button type="button" class="btn btn-primary  btn-lg btn-block mb-3 pr-5 pl-5" onclick="checkAnswer(this,${i})">${questionsObj[i].answer.b}</button></div>
                                <div class="multipleChoice"><button type="button" class="btn btn-primary  btn-lg btn-block mb-3 pr-5 pl-5" onclick="checkAnswer(this,${i})">${questionsObj[i].answer.c}</button></div>
                         </form>`;
}

function checkAnswer (event,i) {
    var answer = event.textContent;
    if (answer == questionsObj[i].correctAnswer){
        score++;
        scoreTracker.textContent = score;
        correctAnswer();
    }else if(answer != questionsObj[i].correctAnswer){
        secondsLeft = secondsLeft-5;
        checkScore(score);
        score--;
        scoreTracker.textContent = score;
        wrongAnswer();
    }
    
    if(qIndex == 4){
        checkScore(score);
        scoreTracker.textContent = score;
        endQuiz();
    }

    qIndex++;
    showQuestions(qIndex);
}

function checkScore(score){
    if(score == 0) {
        secondsLeft = 0;
        endQuiz();
    }else {
        return;
    }
}

function correctAnswer (){
    displayMessage.innerHTML = '';
    var message = document.createElement("P");
    message.textContent = "Correct Answer!";
    displayMessage.appendChild(message);  
}

 function wrongAnswer(){
    displayMessage.innerHTML = '';
    var message = document.createElement("P");
    message.textContent = "Wrong Answer!";
    displayMessage.appendChild(message); 
}

function endQuiz(){
    clearInterval(timerInterval);
    subEl.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreBoard();

}
function quizTimer(){
    timerInterval = setInterval( function(){
        if (secondsLeft == 0){
            endQuiz();
        }else {
            secondsLeft--;
            timerDisplay.textContent = secondsLeft;
        }
    },1000);
}

function scoreBoard() {
    var totalScore = document.getElementById("scoreBoardText");
    totalScore.textContent = `Your total score is ${score}.`;
}

//Local Storage 
localStorage.setItem()