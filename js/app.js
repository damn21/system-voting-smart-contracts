let winner = false;

const cards = document.querySelector('.cards');

cards.innerHTML = getCards();

const cardButtons = document.querySelector('.card-btn');

const trumpVotes = document.querySelector('.votes-number-trump');

const bidenVotes = document.querySelector('.votes-number-biden');

cardButtons.forEach(cardButton => { 
    cardButton.addEventListener('click', (e) => {
       if (e.target.classList.contains('btn-trump')) { 
            addVote(0, 'trump',trumpVotes)
        } else { 
            addVote(1, 'biden' , bidenVotes)
        }
    })
})