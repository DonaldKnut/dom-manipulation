const movieOptionsDisplay = document.querySelector('.popup__section');
const userInputs = movieOptionsDisplay.querySelectorAll('input');
// const addMovieModal = document.body.children[1];
const button = document.querySelector('.button');
const displayOptions = document.querySelector('.visible');
const backDrop = document.querySelector('.backdrop')
const cancelBtn = document.getElementById('delete-modal');
const popUp = document.querySelector('.popup');
const addMovieBtn = document.querySelector('.btn-success');
const popUpCloseBtn = document.getElementById('closeOptionBtn');
const closePopUpBackdrop = document.querySelector('.popup-backdrop');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.querySelector('.modal-card');
const affirmativeButton = document.querySelector('#affirm-deletion__key');



// console.log(userInputs);
const closeWarningBtn = () => {
    popUp.style.display = 'none';
};



const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none'; 
    }
};

const clearMovieInput = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
};

const movies = [];

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    if (titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
    ) {
        popUp.style.display = 'block';
        clearMovieInput();
        return;
    }
    const newMovie = {
        id: `${Math.random().toString}`,
        title: `${titleValue}`,
        image: `${imageUrlValue}`,
        rating: `${ratingValue}`,
    };
    
    movies.push(newMovie);
    console.log(movies);
    removeWarningPopUpDisplay();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};


const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML =    `
        <div class ="movie-element__image">
                <img src="${imageUrl} alt="${title}">
        </div>
        <div class ="movie-element__info">
                <h2>${title}</h2>
                <p>${rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.querySelector('#movie-list');
    listRoot.append(newMovieElement);
};



// const movieBox = document.querySelector('.movie-element');


// movieBox.addEventListener('click', function warning () {
//     const warningDiv = document.querySelector('.modal-card');
//     if (warningDiv - 1) {
//             warningDiv.style.display = 'block';
//     }
// })

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies){
            if (movie.id === movieId){
                    break;
            }
            movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.querySelector('#movie-list');
    listRoot.children[movieIndex].remove();
    updateUI();
};




const deleteMovieHandler = (movieId) => {
   deleteMovieModal.classList.add('visible');
   backDrop.style.display = 'block';
   console.log(movieId);
   updateUI();
};


button.addEventListener('click', function removeModal (){
    backDrop.style.display = 'block';
    movieOptionsDisplay.style.display = 'block';
})


function removeWarningPopUpDisplay(){
    backDrop.style.display = 'none';
    movieOptionsDisplay.style.display = 'none';
    clearMovieInput();
}



const noButton = document.getElementById("delete-pop__up");

const closeDeletePopUpDisplay = () => {
    deleteMovieModal.classList.toggle('visible');
    backDrop.style.display = "none";
};


const deleteConfirmation = () => {
    let movieIndex = 0;
    const listRoot = document.querySelector('#movie-list');
    listRoot.children[movieIndex].remove();
    deleteMovieModal.classList.toggle('visible');
    backDrop.style.display = 'none';
    const modalCard = document.getElementById('delete-modal__card');
    if (movies.length < 1) {
        entryTextSection.style.display = 'none';
    }
}



// const backDropExitHandler = () => {
//         backDrop.style.display = "none";
//         deleteMovieModal.style.display = 'none';
//         movieOptionsDisplay.style.display = 'none';
// }


// backDrop.addEventListener('click', backDropExitHandler);
addMovieBtn.addEventListener('click', addMovieHandler);
popUpCloseBtn.addEventListener('click', closeWarningBtn);
closePopUpBackdrop.addEventListener('click', closeWarningBtn);
cancelBtn.addEventListener('click', removeWarningPopUpDisplay);
noButton.addEventListener('click', closeDeletePopUpDisplay);
affirmativeButton.addEventListener('click', deleteConfirmation);