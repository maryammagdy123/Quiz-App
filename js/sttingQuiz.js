import Quiz from "./Quiz.js";

export class Setting {
	constructor(category, difficulty, numOfQuestions, type) {
		this.category = document.getElementById("category");
		this.difficulty = Array.from(document.getElementsByName("difficulty"))
		this.type = document.getElementById("type")
		this.numOfQuestions = document.getElementById("numberOfQuestions")
		this.startBtn = document.getElementById("startBtn").addEventListener("click", () => {
			this.getUserData()
		})
	}


	async getUserData() {
		let category = this.category.value;
		let type = this.type.value;
		let difficulty = this.difficulty.find((input) => input.checked).value;
		let numOfQuestions = this.numOfQuestions.value;

		console.log(type)

		// validate inputs

		if (numOfQuestions > 0 && numOfQuestions <= 50) {
			const questions = await this.getQuestions(category, difficulty, numOfQuestions, type)
			document.getElementById("setting").classList.remove("show");
			document.getElementById("quiz").classList.add("show");
			const quiz = new Quiz(questions)
		}
		else {
			document.getElementById("alert1").classList.add("show")
		}
	}

	// fetching data from api
	async getQuestions(category, difficulty, numOfQuestions, type) {
		// https://opentdb.com/api.php?amount=10&category=9&difficulty=easy
		const api = await fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`);

		// destructing from object
		const { results } = await api.json()
		return results;

	}
}