const getCards = () =>{
    return candidates.map(candidate => {
        return `<div class="card">
        <img class="card-image" src="images/${candidate.id}.jpg">
        <div class="card-info">
          <div class="candidate-votes">
              <span class="votes-number-${candidate.id}">
              ${candidate.votes}</span>
              <span class="votes-text">VOTES</span>
          </div>
          <div class="line"></div>
          <div class="candidate-info">
            <span class="candidate-name">${candidate.name}</span>
            <span class="candidate-party">${candidate.party}</span>
          </div>
        </div>
        <button class="card-btn btn-${candidate.id}
        ">VOTE</button>
      </div>`
    })
}

const addVote = (index, candidate, votes) =>{
    // Increase vote by one as long as there's nota winner
    if (!winner) {
        // Increase vote by one
        candidates[index].votes++;
        // Update votes element
        votes.textContent = candidates[index].votes;
        // Check if the candidate won
        iswinner(candidate, candidates[index].votes);
    }
}


 // If candidate won, set winner variable to true
 const iswinner = (candidate, votes) => {
    if (votes === 270){
        winner = true;
        setwinnerLoser(candidate);
    }
}

const setwinnerLoser = (candidate) => { 
    if (candidate === "trump"){
        document.querySelector('.btn-trump').textContent ="WINNER";
        document.querySelector('.btn-biden').textContent
         ="LOSER";
    } else{
        document.querySelector('.btn-biden').textContent
        ="WINNER";
       document.querySelector('.btn-trump').textContent
        ="LOSER";
    }
}
