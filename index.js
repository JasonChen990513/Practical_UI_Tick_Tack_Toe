// contract address and abi
const contractAddress = "0xa41A97C763d8309ad1babe8F7C9E9991E8210F40";
const contractABI =[
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "metchSuccessful",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "next",
                "type": "string"
            }
        ],
        "name": "nextUesrStr",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "nextUser",
                "type": "address"
            }
        ],
        "name": "nextUser",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "queueFull",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "initPLayer",
                "type": "string"
            }
        ],
        "name": "resetUI",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "result",
                "type": "string"
            }
        ],
        "name": "showResult",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "player1",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "player2",
                "type": "address"
            }
        ],
        "name": "startGame",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string[]",
                "name": "options",
                "type": "string[]"
            }
        ],
        "name": "updateUI",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "activate",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "a",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "b",
                "type": "string"
            }
        ],
        "name": "compareStrings",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentPlayer",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getoption",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "joinGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "options",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "player1address",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "player2address",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "playerCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "restartGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "input",
                "type": "uint256"
            }
        ],
        "name": "userInput",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// declare call contract element and crate contract object
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const writeGameContract = new ethers.Contract(contractAddress, contractABI, signer);
const readGameContract = new ethers.Contract(contractAddress, contractABI, provider);
let CurrentUserAddress; //store current user address

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const joinBtn = document.getElementById("joinGame");
const waitTime = 10000;

//call initial page function 
initializePage();

//enable restart button
function enableRestart(){
    restartBtn.disabled = false;
}

// when a player takes a long time to respond, other players can restart the game
// set timer to enable restart button
function setTimer(){
    resetRtnTimer = setInterval(enableRestart, waitTime);
}

//smart contract
document.getElementById("joinGame").addEventListener('click',() => {
    joinGame();
})

//call the smart contract to join the game
async function joinGame(){
    await provider.send("eth_requestAccounts", []);
    //call contract
    try{
        await writeGameContract.joinGame();
    } catch(e){
        //catch the error message from smart contract
        err = e.data.message;
        alert(err);
    }
}

async function initializePage(){
    //get the current wallet address
    onInit();
    setTimer();

    restartBtn.addEventListener("click", restartGame);
    // read the current options array data at smart contract
    let contractOptions = await readGameContract.getoption();
    //display array content on UI
    for(let i = 0; i < contractOptions.length; i++){
        const targetCell = document.querySelector(`.cell[cellIndex="${i}"]`);
        targetCell.textContent = contractOptions[i];
    }
    //allow restart the game when the game is not playing
    if(!(await readGameContract.activate())){
        restartBtn.disabled = false;
        joinBtn.disabled = false;

    }else{
        joinBtn.disabled = true;
        restartBtn.disabled = true;
        document.getElementById("tips").textContent = "Please wait until the game finishes if you want to join";
    }
    //get current player address
    let player1address = await readGameContract.player1address();
    let player2address = await readGameContract.player2address();
    let player = await readGameContract.currentPlayer();
    //if current user are the player in this metch, allow the user to click the grid
    if(player == "X"){
        if(CurrentUserAddress == player1address.toLowerCase()){
            cells.forEach(cell => cell.addEventListener("click", cellClicked));
        }
    }else{
        if(CurrentUserAddress == player2address.toLowerCase()){
            cells.forEach(cell => cell.addEventListener("click", cellClicked));
        }
    }
    
    //set smart contract listener
    //when game start will run this function
    readGameContract.on("startGame",(message,player1address,player2address)=>{
        //according to the uesr wallet address to display the corresponding content
        if(player1address.toLowerCase() == CurrentUserAddress){
            alert(message + "\nYour Round!");
            initializeGame();
            disableBtnJoin();
        }else if(player2address.toLowerCase() == CurrentUserAddress){
            alert(message + "\nWaiting player 1");
            disableBtnJoin();
        }else{
            alert("Game already start" + "\nWaiting player 1 and 2 finish this game");
            disableBtnJoin();
        }
        setTimer();
    });

    //when new option store in to smart contract
    //update the user interface
    readGameContract.on("updateUI",(options)=>{
        for(let i = 0; i < options.length; i++){
            const targetCell = document.querySelector(`.cell[cellIndex="${i}"]`);
            targetCell.textContent = options[i];
        }
    })
    // display the result and able button when game finish
    readGameContract.on("showResult",(result)=>{
        //display the message content 
        if(result == "Draw"){
            statusText.textContent = `Draw!`;
        }else{
            statusText.textContent = `${result} wins!`;
        }
        //change the button and html content
        document.getElementById("tips").textContent = "Clikc the button to join";
        cells.forEach(cell => cell.removeEventListener("click", cellClicked));
        restartBtn.disabled = false;
        joinBtn.disabled = false;
        clearTimeout(resetRtnTimer);
    })

    //change html content when user change
    readGameContract.on("nextUesrStr",(next)=>{
        statusText.textContent = `${next}'s turn`;
    })

    //inform the user and add listener to grid when it's their turn
    //remove the listener when it is not their turn
    readGameContract.on("nextUser",(nextUser)=>{
        disableBtnJoin();
        if(nextUser.toLowerCase() == CurrentUserAddress){
            cells.forEach(cell => cell.addEventListener("click", cellClicked));
            alert("Your Round!");
        }else{
            cells.forEach(cell => cell.removeEventListener("click", cellClicked));
        }
        clearTimeout(resetRtnTimer);
        setTimer();
    })
    // reset all of the element
    readGameContract.on("resetUI",(initPLayer)=>{
        statusText.textContent = "";
        cells.forEach(cell => cell.textContent = "");
        restartBtn.disabled = false;
        joinBtn.disabled = false;
        document.getElementById("tips").textContent = "Clikc the button to join";
    })
}
// disable the button and set the message 
function disableBtnJoin(){
    restartBtn.disabled = true;
    joinBtn.disabled = true;
    document.getElementById("tips").textContent = "Please wait until the game finishes if you want to join";
}

//get the current user's wallet address
async function onInit() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account);
    CurrentUserAddress = account;

    //  window.ethereum.on('accountsChanged', function (accounts) {
    //     // Time to reload your interface with accounts[0]!
    //     console.log(accounts[0])
    //     CurrentUserAddress = accounts[0];
    //    });
}

async function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    let player = await readGameContract.currentPlayer();
    statusText.textContent = `${player}'s turn`;
}

//get user input and send to smart contract
async function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    console.log(cellIndex);
    try{
        await writeGameContract.userInput(cellIndex);
    } catch(e){
        //catch the error message and show it
        err = e.data.message;
        alert(err);
    }
}
// call the smart contract to reset game 
function restartGame(){
    writeGameContract.restartGame();
}