const questions = [
    {
        question: "What is my favorite color?",
        answers: [
            { text: "Yellow",correct:false},
            { text: "Blue",correct:false},
            { text: "Purple",correct:false},
            { text: "Red",correct:true},
        ]

    },
    {
        question: "What's my favorite food?",
        answers: [
            { text: "Shaorma Bulevard",correct:true},
            { text: "Pizza",correct:false},
            { text: "Soup",correct:false},
            { text: "Sarmale",correct:false},
        ]
    },
    {
        question: "When is my birthday?",
        answers: [
            { text: "13th of May",correct:false},
            { text: "27th of June",correct:false},
            { text: "13th of June",correct:true},
            { text: "27th of May",correct:false},
        ]
    },
    {question: "What's my cat's name?",
        answers: [
            { text: "Puffy",correct:false},
            { text: "Maya",correct:false},
            { text: "Nyx",correct:true},
            { text: "Iris",correct:false},
        ]
    },
    {
        question: "What's my favorite movie?",
        answers: [
            { text: "The Notebook",correct:false},
            { text: "Iron Man",correct:false},
            { text: "Despicable Me",correct:false},
            { text: "Avatar",correct:true},
        ]
    }    
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })

}
function resetState(){
    nextButton.style.display= "none";
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
    })
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! :)`;
    nextButton.innerHTML = "Play Again :D";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();    
    }else{
        startQuiz();
    }
})
startQuiz();