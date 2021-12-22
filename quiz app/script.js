let quizData = [
    {
        question : "Which one is the first search engine in internet?",
        a:"Google",
        b:"Archie",
        c:"Altavista",
        d:"WAIS",
        correct:"b"
    }, {
        question : " Number of bit used by the IPv6 address?",
        a:"32 bit",
        b:"64 bit",
        c:"128 bit",
        d:"256 bit",
        correct:"c"
    },{
        question : "Which one is the first web browser invented in 1990?",
        a:"Internet Explorer",
        b:" Mosaic",
        c:"Mozilla",
        d:"Nexus",
        correct:"d"
    },{
        question : " First computer virus is known as?",
        a:"Rabbit",
        b:"Creeper Virus",
        c:"Elk Cloner",
        d:"SCA Virus",
        correct:"b"
    }
]

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});