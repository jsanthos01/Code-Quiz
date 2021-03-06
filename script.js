//Header Section -> Main Page
let header = document.getElementById("header");
let startButton = document.getElementById("btnStart");
let instructionsBtn = document.getElementById("instructionsBtn");
let instructionCard  = document.querySelector("#instructionsCard")

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
let errorMessage = document.querySelector("#errorMessage");
let playerInitials = document.querySelector("#playerInitials");
let storeUserInitials = document.querySelector("#userInitials");
let storeUserScore = document.getElementById("userScore");

let secondsLeft = 60;
var timerInterval;
let score = 10;
var qIndex = 0; // current index

let playerInfoArr = [];

//Hide Quiz Section and Score Section
subEl.classList.add('hide'); 
scoreContainer.classList.add('hide');
finalScoreBoard.classList.add('hide');
instructionCard.classList.add('hide');


instructionsBtn.addEventListener("click", function(){
    instructionCard.classList.remove("hide")
});

function hideinstructionsCard(){
    instructionCard.classList.add("hide")
}

const questionsObj = [
    {
        question: " Q1: What does HTML stand for?",
        answer: {
            a: "Hyperlinks and Text Markup Language",
            b: "Hypertext Markup Language", //Correct Answer
            c: "Hyperlinks Tool Maker Language"
        },
        correctAnswer: "Hypertext Markup Language"
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
    instructionCard.classList.add('hide');
    subEl.classList.remove('hide');
    quizTimer();
    scoreTracker.textContent = score;
    showQuestions(qIndex);
}

function showQuestions(i) {
    questionsDisplayed.innerHTML = 
    `<form><h4>${questionsObj[i].question}</h4>
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
    message.setAttribute("style","color: #22cc00; font-size: 20px; font-weight: bold;");
    displayMessage.appendChild(message);  
}

function wrongAnswer(){
    displayMessage.innerHTML = '';
    var message = document.createElement("P");
    message.textContent = "Wrong Answer!";
    message.setAttribute("style","color: #ff002b; font-size: 20px; font-weight: bold;");
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
    let playerInfo = {
        playerName: playerInitials.value, //J.S
        playerScore: score
    };

    if(playerInfo.playerName == ""){
        errorMsgDisplay();
    } else {

        if( localStorage.playerInfo != null){
        
            let player = JSON.parse(localStorage.getItem("playerInfo"));
            console.log(player);
        
            playerInfoArr = player;
            
            console.log("PLAYERINFO ARRAY EXISTING STUFF");
            console.log(playerInfoArr);
            playerInfoArr.push(playerInfo);
            
            console.log("PLAYERINFO ARRAY new STUFF");
            console.log(playerInfoArr);
            localStorage.setItem("playerInfo",JSON.stringify(playerInfoArr));
            player = JSON.parse(localStorage.getItem("playerInfo"));
        
            player.forEach((info) => {
                console.log("Inside the forEach Function")
                console.log(info.playerScore);

                //appending initials
                var initialsTag = document.createElement("P");
                var initialsText = document.createTextNode(info.playerName);
                initialsTag.appendChild(initialsText);
                storeUserInitials.appendChild(initialsTag);

                //appending score for each player
                var scoreTag = document.createElement("P");
                var scoreText = document.createTextNode(info.playerScore);
                scoreTag.appendChild(scoreText);
                storeUserScore.appendChild(scoreTag);
            });
            
        }else {
            playerInfoArr.push(playerInfo);

            console.log(playerInfoArr);
            localStorage.setItem("playerInfo",JSON.stringify(playerInfoArr));
            let player = JSON.parse(localStorage.getItem("playerInfo"));

            console.log(player);

            player.forEach((info) => {
                console.log("Inside the forEach Function")
                console.log(info.playerScore);
                storeUserInitials.innerHTML = info.playerName;
                storeUserScore.innerHTML = info.playerScore;
            });
        }
    }
});

