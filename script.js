//Header Section -> Main Page
let header = document.getElementById("header");
let startButton = document.getElementById("btnStart");

//Quiz Container -> Second Page 
let quizContainer = document.querySelector("#quiz-container");
let questionsDisplayed = document.getElementById("displayQuestion");
let scoreTracker = document.querySelector("#userTracker");
let timerDisplay = document.querySelector("#timeTrack");
let displayMessage = document.querySelector("#message");

//Score Section -> Third Page
let scoreContainer = document.getElementById("scoreContainer");
let submitScoreBtn = document.getElementById("submitScoreBtn");
var subEl = document.querySelector(".subQuiz");

// Score Board Local Storage Section -> Fourth Page
let finalScoreBoard = document.getElementById("scoreBoard");
let errorMessage = document.getElementById("errorMessage");
let playerInitials = document.querySelector("#playerInitials");
let storeUserInitials = document.querySelector("#userInitials");
let storeUserScore = document.getElementById("userScore");

let secondsLeft = 60;
var timerInterval;
let score = 10;
var qIndex = 0; // current index

//Hide Quiz Section and Score Section
subEl.classList.add('hide'); 
scoreContainer.classList.add('hide');
finalScoreBoard.classList.add('hide');

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
            a: "font",
            b: "style",
            c: "class" 
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

//Locally store questions, retrieve them and change it to objects
localStorage.setItem("questionsObj", JSON.stringify(questionsObj));
var mainQuestions = localStorage.getItem("questionsObj");
mainQuestions = JSON.parse(mainQuestions);


// Start Button 
startButton.addEventListener( "click", startQuiz);


function startQuiz() {
    header.classList.add('hide');
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
    // before going to the next question ,check if it is the last one
    if(qIndex == 4){
        checkScore(score);
        scoreTracker.textContent = score;
        return endQuiz();
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
    message.setAttribute("style","color: green; font-size: 20px; font-weight: bold;");
    displayMessage.appendChild(message);  
}

 function wrongAnswer(){
    displayMessage.innerHTML = '';
    var message = document.createElement("P");
    message.textContent = "Wrong Answer!";
    message.setAttribute("style","color: red; font-size: 20px; font-weight: bold;");
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

function errorMsgDisplay(){
    errorMessage.textContent = "Please state your initials in the box.";
}

submitScoreBtn.addEventListener("click", function (event){
    event.preventDefault();
    scoreContainer.classList.add('hide');
    finalScoreBoard.classList.remove('hide');

    var playerInfo = {
        playerName: playerInitials.value, //J.S
        playerScore: score

    };

    if(playerInfo.playerName == ""){
        errorMsgDisplay();
    } else {
        localStorage.setItem("playerInfo",JSON.stringify(playerInfo));
        var player = localStorage.getItem("playerInfo");
        
        player = JSON.parse(player);
        console.log(player.playerScore.toString());
        var stringScore = player.playerScore.toString();
        storeUserInitials.innerHTML = player.playerName;
        storeUserScore.innerHTML = stringScore;
        
    }
    
});