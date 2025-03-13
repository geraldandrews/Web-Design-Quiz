const container = document.querySelector('.container');
const h1Heading = document.querySelector('h1');
const h3Heading = document.querySelector('h3');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.next-btn');
const scoreCard = document.querySelector('.score-card');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.start-btn');
const timer = document.querySelector('.timer');
const returnBtn = document.querySelector('.return-btn');
const designerDiv = document.querySelector('.designer');

// Array which stores questions, choices, and answers
const quiz = [
    {
        question: "What does HTML stand for?",
        choices: ["Highend Text Multiple Languages", "Hyperlinks Text Multimedia Language", "Hyper Text Markup Language", "Homepage Text Media Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What does CSS stand for?",
        choices: ["Color Specialty Sheets", "Cascading Style Sheets", "Console Style Sheets", "Character Static Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What is the first file of a website usually named?",
        choices: ["home.html", "hyperlink.doc", "page.html", "index.html"],
        answer: "index.html"
    },
    {
        question: "Which HTML element is the largest heading?",
        choices: ["<h6>", "head", "heading", "<h1>"],
        answer: "<h1>"
    },
    {
        question: "What is the purpose of JavaScript?",
        choices: ["create the structure of a website", "adds dynamic content to a website", "helps the look and style of a website", "makes a website more user friendly"],
        answer: "adds dynamic content to a website"
    },
    {
        question: "What is an example of a semantic tag?",
        choices: ["<div>", "<span>", "<nav>", "<center>"],
        answer: "<nav>"
    },
    {
        question: "Inside which HTML element do we put JavaScript ",
        choices: ["<javascript>", "<js>", "<script>", "<scripting>"],
        answer: "<script>"
    },
    {
        question: "How do we select a class in CSS",
        choices: ["<class>", ".class", "--class", "<!class>"],
        answer: ".class"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        choices: ["<a>", "<i>", "<div>", "<b>"],
        answer: "<a>"
    },
    {
        question: "Which is a collection of web pages?",
        choices: ["www", "website", "server", "web links"],
        answer: "website"
    },
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            } else  {
                choiceDiv.classList.add('selected');
            }
        });
    }
    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        displayAlert(`That is the correct answer!`)
        alert.style.backgroundColor = '#008000';
        score++;
    } else {
        displayAlert(`Sorry but that answer is not correct!`);
        alert.style.backgroundColor = '#ff0000';
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        stopTimer();
        timer.classList.remove('pulse-animation');
        setTimeout(() => {
            alert.style.display = 'none';
            timeLeft = 15;
            showQuestions();
        }, 2000);
    } else {
        setTimeout(() => {
            showScore();
        }, 2000);
    }
}

// Function to show alerts 
const displayAlert = (msg) => {
    alert.style.display = 'block';
    alert.textContent = msg; 
}

// Function to show quiz score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    if (score >= 6) {
        displayAlert("Congratulations! You have successfully passed this quiz!");
        alert.style.backgroundColor = '#008000';
    } else {
        displayAlert("Sorry! You did not pass this quiz!");
        alert.style.backgroundColor = '#ff0000';
    }
    scoreCard.textContent = `You scored ${score} out of ${quiz.length}!`;
    nextBtn.textContent = 'Take Quiz Again';
    returnBtn.style.display = 'block';
    quizOver = true;
    timer.style.display = 'none';
    stopTimer();
}

// Function to start timer 
const startTimer = () => {
    clearInterval(timerID); 
    timer.textContent = timeLeft;
    timer.style.borderColor = '#008000';
    timer.classList.remove('pulse-animation');

    const countDown = () => { 
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 5) {
            timer.style.borderColor = '#ff0000';
            timer.classList.add('pulse-animation');
        }
        if (timeLeft === 0) {
            clearInterval(timerID);
            displayAlert(`Sorry time is up! Incorrect Answer!`);
            alert.style.backgroundColor = '#ff0000';
            timer.classList.remove('pulse-animation');
            currentQuestionIndex++;
            if (currentQuestionIndex < quiz.length) {
                setTimeout(() => {
                    alert.style.display = 'none';
                    showQuestions();
                }, 2000);
                timeLeft = 15; 
            } else {
                setTimeout(() => {
                   showScore();
                }, 2000);
            } 
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to stop timer
const stopTimer = () => {
    clearInterval(timerID);
}

// Function to shuffle questions
const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to start quiz
const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = 'flex';
    timer.style.borderColor = '#008000';
    shuffleQuestions();
}

// Start button functionality
startBtn.addEventListener('click', () => {
    h1Heading.style.display = 'none';
    h3Heading.style.display = 'none';
    startBtn.style.display = 'none';
    designerDiv.style.display = 'none';
    container.style.display = 'block';
    startQuiz();
});

// Next button functionality
nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === 'Next') {
        timer.style.borderColor = '#008000';
        return;
    }
    if (quizOver) {
        nextBtn.textContent = 'Next';
        returnBtn.style.display = 'none';
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        alert.style.display = 'none';
        startQuiz();
    } else {
        checkAnswer();
    }
});

// Return to start page button functionality
returnBtn.addEventListener('click', () => {
    container.style.display = 'none';
    h1Heading.style.display = 'block';
    h3Heading.style.display = 'block';
    startBtn.style.display = 'block';
    designerDiv.style.display = 'block';
    returnBtn.style.display = 'none';
    nextBtn.textContent = 'next';
    scoreCard.textContent = "";
    quizOver = false;
    score = 0;
    alert.style.display = 'none';
});