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
         setInterval( generateChicken, 2000); 
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

  function generateChicken() {
    const enemyChicken = document.createElement("div");
    enemyChicken.classList.add("enemy-chicken");

    const randomPositionX = Math.floor(Math.random() * (gameContainer.offsetWidth - 50));
    enemyChicken.style.left = randomPositionX + "px";
    enemyChicken.style.top = "0px"; // Place the enemy chicken at the top side of the game container

    gameContainer.appendChild(enemyChicken);

    const fallInterval = setInterval(() => {
      const currentTop = parseInt(enemyChicken.style.top);
      const newTop = currentTop + 5; // Adjust the value to control the falling speed

      if (newTop >= gameContainer.offsetHeight) {
        clearInterval(fallInterval);
        enemyChicken.remove();
      } else {
        enemyChicken.style.top = newTop + "px";
      }
    }, 50); // Adjust the interval to control the falling speed
  }
    startButton.addEventListener('click', startGame);
});
