
// we inicialized this variable sin order to be able to acces to Our Moralis Project
const serverUrl = "https://96kw6rjduqgc.usemoralis.com:2053/server";
const appId = "XAX3sL2V8YxOlYI0PiD1G7MyZ6CDwTmVJMEkz7sz";

//Moralis fucntion to connect with our Moralis App
Moralis.start({serverUrl,appId});


//Function that allow us to connect to our web3 Provider , in the case of the project Metamask
async function login(){

    //Assigned the Moralis user to a user variable
    let user = Moralis.User.current();

    if(!user) {

        try {
            //authenticate with a morali function
            user = await Moralis.authenticate({ signingMessage : "Authenticate "});

            //enable to connect to a web3 providr via moralis function
            await Moralis.enableWeb3();

            console.log(user);

            console.log(user.get('ethAddress'));

        }catch (error) {

            console.log(error);

        }

    }

}

// we create this function in order to be able to logout and login every time we charge the page so we can acces to every smartcontract function 
async function logOut(){

    await Moralis.User.logOut();

    console.log('LogOut');

}

//object with the variables that will allow us to get the votes for Trump
const TrumpVotes = {
     
    contractAddress: "0x8bb2e856EA6787A4A055A917175C40F4c9657B15",
    functionName: "trumpVotes",
    abi: [{"inputs":[],"name":"trumpVotes","outputs":[{"internalType":"uint256","name":"cant","type":"uint256"}],"stateMutability":"view","type":"function"}],
  
};

//object with the variables that will allow us to get the votes for Biden
const BidenVotes = {
     
    contractAddress: "0x8bb2e856EA6787A4A055A917175C40F4c9657B15",
    functionName: "bidenVotes",
    abi: [{"inputs":[],"name":"bidenVotes","outputs":[{"internalType":"uint256","name":"cant","type":"uint256"}],"stateMutability":"view","type":"function"}],
  
};

//function that using a Moralis function giving of parameter the Objects we create beforehand call the function that allow us to get the Votes for each Candidate
async function getActualVotes(){

    //fucntions that get the value in the smart contract and we assign them to local variables
    const cantVotesTrump = await Moralis.executeFunction(TrumpVotes);
    const cantVotesBiden = await Moralis.executeFunction(BidenVotes);

    //we create variables that get the wuery information that will show the votes for each candidate
    let votesTrump = document.querySelector('.votes-number-trump');
    let votesBiden = document.querySelector('.votes-number-biden');

    //we assign to the innerHTML of each wyery information their respective quantity of votes and at the same time we turn them into a decimal value insted of a hexadecimal
    votesTrump.innerHTML = parseInt(cantVotesTrump._hex,16);
    votesBiden.innerHTML = parseInt(cantVotesBiden._hex,16);
}


//Local functions that call the smart contract function ir oder to vote for each candidate following the same principal of the Previous Moralis functionExecute
async function voteTrump(){

    let options ={
        contractAddress: "0x8bb2e856EA6787A4A055A917175C40F4c9657B15",
        functionName: "vote",
        abi: [{"inputs":[{"internalType":"uint256","name":"proposal","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        params:{
            proposal: 1
        }
    }

    await Moralis.executeFunction(options);

}
async function voteBiden(){

    let options ={
        contractAddress: "0x8bb2e856EA6787A4A055A917175C40F4c9657B15",
        functionName: "vote",
        abi: [{"inputs":[{"internalType":"uint256","name":"proposal","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        params:{
            proposal: 0
        }
    }

    await Moralis.executeFunction(options);

}


//Loca Function that allow the chairman to give right to vote o another Wallet Addres via Moralis Function
async function rightToVote(){

    let inputVal = document.getElementById("walletAddress");

    let options ={
        contractAddress: "0x8bb2e856EA6787A4A055A917175C40F4c9657B15",
        functionName: "giveRightToVote",
        abi: [{"inputs":[{"internalType":"address","name":"voter","type":"address"}],"name":"giveRightToVote","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        params:{
            voter: inputVal.value
        }
    }

    await Moralis.executeFunction(options);

    inputVal.value = "";

}


//function called every time we charge the body of the HTML file so we can acces to every SmartContract function propoerly
async function charge(){

    await logOut();
    await login();

}

//set interval in order to refresh the votecount from the smartcontract everysecond
setInterval(getActualVotes,1000);  



//Give the onclick function value to ech button
document.getElementById("btn-biden").onclick = voteBiden;
document.getElementById("btn-trump").onclick = voteTrump;
document.getElementById("btn-AllowToVote").onclick = rightToVote;