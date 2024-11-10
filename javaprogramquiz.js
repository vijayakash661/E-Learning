const questions = [
    { question: "What does JVM stand for in Java?", options: ["Java Virtual Machine", "Java Variable Manager", "Java Volatile Memory", "Java Version Manager"], answer: 0 },
    { question: "Which keyword is used to create an instance of a class in Java?", options: ["class", "new", "instance", "object"], answer: 1 },
    { question: "Which of these is a Java access modifier?", options: ["public", "access", "visible", "private-method"], answer: 0 },
    { question: "What is the default value of a boolean variable in Java?", options: ["null", "0", "true", "false"], answer: 3 },
    { question: "Which package contains the Scanner class?", options: ["java.text", "java.io", "java.util", "java.lang"], answer: 2 },
    { question: "In Java, which keyword is used to inherit a class?", options: ["inherit", "extends", "implements", "super"], answer: 1 },
    { question: "What does 'null' mean in Java?", options: ["A string with no characters", "A value of 0", "A reference with no object", "An undefined object"], answer: 2 },
    { question: "Which of these is a primitive data type in Java?", options: ["String", "Integer", "boolean", "Array"], answer: 2 },
    { question: "Which of these is used to handle exceptions in Java?", options: ["try", "catch", "finally", "all of the above"], answer: 3 },
    { question: "Which of these is used to stop a thread in Java?", options: ["stop()", "exit()", "terminate()", "interrupt()"], answer: 0 }
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
        message = "Great job! You have a good understanding of Java.";
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
