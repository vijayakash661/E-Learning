function toggleSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const welcomeMessageMobile = document.getElementById('welcomeMessageMobile');
    const welcomeMessageDesktop = document.getElementById('welcomeMessageDesktop');

    // Save user details on Sign-Up
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = {
                fname: document.getElementById('fname').value,
                lname: document.getElementById('lname').value,
                email: document.getElementById('signupEmail').value,
                password: document.getElementById('signupPassword').value,
            };
            localStorage.setItem('user', JSON.stringify(user));
            alert('Sign-Up successful!');
            window.location.href = 'index.html';
        });
    }

    // Validate user details on Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const user = JSON.parse(localStorage.getItem('user'));

            if (user && user.email === email && user.password === password) {
                localStorage.setItem('loggedInUser', user.fname);
                window.location.href = 'home.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }

    // Display username on Home Page for Mobile and Laptop Views
    const displayWelcomeMessage = (user) => {
        if (welcomeMessageMobile) {
            welcomeMessageMobile.textContent = `Welcome, ${user}`;
        }
        if (welcomeMessageDesktop) {
            welcomeMessageDesktop.textContent = `Welcome, ${user}`;
        }
    };

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        displayWelcomeMessage(loggedInUser);
    } else if (welcomeMessageMobile || welcomeMessageDesktop) {
        // Redirect to login if not logged in
        window.location.href = 'index.html';
    }
});


const questions = [
    // HTML Questions
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HyperTransfer Markup Language", "HighText Machine Language", "HyperText Machine Language"], answer: 0 },
    { question: "Which tag is used to create an unordered list in HTML?", options: ["<ul>", "<ol>", "<li>", "<list>"], answer: 0 },
    { question: "Which attribute is used in HTML to link an external stylesheet?", options: ["src", "rel", "type", "href"], answer: 3 },
    { question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<lb>", "<br>", "<line>"], answer: 2 },

    // CSS Questions
    { question: "Which CSS property is used to change the text color of an element?", options: ["font-color", "color", "text-color", "background-color"], answer: 1 },
    { question: "Which CSS property is used to control the space between lines of text?", options: ["letter-spacing", "line-height", "word-spacing", "text-spacing"], answer: 1 },
    { question: "In CSS, how do you select elements with a class name 'container'?", options: ["#container", ".container", "*container", "container"], answer: 1 },
    { question: "Which CSS property allows an element to float to the right or left?", options: ["float", "align", "position", "display"], answer: 0 },

    // JavaScript Questions
    { question: "What keyword is used to declare a variable in JavaScript?", options: ["variable", "let", "int", "set"], answer: 1 },
    { question: "How do you write a comment in JavaScript?", options: ["<!-- This is a comment -->", "// This is a comment", "/* This is a comment */", "Both B and C"], answer: 3 },
    { question: "Which method is used to convert a string to uppercase in JavaScript?", options: ["toUpperCase()", "upperCase()", "toUpper()", "stringToUpper()"], answer: 0 },
    { question: "How do you round a number to the nearest integer in JavaScript?", options: ["round()", "Math.round()", "Math.floor()", "Math.ceil()"], answer: 1 },
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
        message = "Excellent job! You got every question right. You're a Full Stack Development pro!";
    } else if (score >= selectedQuestions.length * 0.7) {
        message = "Great work! You scored above average. Keep up the good work to become a Full Stack expert!";
    } else if (score >= selectedQuestions.length * 0.4) {
        message = "Good effort! You have a solid foundation, but there's room for improvement. Keep practicing!";
    } else {
        message = "It looks like you struggled with this quiz. Review the material and try again to improve your skills.";
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
