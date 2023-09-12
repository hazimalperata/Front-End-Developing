const QUESTION_COUNT = 10;
let CURRENT_QUESTION_NUMBER = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let QUESTIONS = []

async function getQuestions() {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${QUESTION_COUNT}&type=multiple`);
        return await response.json();
    } catch (error) {
        console.error("Soruları çekerken bir hata oluştu: ", error);
    }
}

const response = getQuestions();

window.addEventListener("load", (event) => {
    // document.getElementById('answer_container').addEventListener('click', undefined);

    response.then(e => {
        if (e.response_code === 0) {
            for (const object of e.results) {
                QUESTIONS = [...QUESTIONS, {
                    question: object.question,
                    answers: object.incorrect_answers.map(item => ({
                        text: item, isCorrect: false
                    })).concat([{text: object.correct_answer, isCorrect: true}])
                }]
            }
        } else {

        }
    })
});


function startQuiz() {
    CURRENT_QUESTION_NUMBER += 1;
    setQuestion(QUESTIONS[CURRENT_QUESTION_NUMBER - 1]);
    document.getElementById('start_container').remove();
    document.getElementById('question_container').classList.remove('hidden');
}

function nextQuestion() {

}

function endQuiz() {

}

function setQuestion(questionObject) {
    const shuffleAnswers = shuffleArray(questionObject.answers)
    document.getElementById('question').innerText = `${CURRENT_QUESTION_NUMBER}) ${questionObject.question}`
    document.getElementById('answer_a').innerText = `${shuffleAnswers[0].text}`
    document.getElementById('answer_b').innerText = `${shuffleAnswers[1].text}`
    document.getElementById('answer_c').innerText = `${shuffleAnswers[2].text}`
    document.getElementById('answer_d').innerText = `${shuffleAnswers[3].text}`
}
