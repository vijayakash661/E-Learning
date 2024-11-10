const questions = [
    { question: "What is the keyword used to define a function in Python?", options: ["def", "func", "define", "function"], answer: 0 },
    { question: "Which data structure is immutable in Python?", options: ["List", "Dictionary", "Set", "Tuple"], answer: 3 },
    { question: "What is the output of <code>type(42)</code> in Python?", options: ["str", "int", "float", "bool"], answer: 1 },
    { question: "What does PEP stand for in Python?", options: ["Python Enterprise Product", "Python Enhancement Proposal", "Python Efficiency Program", "Python Extended Protocol"], answer: 1 },
    { question: "Which of these is a Python framework?", options: ["Flask", "JavaFX", "React", "Bootstrap"], answer: 0 },
    { question: "Which module in Python is used for regular expressions?", options: ["regex", "re", "regular", "pyrex"], answer: 1 },
    { question: "How do you comment a single line in Python?", options: ["//", "#", "/*", "%%"], answer: 1 },
    { question: "Which function is used to read user input in Python?", options: ["scanf()", "input()", "read()", "get()"], answer: 1 },
    { question: "What is the default value of a boolean variable in Python?", options: ["true", "null", "undefined", "false"], answer: 3 },
    { question: "How do you create a list in Python?", options: ["{}", "()", "[]", "<>"], answer: 2 }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function getRandomQuestions() {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
}

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const feedbackElement = document.getElementById("feedback");

    feedbackElement.textContent = "";
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsElement.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const feedbackElement = document.getElementById("feedback");
    const correctIndex = selectedQuestions[currentQuestionIndex].answer;

    if (selectedIndex === correctIndex) {
        feedbackElement.textContent = "Correct!";
        score++;
    } else {
        feedbackElement.textContent = "Incorrect. The correct answer was: " + selectedQuestions[currentQuestionIndex].options[correctIndex];
    }

    document.querySelectorAll("#options button").forEach(button => button.disabled = true);
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").textContent = `You scored ${score} out of ${selectedQuestions.length}`;
    showFeedback();
}

function showFeedback() {
    const feedbackMessage = document.getElementById("feedback-message");
    let message;

    if (score === selectedQuestions.length) {
        message = "Excellent! You aced the quiz!";
    } else if (score >= selectedQuestions.length * 0.7) {
        message = "Great job! You have a good understanding of Python.";
    } else if (score >= selectedQuestions.length * 0.4) {
        message = "Not bad! You should review the material to improve.";
    } else {
        message = "Better luck next time! Review the course and try again.";
    }

    feedbackMessage.textContent = message;
}

function restartQuiz() {
    selectedQuestions = getRandomQuestions();
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result").style.display = "none";
    loadQuestion();
}

window.onload = () => {
    selectedQuestions = getRandomQuestions();
    loadQuestion();
};