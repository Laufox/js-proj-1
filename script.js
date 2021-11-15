// Finding the DOM elements needed
const btnNewGameEl = document.querySelector('#btn-new-game');
const roundTitleEl = document.querySelector('#round-title');
const roundImgEl = document.querySelector('.round-img');
const roundListEl = document.querySelector('#round-list');
const btnGuessEl = document.querySelector('#btn-guess');
const gameContainerEl = document.querySelector('.game-container');

// List of students available for the game, including a path file for their image
const students = [
    {
        name: "Lisa",
        imgSrc: "img/blueberry-small.jpg"
    },
    {
        name: "Pelle",
        imgSrc: "img/blueberry-small.jpg"
    },
    {
        name: "Johan",
        imgSrc: "img/blueberry-small.jpg"
    },
    {
        name: "Emil",
        imgSrc: "img/blueberry-small.jpg"
    },
    {
        name: "Björn",
        imgSrc: "img/blueberry-small.jpg"
    },
    {
        name: "Kajsa",
        imgSrc: "img/blueberry-small.jpg"
    },
    {
        name: "Agda",
        imgSrc: "img/blueberry-small.jpg"
    },
    {
        name: "Gunnar",
        imgSrc: "img/blueberry-small.jpg"
    }
];

let secretStudent;
let currentRoundStudents = [];
let currentRound;

// function that gives back a randomly chosen student
const getRandomStudent = function() {
    return students[Math.floor(Math.random() * students.length)];
}

// Function to reset data and begin a new game
const newGame = function() {
    currentRound = 1;
}

// Function to update data and DOM each round
const newRound = function() {
    // Clean up previous round
    currentRoundStudents = [];
    roundListEl.innerHTML = '';

    // Pick a student at random, and push it to the array for the current round
    secretStudent = getRandomStudent();
    console.log(secretStudent.name);
    currentRoundStudents.push(secretStudent);
    
    // Add students image to DOM
    roundImgEl.setAttribute('src', secretStudent.imgSrc);

    // Update the DOM with info about what round the user is on
    roundTitleEl.innerText = `Round ${currentRound} - Who is this?`;
    currentRound++;

    // Fill in the rest of the students used for the current round
    while (currentRoundStudents.length < 4) {
        // Pick a student
        let nextStudent = getRandomStudent();
        console.log("Randomly picked student", nextStudent.name);

        // Only push the chosen student to current round array if it's name is not currently in the current round array
        if (!currentRoundStudents.find( (student) => student.name === nextStudent.name )) {
            currentRoundStudents.push(nextStudent);
        }
    }

    console.log("Students this round: ", currentRoundStudents);

    // Render the current round array objects to the DOM
    currentRoundStudents.forEach( (student) => {
        roundListEl.innerHTML += `<li>${student.name}</li>`;
    } );
    
    
}

// Event listener for the button to start new game
btnNewGameEl.addEventListener ('click', () => {
    // Begin a new game
    currentRound = 1;

    // Begin a new round
    newRound();

    // Display the game interface to the user
    gameContainerEl.classList.add('show');
    
});

// Event listener for the UL
roundListEl.addEventListener('click', (e) => {
    
    // If the clicked target is an Li - element, start a new round
    if (e.target.tagName === 'LI') {
        console.log("You choose: ", e.target.innerText);
        if (e.target.innerText === secretStudent.name) {
            console.log("Correct");
        } else {
            console.log("Wrong");
        }
        newRound();
    }
    
});