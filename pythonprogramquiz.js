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
