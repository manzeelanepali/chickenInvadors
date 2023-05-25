document.addEventListener("DOMContentLoaded", () => {
    const instructionContainer = document.querySelector(".instruction-container");
    const startButton = document.querySelector(".start-button");
    const mainContainer = document.querySelector(".main-container");
    const gameContainer = document.querySelector(".game-container")
    const mainPlayer = document.querySelector(".main-player-bird")
  
    let playerPositionX = 500;
    function startGame() {
        // console.log("hey");
        instructionContainer.style.display = "none";
        mainContainer.style.display = "block";
        showMainPlayer()
        setupKeyboardControls();
    }

    function showMainPlayer(){
        console.log("check")
        mainPlayer.style.display="block"
        
    }

     function setupKeyboardControls() {
        document.addEventListener("keydown", handleKeyPress);
    }

    function handleKeyPress(event) {
        const key = event.key;
        if (key === "ArrowLeft") {
            // Move player to the left
            playerPositionX -= 10; // Adjust the value according to your desired movement speed
        } else if (key === "ArrowRight") {
            // Move player to the right
            playerPositionX += 10; // Adjust the value according to your desired movement speed
        }
        
        // Update the player's position
        mainPlayer.style.left = playerPositionX + "px";
    }
  
    startButton.addEventListener('click', startGame);
});
