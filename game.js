const ele = document.getElementById("game");
const sticksContainer = document.getElementById("sticks");
const message = document.getElementById("message");
const p=document.getElementById("player")
const p1=document.getElementById("player1")
const p2=document.getElementById("player2")


let totalSticks = 10;
let n=totalSticks;
let currentPlayer = 1; // Player 1 starts
let pickDiv; // Div to hold the pick buttons
let stickElements = []; // Array to store stick elements for color change

function displaySticks() {
    sticksContainer.innerHTML = ""; // Clear previous sticks
    stickElements = []; // Reset the array of stick elements

    for (let i = 0; i < totalSticks; i++) {
        const stick = document.createElement("div");
        stick.className = "stick";
        // const stick = document.createElement("span");
        // stick.className = "stick";

        sticksContainer.appendChild(stick);
        stickElements.push(stick); // Store the stick element for later use
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    message.textContent = `Player ${currentPlayer}'s turn!`;
}

function checkGameOver() {
    if (totalSticks <= 0) {
        const looser = currentPlayer === 1 ? 2 : 1;
        const winner=currentPlayer;
        message.textContent = `Player ${looser} Lost!`;
        message2.textContent = `Player ${winner} Wins!`;
        ele.disabled = false; // Re-enable the start button to allow a new game
        totalSticks = 0; // Prevent negative stick count
        return true;
    }
    return false;
}

function pickSticks(picked,currentPlayer) {
    // Mark the last picked sticks as taken by changing their color
    for (let i = n-totalSticks; i < n-totalSticks+picked; i++) {
        if(currentPlayer==1)
            stickElements[i].style.backgroundColor = "gray"; // Mark the stick as taken
        else
            stickElements[i].style.backgroundColor = "blue"; // Mark the stick as taken
    }
    totalSticks -= picked;
    
    if (!checkGameOver()) {
        switchPlayer();
    }
}

ele.addEventListener('click', () => {
    // Reset game state
    totalSticks = 10;
    currentPlayer = 1;
    displaySticks();
    message.textContent = `Player ${currentPlayer}'s turn!`;
    message2.textContent = "";
    ele.disabled = true; // Disable start button after game starts
    p.textContent="-Brown color represents remaining sticks in game";
    p1.textContent="-gray color represents stickes taken by player 1";
    p2.textContent="-blue color represents stickes taken by player 1";

    // Remove any existing pick buttons (if they exist from a previous game)
    if (pickDiv) {
        document.body.removeChild(pickDiv);
    }

    // Create new buttons for players to pick sticks
    pickDiv = document.createElement("div");
    const pick1 = document.createElement("button");
    const pick2 = document.createElement("button");

    pick1.textContent = "Pick 1 Stick";
    pick2.textContent = "Pick 2 Sticks";

    pick1.addEventListener('click', () => {
        if (totalSticks >= 1) pickSticks(1,currentPlayer);
    });

    pick2.addEventListener('click', () => {
        if (totalSticks >= 2) pickSticks(2,currentPlayer);
    });

    pickDiv.appendChild(pick1);
    pickDiv.appendChild(pick2);
    document.body.appendChild(pickDiv);
});
