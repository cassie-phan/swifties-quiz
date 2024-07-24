const questions = [
    {
        question: "What is the first album Taylor Swift wrote on her own?",
        answers: [
            { text: "folklore", correct: false },
            { text: "Speak now", correct: true },
            { text: "Midnights", correct: false },
            { text: "Lover", correct: false },
        ]
    },
    {
        question: "Which record label did Taylor Swift sign to in 2005?",
        answers: [
            { text: "Big Machine Records", correct: true },
            { text: "Warner Music Group", correct: false },
            { text: "Def Jam Recordings", correct: false },
            { text: "Universal Music Group", correct: false },
        ]
    },
    {
        question: "In which animated movie did Taylor Swift voice act in?",
        answers: [
            { text: "Dr. Seuss' The Lorax", correct: true },
            { text: "Trolls", correct: false },
            { text: "Sing", correct: false },
            { text: "Hotel Transylvania", correct: false },
        ]
    },
    {
        question: "Taylor Swfit appears in many commericals for which bank?",
        answers: [
            { text: "Bank of America", correct: false },
            { text: "Mastercard", correct: false },
            { text: "Capital One", correct: true },
            { text: "Wells Fargo", correct: false },
        ]
    },
    {
        question: "How many Grammy's has Taylor Swift won?",
        answers: [
            { text: "14", correct: true },
            { text: "12", correct: false },
            { text: "13", correct: false },
            { text: "11", correct: false },
        ]
    },
    {
        question: "In what year was Taylor Swift Time's Person of the Year?",
        answers: [
            { text: "2016", correct: false },
            { text: "2017", correct: false },
            { text: "2022", correct: false },
            { text: "2023", correct: true },
        ]
    },
    {
        question: "What were the listening parties Taylor Swift held for fans called?",
        answers: [
            { text: "Secret Sessions", correct: true },
            { text: "Swifties Sessions", correct: false },
            { text: "Secret Spot", correct: false },
            { text: "Special Sessions", correct: false },
        ]
    },
    {
        question: "What are Taylor Swift's famous cookie recipe flavor?",
        answers: [
            { text: "Browned butter chocolate chip", correct: false },
            { text: "Snickerdoodle", correct: false },
            { text: "Chai", correct: true },
            { text: "Vanilla bean sugar cookies", correct: false },
        ]
    },
    {
        question: "What exact time appears in Last Kiss?",
        answers: [
            { text: "2:08", correct: false },
            { text: "7:09", correct: false },
            { text: "1:58", correct: true },
            { text: "11:10", correct: false },
        ]
    },
    {
        question: "What's the only lead single where Taylor doesn't say the name of the song?",
        answers: [
            { text: "We Are Never Ever Getting Back Together", correct: true },
            { text: "Anti-Hero", correct: false },
            { text: "22", correct: false },
            { text: "Blank Space", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let curr = 0;
let score = 0;

function startQuiz(){
    curr = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currQ = questions[curr];
    let questionNum = curr + 1;
    questionElement.innerHTML = questionNum + ". " + currQ.question;

    currQ.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    curr++;
    if(curr < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(curr < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
