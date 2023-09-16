async function getQuestions() {
    const QUESTION_COUNT = 10;
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${(QUESTION_COUNT)}&type=multiple`);
        return await response.json();
    } catch (error) {
        alert(`An error occurred while taking the questions: ${error}`);
        location.reload();
    }
}

const response = getQuestions();
window.addEventListener("load", (event) => {
    const secondsPerQuestion = 30;
    const secondsPerRead = 10;
    const choiceOptions = ['a', 'b', 'c', 'd'];
    let currentQuestionIndex = -1;
    let currentQuestion;
    let questions = [];
    let countdownTimer;
    const userAnswers = []
    const startButton = document.getElementById('start_button');
    const choiceButtonElements = choiceOptions.map(item => document.getElementById(`option_${item}`));
    const nextQuestionButtonElement = document.getElementById('next_button');
    const remainingLineElement = document.getElementById('remaining_line');
    const remainingTimeElement = document.getElementById('remaining_time');
    const questionContainer = document.getElementById('question_container');
    const tableContainer = document.getElementById('table_container');
    const answerTable = document.getElementById('answer_table');
    const startContainer = document.getElementById('start_container');
    const spinner = document.getElementById('spinner');

    response.then(e => {
        if (e.response_code === 0) {
            for (const object of e.results) {
                questions = [...questions, {
                    question: object.question, answers: shuffleArray(object.incorrect_answers.map(item => ({
                        text: item, isCorrect: false
                    })).concat([{text: object.correct_answer, isCorrect: true}]))
                }]
            }
            startButton.disabled = false;
            spinner.classList.add('hidden');
            startButton.classList.remove('hidden');
        } else {
            alert('Questions could not be drawn properly, the page is being refreshed');
            location.reload();
        }
    });

    startButton.onclick = startQuiz;
    nextQuestionButtonElement.onclick = applyChoice;

    function saveChoice() {
        const isPassAnswer = choiceButtonElements.every(item => !item.checked)

        if (isPassAnswer) {
            userAnswers.push({
                text: currentQuestion.text,
                isCorrect: null,
                correct: currentQuestion.answers.find(item => item.isCorrect).text
            })
        } else {
            choiceButtonElements.forEach((_, index) => {
                if (userAnswers.length === currentQuestionIndex) {
                    if (choiceButtonElements[index].checked) {
                        userAnswers.push({
                            ...currentQuestion.answers[index],
                            correct: currentQuestion.answers.find(item => item.isCorrect).text
                        });
                    }
                }
            })
        }
    }

    function applyChoice() {
        saveChoice();
        currentQuestion = nextQuestion();
        if (currentQuestion === null) {
            clearInterval(countdownTimer);
            endQuiz();
        }
    }


    function nextQuestion() {
        if (currentQuestionIndex !== questions.length - 1) {
            nextQuestionButtonElement.disabled = true;
            remainingLineElement.classList.remove('remainingLine');
            void remainingLineElement.offsetWidth;
            clearInterval(countdownTimer);
            choiceButtonElements.forEach(item => {
                item.checked = false;
                item.disabled = false;
            })
            currentQuestionIndex += 1;
            setQuestion(questions[currentQuestionIndex]);
            startTimer();

            if (currentQuestionIndex === questions.length - 1) {
                nextQuestionButtonElement.innerText = 'Save and Finish The Quiz';
            }

            return questions[currentQuestionIndex];
        }
        return null
    }

    function endQuiz() {
        questionContainer.remove();
        tableContainer.classList.remove('hidden');
        setTable();
    }

    function setTable() {
        userAnswers.map((item, index) => {
            const trElement = document.createElement('tr');
            trElement.innerHTML = `<td>${index + 1}) ${questions[index].question}</td>
        <td>${item.text ? item.text : "Empty"}</td>
        <td>${item.correct}</td>
        <td><div class="square mx-auto ${item.isCorrect === null ? 'empty' : item.isCorrect ? 'correct' : 'wrong'}"></div></td>`;
            answerTable.appendChild(trElement);
        });
        const trElement = document.createElement('tr');
        trElement.innerHTML = `
      <td colspan="3"></td>
      <td style="text-align: center">${userAnswers.filter(item => item.isCorrect).length}/${userAnswers.length}</td>`;
        answerTable.appendChild(trElement);
    }

    function timesEnd() {
        choiceButtonElements.forEach(item => {
            item.disabled = true;
            item.checked = false;
        });
        remainingTimeElement.innerHTML = 'Times Up !';
        setTimeout(() => {
            applyChoice();
        }, 2000);
    }

    function startTimer() {
        let remaining_seconds = secondsPerQuestion;
        remainingLineElement.classList.add('remainingLine')
        remainingTimeElement.innerHTML = `Remaining Time: ${remaining_seconds} seconds`
        countdownTimer = setInterval(() => {
            remaining_seconds -= 1;
            remainingTimeElement.innerHTML = `Remaining Time: ${remaining_seconds} seconds`
            if (remaining_seconds <= secondsPerQuestion - secondsPerRead) {
                nextQuestionButtonElement.disabled = false;
            }
            if (remaining_seconds <= 0) {
                clearInterval(countdownTimer);
                timesEnd();
            }
        }, 1000);
    }

    function setQuestion(questionObject) {
        const answers = questionObject.answers;
        document.getElementById('question').innerHTML = `${currentQuestionIndex + 1}) ${questionObject.question}`
        document.getElementById('answer_a').innerHTML = `${answers[0].text}`
        document.getElementById('answer_b').innerHTML = `${answers[1].text}`
        document.getElementById('answer_c').innerHTML = `${answers[2].text}`
        document.getElementById('answer_d').innerHTML = `${answers[3].text}`
    }

    function startQuiz() {
        startContainer.remove();
        currentQuestion = nextQuestion();
        questionContainer.classList.remove('hidden');
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

});

