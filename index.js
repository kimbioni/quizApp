const questions = [
    {
        question: 'Em qual cidade se passa a maior parte da série Friends?',
        answers: [
            {text: 'Los Angeles', correct: false},
            {text: 'Nova York', correct: true},
            {text: 'Chicago', correct: false},
            {text: 'San Francisco', correct: false}
        ]
        
    },
    {
        question: 'Qual é o nome do personagem principal de Breaking Bad?',
        answers: [
            {text: 'Jesse Pinkman', correct: false},
            {text: 'Gus Fring', correct: false},
            {text: 'Walter White', correct: true},
            {text: 'Hank Schrader', correct: false}
        ]
        
    },
    {
        question: 'Em Game of Thrones, qual é o lema da Casa Stark?',
        answers: [
            {text: '"Nós não semeamos"', correct: false},
            {text: '"Ouça-me rugir"', correct: false},
            {text: '"O inverno está chegando"', correct: true},
            {text: '"Fogo e sangue"', correct: false}
        ]
        
    },
    {
        question: 'Qual dessas séries é um spin-off de The Vampire Diaries?',
        answers: [
            {text: 'True Blood', correct: false},
            {text: 'Teen Wolf', correct: false},
            {text: 'The Originals', correct: true},
            {text: 'Buffy, a Caça-Vampiros', correct: false}
        ]
        
    },
    {
        question: 'Qual era o nome da cafeteria onde os personagens de Friends se encontravam?',
        answers: [
            {text: 'Café Central', correct: false},
            {text: 'Central Perk', correct: true},
            {text: 'Coffee House', correct: false},
            {text: 'Starbucks', correct: false}
        ]
        
    },
    {
        question: 'Qual é o nome do personagem que trabalha como agente secreto na série 24 Horas?',
        answers: [
            {text: 'Jack Bauer', correct: true},
            {text: 'Ethan Hunt', correct: false},
            {text: 'Jason Bourne', correct: false},
            {text: 'James Bond', correct: false}
        ]
        
    },
    {
        question: 'Na série Stranger Things, em que década se passa a primeira temporada?',
        answers: [
            {text: '1970', correct: false},
            {text: '1980', correct: true},
            {text: '1990', correct: false},
            {text: '1960', correct: false}
        ]
        
    },
    {
        question: 'Qual é o nome do programa fictício dentro da série 30 Rock?',
        answers: [
            {text: 'The Office', correct: false},
            {text: 'TGS with Tracy Jordan', correct: true},
            {text: 'Live!', correct: false},
            {text: 'The Newsroom', correct: false}
        ]
        
    },
    {
        question: 'Qual ator interpreta o detetive Sherlock Holmes na série britânica Sherlock?',
        answers: [
            {text: 'Martin Freeman', correct: false},
            {text: 'David Tennant', correct: false},
            {text: 'Benedict Cumberbatch', correct: true},
            {text: 'Hugh Laurie', correct: false}
        ]
        
    },
    {
        question: 'Em How I Met Your Mother, qual é o nome da personagem que Ted acaba conhecendo no final da série?',
        answers: [
            {text: 'Robin', correct: false},
            {text: 'Lily', correct: true},
            {text: 'Victoria', correct: false},
            {text: 'Tracy', correct: false}
        ]
        
    },
]

//Essa constante questions armazena um array de objetos. Cada objeto contém uma pergunta (question) e um array de respostas (answers), cada resposta tem duas propriedades: o texto da resposta (text) e um valor booleano (correct) que indica se a reposta é correta

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

//Aqui são feitos as seleções dos elementos HTML onde serão mostradas as perguntas, respostas e o botão "próxima"

let currentQuestionIndex = 0
let score = 0

//indice e pontuação do usuário

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = 'Próxima'
    showQuestion()
}

//Essa função inicializa o quiz, resetando o índice da pergunta e a pontuação. Depois, chama a função showQuestion() para exibir a primeira pergunta

function showQuestion() {

    resetState()
    //função resetState limpa as respostas anteriores
    
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
    //Para cada resposta, um botão é criado e adicionado à página, se a resposta for correta, ela ganha um atributo data-correct e por fim, quando um botão é clicado, a função selectAnswer é chamada
}

function resetState(){
    nextButton.style.display = 'none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
//Função que limpa os botões de resposta e esconde o botão 'Próxima' entre as perguntas

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
        if(isCorrect){
            selectedBtn.classList.add('correct')
            score++
        } else {
            selectedBtn.classList.add('incorrect')
        }
        //Aqui é feito a verificação se a resposta clicada é correta e marca a resposta, se for correta incrementa a pontuação

        Array.from(answerButtons.children).forEach(button =>{
            if(button.dataset.correct === 'true'){
                button.classList.add('correct')
            }
            button.disabled = true
        })
        nextButton.style.display = 'block'
        //Aqui as respostas são desativadas e a correta é destacada, por fim, exibe o botão 'Próxima' para passar para a próxima pergunta
}


function showScore(){
    resetState()
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`
    nextButton.innerHTML = 'Jogar Novamente'
    nextButton.style.display = 'block'
}

//Mostra o resultado final após o fim do quiz, e dá a opção de jogar novamente

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    } else {
        showScore()
    }
}

//Passa para a próxima pergunta se houver mais perguntas (showQuestion), caso contrário, exibe a pontuação final (showScore)


nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    } else {
        startQuiz()
    }
})

//Gerencia o comportamento do botão 'Próxima'. Se houver mais perguntas, chama handleNextButton, se o quiz terminou, reinicia com startQuiz

startQuiz()