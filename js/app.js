const serverUrl = "https://96kw6rjduqgc.usemoralis.com:2053/server";
const appId = "XAX3sL2V8YxOlYI0PiD1G7MyZ6CDwTmVJMEkz7sz";
Moralis.start({serverUrl,appId});

async function login(){

    let user = Moralis.User.current();

    if(!user) {

        try {

            user = await Moralis.authenticate({ signingMessage : "Authenticate "});

            await Moralis.enableWeb3();

            console.log(user);

            console.log(user.get('ethAddress'));

        }catch (error) {

            console.log(error);

        }

    }

}

async function logOut(){

    await Moralis.User.logOut();

    console.log('LogOut');

}

const TrumpVotes = {
     
    contractAddress: "0x8bb2e856EA6787A4A055A917175C40F4c9657B15",
    functionName: "trumpVotes",
    abi: [{"inputs":[],"name":"trumpVotes","outputs":[{"internalType":"uint256","name":"cant","type":"uint256"}],"stateMutability":"view","type":"function"}],
  
};

const BidenVotes = {
     
    contractAddress: "0x8bb2e856EA6787A4A055A917175C40F4c9657B15",
    functionName: "bidenVotes",
    abi: [{"inputs":[],"name":"bidenVotes","outputs":[{"internalType":"uint256","name":"cant","type":"uint256"}],"stateMutability":"view","type":"function"}],
  
};

async function getActualVotes(){

    const cantVotesTrump = await Moralis.executeFunction(TrumpVotes);

    let votesTrump = document.querySelector('.votes-number-trump');

    votesTrump.innerHTML = parseInt(cantVotesTrump._hex,16);

    const cantVotesBiden = await Moralis.executeFunction(BidenVotes);

    let votesBiden = document.querySelector('.votes-number-biden');

    votesBiden.innerHTML = parseInt(cantVotesBiden._hex,16);
}

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




document.getElementById("btn-out").onclick = logOut;
document.getElementById("btn-login").onclick = login;
document.getElementById("btn-votes").onclick = getActualVotes;
document.getElementById("btn-biden").onclick = voteBiden;
document.getElementById("btn-trump").onclick = voteTrump;