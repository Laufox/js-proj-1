// Finding the DOM elements needed
const btnNewGameEl = document.querySelector('#btn-new-game');
const roundTitleEl = document.querySelector('#round-title');
const roundImgEl = document.querySelector('.round-img');
const roundListEl = document.querySelector('#round-list');
const btnAbortEl = document.querySelector('#btn-abort');
const gameContainerEl = document.querySelector('.game-container');
const gameResultEl = document.querySelector('#game-result');

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

let secretStudent;
let currentGameResult = [];
let currentGameStudents = [];
let currentRoundStudents = [];
let currentRound = 0;
let score = 0;
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

// function that gives back a randomly chosen student
const getRandomStudent = function() {
    return students[Math.floor(Math.random() * students.length)];
}

// Function to reset data and begin a new game
const newGame = function() {
	currentGameStudents = [...students];
	arrayShuffle(currentGameStudents);
    currentRound = 0;
    score = 0;
	currentGameResult = [];
	gameResultEl.innerHTML = '';
	gameContainerEl.classList.remove('hide');
}

// Function to update data and DOM each round
const newRound = function() {
    // Clean up previous round
    currentRoundStudents = [];
    roundListEl.innerHTML = '';

    // Pick a student at random, and push it to the array for the current round
    secretStudent = currentGameStudents.pop();
    console.log("Chosen: ", secretStudent.name);
    currentRoundStudents.push(secretStudent);
    
    // Add students image to DOM
    roundImgEl.setAttribute('src', secretStudent.image);

    // Update the DOM with info about what round the user is on
    
    roundTitleEl.innerText = `Round ${currentRound + 1} - Who is this?`;

    // Fill in the rest of the students used for the current round
    while (currentRoundStudents.length < 4) {
        // Pick a student
        let nextStudent = getRandomStudent();
        //console.log("Randomly picked student", nextStudent.name);

        // Only push the chosen student to current round array if it's name is not currently in the current round array
        if (!currentRoundStudents.find( (student) => student.name === nextStudent.name )) {
            currentRoundStudents.push(nextStudent);
        }
    }

    // Randomise order of selected students
    arrayShuffle(currentRoundStudents);

    // Render the current round array objects to the DOM
    currentRoundStudents.forEach( (student) => {
        roundListEl.innerHTML += `<li>${student.name}</li>`;
    } );
    
}

const renderResult = function() {
	currentGameResult = currentGameResult.filter( (round) => {
		return round.userGuess !== round.name;
	});

	console.log(currentGameResult);
	currentGameResult = currentGameResult.map( (round) => {
		return `<img src="${round.image}"><p>You guessed: ${round.userGuess} but the correct name is ${round.name}</p>`
	} );

	gameResultEl.innerHTML = `<p>Game Finished. You got ${score} out of ${currentRound} points</p>`;

	if (previousGameScore >= 0) {
		if (previousGameScore > score) {
			gameResultEl.innerHTML += `<p>You did worse(${score} points) than your previous(${previousGameScore} points) game</p>`;
		}else {
			gameResultEl.innerHTML += `<p>You did better(${score} points) than your previous(${previousGameScore} points) game</p>`;
		}
	}
	previousGameScore = score;

	currentGameResult.forEach ( (item) => {
		gameResultEl.innerHTML += item;
	} );
	gameContainerEl.classList.add('hide');
}

// Event listener for the button to start new game
btnNewGameEl.addEventListener ('click', () => {
	
	// Begin a new game
	newGame();

	// Begin a new round
	newRound();
    
});

// Event listener for the UL
roundListEl.addEventListener('click', (e) => {
    
    // If the clicked target is an Li - element, start a new round
    if (e.target.tagName === 'LI') {
        console.log("You choose: ", e.target.innerText);
		currentRound++;
		currentGameResult.push(
		{
			image: secretStudent.image,
			name: secretStudent.name,
			userGuess: e.target.innerText
		});
		//console.log(currentGameResult[currentGameResult.length-1]);
		// If the clicked Li corresponds with the image, increase the score
        if (e.target.innerText === secretStudent.name) {
            score++;
            console.log("Correct - ", score);
            
        } else {
            console.log("Wrong");
        }

		// If the current round number is the same as lenth of student array, finished the game
        if (currentRound === students.length) {
			
            console.log(`Game finished. You got ${score} out of ${currentRound} points`);
			renderResult();
			
        } else {
            newRound();
        }
        
    }
    
});

btnAbortEl.addEventListener('click', () => {
	renderResult();
});

// Begin a new game
newGame();

// Begin a new round
newRound();