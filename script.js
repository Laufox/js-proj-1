// Finding the DOM elements needed
const btnStopStart = document.querySelector('.btn-stop-game');

const gameContainerEl = document.querySelector('.game-container');
const gameContainerHeadingEl = document.querySelector('.game-container h2');
const gameContainerImgEl = document.querySelector('.game-container img');
const gameContainerList = document.querySelector('.game-container ul');

const resultsContainerEl = document.querySelector('.results-container');
const resultInfoEl = document.querySelector('.result-info');
const btnShowWrongAnswersEl = document.querySelector('#btn-show-wrong-answers');
const wrongGuessesEl = document.querySelector('.wrong-guesses');

// List of students available for the game, including a path file for their image
const students = [
	{
		"name" : "Adi Dzocaj",
		"image": "assets/images/students/adi-dzocaj.jpg",
	},
	{
		"name" : "Alexander Bergquist",
		"image": "assets/images/students/alexander-bergquist.jpg",
	},
	{
		"name" : "Alexander Kocman",
		"image": "assets/images/students/alexander-kocman.jpg",
	},
	{
		"name" : "Benjamin Benson",
		"image": "assets/images/students/benjamin-benson.jpg",
	},
	{
		"name" : "Benjamin Tsubarah",
		"image": "assets/images/students/benjamin-tsubarah.jpg",
	},
	{
		"name" : "Calle Nilsson",
		"image": "assets/images/students/calle-nilsson.jpg",
	},
	{
		"name" : "Chikage Takahashi Molander",
		"image": "assets/images/students/chikage-takahashi-molander.jpg",
	},
	{
		"name" : "Daniel Be",
		"image": "assets/images/students/daniel-be.jpg",
	},
	{
		"name" : "Daniel Carlsson",
		"image": "assets/images/students/daniel-carlsson.jpg",
	},
	{
		"name" : "Elin Ahlgren",
		"image": "assets/images/students/elin-ahlgren.jpg",
	},
	{
		"name" : "Emma Käck",
		"image": "assets/images/students/emma-kack.jpg",
	},
	{
		"name" : "Eric Ståhl",
		"image": "assets/images/students/eric-stahl.jpg",
	},
	{
		"name" : "Frans Gustavson Påsse",
		"image": "assets/images/students/frans-gustavson-passe.jpg",
	},
	{
		"name" : "Glafira Veretennikova",
		"image": "assets/images/students/glafira-veretennikova.jpg",
	},
	{
		"name" : "Gustaf Grönlund",
		"image": "assets/images/students/gustaf-gronlund.jpg",
	},
	{
		"name" : "Hanna Håkanson",
		"image": "assets/images/students/hanna-hakanson.jpg",
	},
	{
		"name" : "Heidi Sjöberg",
		"image": "assets/images/students/heidi-sjoberg.jpg",
	},
	{
		"name" : "Hugo Carzborn",
		"image": "assets/images/students/hugo-carzborn.jpg",
	},
	{
		"name" : "Jesper Kling",
		"image": "assets/images/students/jesper-kling.jpg",
	},
	{
		"name" : "Johan Ranestam",
		"image": "assets/images/students/johan-ranestam.jpg",
	},
	{
		"name" : "Johanna Bäckström",
		"image": "assets/images/students/johanna-backstrom.jpg",
	},
	{
		"name" : "Johanna Jönsson",
		"image": "assets/images/students/johanna-jonsson.jpg",
	},
	{
		"name" : "Jona Torsson",
		"image": "assets/images/students/jona-torsson.jpg",
	},
	{
		"name" : "Josefine Ahlstedt",
		"image": "assets/images/students/josefine-ahlstedt.jpg",
	},
	{
		"name" : "Julia Jespersdotter Högman",
		"image": "assets/images/students/julia-jespersdotter-hogman.jpg",
	},
	{
		"name" : "Julia Nemell",
		"image": "assets/images/students/julia-nemell.jpg",
	},
	{
		"name" : "Linus Lindberg",
		"image": "assets/images/students/linus-lindberg.jpg",
	},
	{
		"name" : "Malin Olsson",
		"image": "assets/images/students/malin-olsson.jpg",
	},
	{
		"name" : "Maria Haara-Lundhammar",
		"image": "assets/images/students/maria-haara-lundhammar.jpg",
	},
	{
		"name" : "Maria Lövgren",
		"image": "assets/images/students/maria-lovgren.jpg",
	},
	{
		"name" : "Nikola Dimitrijoski",
		"image": "assets/images/students/nikola-dimitrijoski.jpg",
	},
	{
		"name" : "Paulina Kiendys",
		"image": "assets/images/students/paulina-kiendys.jpg",
	},
	{
		"name" : "Raymond Lam",
		"image": "assets/images/students/raymond-lam.jpg",
	},
	{
		"name" : "Robin Karlsson",
		"image": "assets/images/students/robin-karlsson.jpg",
	},
	{
		"name" : "Sara Almqvist",
		"image": "assets/images/students/sara-almqvist.jpg",
	},
	{
		"name" : "Tim Nilsson",
		"image": "assets/images/students/tim-nilsson.jpg",
	},
	{
		"name" : "Tirapat Sukjit",
		"image": "assets/images/students/tirapat-sukjit.jpg",
	},
	{
		"name" : "Tobias Silfverberg",
		"image": "assets/images/students/tobias-silfverberg.jpg",
	},
	{
		"name" : "Wiktoria Dobrzewinska",
		"image": "assets/images/students/wiktoria-dobrzewinska.jpg",
	},
];

