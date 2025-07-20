function decodeHTMLEntities(text) {
	let txt = document.createElement("textarea");
	txt.innerHTML = text;
	return txt.value;
}

export default class Quiz {
	constructor(questions) {
		this.questions = questions;
		console.log(questions)
		this.totalQuesNum = questions.length;
		this.currentQuestIndex = 0;
		this.score = 0;
		this.displayQuestion();
		this.nextBtn = document.getElementById("next")
		this.nextBtn.addEventListener("click", () => {

			this.getNextQuestion()

		})

		this.tryAgainBtn = document.getElementById("tryAgainBtn")
		this.tryAgainBtn.addEventListener("click", () => {
			window.location.reload()
		})
	}


	// dispalying question and answers
	displayQuestion() {
		document.getElementById("Correct").classList.remove("show");
		document.getElementById("inCorrect").classList.remove("show");

		document.getElementById("currentQuestion").innerHTML = this.currentQuestIndex + 1;
		document.getElementById("totalNumberOfQuestions").innerHTML = this.totalQuesNum;
		const currentQuestion = this.questions[this.currentQuestIndex];
		document.getElementById("question").innerHTML = currentQuestion.question;

		let allAnswers = [...currentQuestion.incorrect_answers.map(decodeHTMLEntities)];
		let correct = decodeHTMLEntities(currentQuestion.correct_answer);
		let correctIndex = Math.floor(Math.random() * (allAnswers.length + 1));
		allAnswers.splice(correctIndex, 0, correct);
		console.log(allAnswers)

		let temp = ''
		allAnswers.forEach((answer, i) => {
			temp += `
          <li class="my-3 animate__animated">
            <div class="d-flex align-items-center">
              <input type="radio" name="answer" value="${answer}" data-answer="${answer}" />
              <div class="state p-success-o">
                <label class="m-0 p-2">${answer}</label>
              </div>
            </div>
          </li>
      `;
		});
		document.getElementById("rowAnswer").innerHTML = temp;
	}
	// checking the answer
	checkAnswer(selectedAnswer, currentQuestion) {
		const correctAnswer = decodeHTMLEntities(currentQuestion.correct_answer);
		if (selectedAnswer.trim() === correctAnswer.trim()) {

			document.getElementById("Correct").classList.add("show");
			document.getElementById("inCorrect").classList.remove("show");
			this.score++;
			console.log("Correct! Score:", this.score);

		} else {
			console.log("Wrong.");
			document.getElementById("inCorrect").classList.add("show");
			document.getElementById("Correct").classList.remove("show");
		}
	}


	// moving to the next question
	getNextQuestion() {
		let selectedAnswer = document.querySelector("[name='answer']:checked")?.dataset.answer;

		if (selectedAnswer) {

			document.getElementById("alert").classList.remove("show");
			const currentQuestion = this.questions[this.currentQuestIndex];


			this.checkAnswer(selectedAnswer, currentQuestion);
			this.currentQuestIndex++;


			if (this.currentQuestIndex === this.questions.length) {
				document.getElementById("finish").classList.add("show");
				document.getElementById("quiz").classList.remove("show");
				document.getElementById("score").innerHTML = this.score;
			} else {
			
				this.displayQuestion();
			}

		}
		else {
			document.getElementById("alert").classList.add("show");
		}
	}




}


