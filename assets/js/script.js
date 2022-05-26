// Initial Data 
let currentQuestion = 0;
let correctAwswers = 0;


showQuestion(); 

// Events 
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);


// Functions 
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        // showing progress
        let loadingQuestion = Math.floor((currentQuestion / questions.length) * 100); 
        document.querySelector('.progress--bar').style.width = `${loadingQuestion}%`;

        // hiding results
        document.querySelector('.scoreArea').style.display = 'none';
        // showing question
        document.querySelector('.questionArea').style.display = 'block';

        // add question
        document.querySelector('.question').innerHTML = q.question;

        // options 
        let optionsHtml = ''; 

        for(i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        // select options
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        // acabaram as questões ...
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        correctAwswers++;  
    } 

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAwswers / questions.length) * 100); 

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Precisa estudar mais!';
        document.querySelector('.scorePct').style.color = '#ff0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns, acima da média!';
        document.querySelector('.scorePct').style.color = '#00ff00';
    }

    // showing hits
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAwswers}.`;


    // showing results 
    document.querySelector('.scoreArea').style.display = 'block';
    // hiding question
    document.querySelector('.questionArea').style.display = 'none';


    // showing progress complete
    document.querySelector('.progress--bar').style.width = '100%';
}

function  resetEvent() {
    correctAwswers = 0;
    currentQuestion = 0;
    showQuestion();
}