// Array that will hold all student objects that has not yet been picked as a "secret student" during a game
let currentGameStudents = [];
// Variable that contains the student object that the user needs to guess each round
let secretStudent;
// Array that holds information about every round the user has played during a game
let currentGameResult = [];
// Array of studentobjects that will be displayed to the user as guessable names
let currentRoundStudents = [];
// Score of the previous game
let previousGameScore = -1;

// Function that shuffles elements of an array by random
const arrayShuffle = function(arr) {
     for (let i = arr.length -1; i > 0; i--) {
       let j = Math.floor(Math.random() * (i + 1));
       let temp = arr[i];
       arr[i] = arr[j];
       arr[j] = temp;
     }    
 }

// Function to reset data and begin a new game
const newGame = function() {
	// Get a copy of students array for the new game
	currentGameStudents = [...students];
	// Randomise student array for the new game
	arrayShuffle(currentGameStudents);
	// Empty current game result array
	currentGameResult = [];
	// Empty DOM element content
	resultInfoEl.innerHTML = '';
	wrongGuessesEl.innerHTML = '';
	// Show the DOM game container element, and hide the DOM result element
	gameContainerEl.classList.remove('hide');
	resultsContainerEl.classList.remove('show-f');
	btnShowWrongAnswersEl.classList.remove('hide');
	wrongGuessesEl.classList.remove('show');
}

// Function to update data and DOM each round
const newRound = function() {
    // Clean up previous round
    currentRoundStudents = [];
    gameContainerList.innerHTML = '';

    // Remove the last student object in the current game array, and put it in the current round array
    secretStudent = currentGameStudents.pop();
    currentRoundStudents.push(secretStudent);
    
    // Add student image to DOM
    gameContainerImgEl.setAttribute('src', secretStudent.image);

    // Update the DOM with info about what round the user is on 
    gameContainerHeadingEl.innerText = `Round ${currentGameResult.length + 1} - Who is this?`;

    // Fill in the rest of the students used for the current round
    while (currentRoundStudents.length < 4) {
        // Get a random student object from the students array
        let nextPossibleStudent = students[Math.floor(Math.random() * students.length)];

        // Only push the chosen student to current round array if the name is not already in the current round array
        if (!currentRoundStudents.find( (student) => student.name === nextPossibleStudent.name )) {
            currentRoundStudents.push(nextPossibleStudent);
        }
    }

    // Randomise order of selected students
    arrayShuffle(currentRoundStudents);

    // Render the current round array objects to the DOM
    currentRoundStudents.forEach( (student) => {
        gameContainerList.innerHTML += `<li>${student.name}</li>`;
    } );
    
}

// Function to calculate and display the results after finished game
const renderResult = function() {
	// Setting the length of current game result array as the total number of rounds played
	const numOfRounds = currentGameResult.length;
	// Calculating score by length of a filtered current gam result array containing only correct answers
	const score = currentGameResult.filter( (round) => {
		return round.userGuess === round.name;
	} ).length;

	// Filter the game result array to only contain wrong guesses
	currentGameResult = currentGameResult.filter( (round) => {
		return round.userGuess !== round.name;
	});

	// Manipulate the game result array so that each elemnt is an html snippet to be sent to DOM
	currentGameResult = currentGameResult.map( (round) => {
		return `<div class="wrong-guesses-wrapper"><img src="${round.image}"><p>You guessed: ${round.userGuess} but the correct name is ${round.name}</p></div>`
	} );
	
	// Displaying the result array to DOM a single string
	wrongGuessesEl.innerHTML = currentGameResult.join('');

	// Display different messages to the user depending on the score
	if (numOfRounds === 0) {
		resultInfoEl.innerHTML = `<p>Are you not even gonna try? No rounds played. Press the button above to start a new game.</p>`;
		btnShowWrongAnswersEl.classList.add('hide');
	} else if (score === 0) {
		resultInfoEl.innerHTML = `<p>Unfortunately you did not got a single one correct. <br>Score: ${score}/${numOfRounds} </p>`;
	} else if (score === numOfRounds) {
		resultInfoEl.innerHTML = `<p>Congratulations! You got a perfect score, all ${score} correct!</p>`;
		btnShowWrongAnswersEl.classList.add('hide');
	} else {
		resultInfoEl.innerHTML = `<p>Thanks for playing! You got ${score} out of ${numOfRounds} points.</p>`;
	}

	// Inform the user if the score was better or worse than the previous game
	if (previousGameScore >= 0) {
		if (previousGameScore > score) {
			resultInfoEl.innerHTML += `<p>You got a lower score (${score} points) than your previous game (${previousGameScore} points).</p>`;
		}else if (previousGameScore < score){
			resultInfoEl.innerHTML += `<p>You got a higher score (${score} points) than your previous game (${previousGameScore} points).</p>`;
		}
	}

	// Set this round score as previous score for future games
	previousGameScore = score;
	
	// Show the html container for the result, and hide the container for the game
	resultsContainerEl.classList.add('show-f');
	gameContainerEl.classList.add('hide');
}

// Event listener for the UL element
gameContainerList.addEventListener('click', (e) => {
    
    // If the clicked target is an Li element, update info about the current round
    if (e.target.tagName === 'LI') {
		// Add information about the correct student and what the user guessed, to the current game result array
		currentGameResult.push(
		{
			image: secretStudent.image,
			name: secretStudent.name,
			userGuess: e.target.innerText
		}
		);

		// If the current round number is the same as lenth of student array, finish the game
        if (currentGameResult.length === students.length) {
			// Change button text and style
            btnStopStart.classList.add('btn-start-game');
			btnStopStart.classList.remove('btn-stop-game');
			btnStopStart.innerText = "Start New Game";
			// Call function to calculate and display the results
			renderResult();
			
        } else {
			// Start a new round
            newRound();
        }    
    }
    
});

// Prevent the user from right-clicking on an image to get the name
gameContainerImgEl.addEventListener('contextmenu', (e) => {
	e.preventDefault();
});

// Event listener for clicks on the start new game & give up button
btnStopStart.addEventListener('click', () => {
	// If the button currently has the class "btn-stop-game"
	if (btnStopStart.classList.contains('btn-stop-game')) {
		// Change button text and style to fit the "start game" style
		btnStopStart.classList.add('btn-start-game');
		btnStopStart.classList.remove('btn-stop-game');
		btnStopStart.innerText = "Start New Game";
		// Call the function to finish the game and render result
		renderResult();
	// Otherwise, reverse the style changes and begin a new game
	} else {
		btnStopStart.classList.add('btn-stop-game');
		btnStopStart.classList.remove('btn-start-game');
		btnStopStart.innerText = "Give Up";

		// Begin a new game
		newGame();

		// Begin a new round
		newRound();
	}
	
});

// Eventlistener for the button hiding info about wrong guesses
btnShowWrongAnswersEl.addEventListener('click', () => {
	// If the container for wrong guesses does not have the "show" class, add it
	// Otherwise, remove it
	wrongGuessesEl.classList.toggle('show');
});

// Begin a new game
newGame();

// Begin a new round
newRound();