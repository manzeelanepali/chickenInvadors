document.addEventListener("DOMContentLoaded", () => {
  const instructionContainer = document.querySelector(".instruction-container");
  const startButton = document.querySelector(".start-button");
  const mainContainer = document.querySelector(".main-container");
  const gameContainer = document.querySelector(".game-container");
  const mainPlayer = document.querySelector(".main-player-bird");
  const scorePlaceHolder = document.createElement("div");
  const ammoSound = new Audio("./sounds/ammoFire.wav");
  const enemyHit = new Audio("./sounds/enemyHit.mp3");
  
  let playerPositionX = 500;
  const chickeHeight = 40;
  const chickenGap = 20;
  const ammoSpeed = 10;
  const ammoWidth = 10;
  const ammoHeight = 10;
  let currentScore = 0;
  let highestScore = localStorage.getItem("highestScore") || 0;
  let gameOver = false;

  
  
  function startGame() {
    instructionContainer.style.display = "none";
    mainContainer.style.display = "block";
    showMainPlayer();
    setupKeyboardControls();
    setInterval(generateChickenGroup(), 500);
    // createBox()
    // createObstacle()
    
  }
  console.log( gameContainer.offsetWidth)
  
  function showMainPlayer() {
    mainPlayer.style.display = "block";
  }
 
  function setupKeyboardControls() {
    document.addEventListener("keydown", handleKeyPress);
  }

  function handleKeyPress(event) {
    const key = event.key;
    if (key === "ArrowLeft") {
      // Move player to the left
      playerPositionX -= 10; // Adjust the value according to your desired movement speed
      if (playerPositionX < 0) playerPositionX = 0;
    } else if (key === "ArrowRight") {
      // Move player to the right
      playerPositionX += 10; // Adjust the value according to your desired movement speed

      if (playerPositionX > 960) playerPositionX = 960;
    } else if (key === " ") {
      fireAmmo();
    }
    // Update the player's position
    mainPlayer.style.left = playerPositionX + "px";
  }


function createBox() {
  const box = document.createElement("div");
  box.classList.add("box");
  gameContainer.appendChild(box);

  // Calculate the screen height and width
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  // Generate random horizontal and vertical offsets
  const randomOffsetX = Math.floor(Math.random() * (screenWidth - 50));
  const randomOffsetY = Math.floor(Math.random() * (screenHeight - 50));

  // Set the initial position
  box.style.transform = `translate(-50px, ${randomOffsetY}px)`;

  // Animate the box
  setTimeout(() => {
    box.style.transform = `translate(${randomOffsetX}px, ${screenHeight}px)`;
  }, 1000);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// setInterval(createBox, 6000); // Generate box every 1 minute




function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// for (let i = 0; i < 5; i++) {
//   setTimeout(createBox, getRandomNumber(0, 5000)); // Random delay between 0 to 5 seconds
// }


    









function generateChickenGroup() {
  const enemyGroup = document.createElement("div");
  enemyGroup.classList.add("enemy-group");

  const numRows = 4; // Number of rows of enemy chickens

  const numChickensPerRow = [];
  for (let j = 0; j < numRows; j++) {
    numChickensPerRow.push(numRows + numRows - j - 1);
  }
 const containerWidth = 400;
  const chickenWidth = 50; // Width of each chicken
  const chickenHeight = 50; // Height of each chicken
  const chickenGap = 10; // Gap between each chicken

  const maxChickensInRow = numRows * 2 - 1; // Maximum number of chickens in a row

   // Width of the game container
  const groupWidth = maxChickensInRow * (chickenWidth + chickenGap) - chickenGap; // Width of the chicken group
console.log(groupWidth,"hey")
  const leftOffset = (containerWidth - groupWidth) / 2; // Calculate the left offset to center the chicken group

  let topOffset = 0; // Initial top offset

  for (let j = 0; j < numRows; j++) {
    const chickenRow = document.createElement("div");
    chickenRow.classList.add("enemy-row");

    const numChickensInRow = numChickensPerRow[j]; // Number of chickens in the current row

    const rowWidth = numChickensInRow * (chickenWidth + chickenGap) - chickenGap; // Width of the row

    const rowLeftOffset = (groupWidth - rowWidth) / 2; // Calculate the left offset to center the row

    for (let i = 0; i < numChickensInRow; i++) {
      const enemyChicken = document.createElement("img");
      enemyChicken.src = "hen.gif"; // Replace "hen.gif" with the path to your chicken image
      enemyChicken.classList.add("enemy-chicken");

      enemyChicken.style.position = "absolute"; // Set position to absolute
      enemyChicken.style.left = `${leftOffset + rowLeftOffset + i * (chickenWidth + chickenGap)}px`; // Set the left offset
      enemyChicken.style.top = `${topOffset}px`; // Set the top offset

      chickenRow.appendChild(enemyChicken);
    }

    enemyGroup.appendChild(chickenRow);

    topOffset += chickenHeight + chickenGap; // Increment the top offset for the next row
  }

   

    const startingLeft = -(numRows * (chickeHeight + chickenGap) - chickenGap);

  

    enemyGroup.style.left = `0px`;

     

    let left = 0;
    let top = 0;
    let direction = 1;
    const intervalId = setInterval(() => {
      




      left += 5 * direction;
      console.log("left",left)

     

      enemyGroup.style.left = `${left}px`;
      console.log(enemyGroup.offsetWidth,)
     
      // console.dir(enemyGroup   )
      // console.log(left,enemyGroup.offsetWidth,gameContainer.offsetWidth)
   
      if (left +  groupWidth> gameContainer.offsetWidth  ) {
        direction = -1; // Reverse direction when reaching the container edges
  enemyGroup.style.top = `${top}px`;
   top += 50;
        console.log( "just checking ")
       }
        
        if (left < 0 ) {
          direction = 1; 
            enemyGroup.style.top = `${top}px`;
             top += 50;// Reverse direction when reaching the container edges
          console.log( "check again")
      }
    }, 40);

    gameContainer.appendChild(enemyGroup);
  }


  

  function fireAmmo() {
    const ammo = document.createElement("div");
    ammo.classList.add("ammo");
    gameContainer.appendChild(ammo);

    const playerPositionY = mainPlayer.offsetTop;
    const ammoPositionX =
      playerPositionX + (mainPlayer.offsetWidth - ammoWidth) / 2;
    ammo.style.left = ammoPositionX + "px";
    ammo.style.top = playerPositionY - ammoHeight + "px";
    gameContainer.appendChild(ammo);

    const ammoInterval = setInterval(() => {
      let currentTop = parseInt(ammo.style.top);
      let newTop = currentTop - ammoSpeed;
      ammo.style.top = newTop + "px";
      checkCollision(ammo, ammoInterval);
    }, 5);
    // ammoSound.play();
  }

  function checkCollision(ammo, intervalId) {
    const ammoRect = ammo.getBoundingClientRect();
    const enemyChickens = document.querySelectorAll(".enemy-chicken");
    const mainPlayerRect = mainPlayer.getBoundingClientRect();

    for (const element of enemyChickens) {
      const enemyChicken = element;
      const enemyRect = enemyChicken.getBoundingClientRect();
      enemyHit.play();

      if (isColliding(ammoRect, enemyRect)) {
        gameContainer.removeChild(ammo);
        enemyChicken.parentNode.removeChild(enemyChicken);

        clearInterval(intervalId);
        increaseScore();

        break;
      }

      console.log('[app.js--[255]], mainPlayerRect',mainPlayerRect,"enemyRect",enemyRect);
      if (isColliding(enemyRect, mainPlayerRect)) {
     
        console.log('[app.js--[258]], gameOver',gameOver);
      
      }
    }

   
     if (enemyChickens.length === 0) {
    clearInterval(intervalId);
    generateChickenGroup();
  }
  }

  function isColliding(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }
  function increaseScore() {
    currentScore++;
    if (currentScore > highestScore) {
      highestScore = currentScore;
      localStorage.setItem("highestScore", highestScore);
    }
    scorePlaceHolder.textContent =
      "Score: " + currentScore + " (Highest: " + highestScore + ")";
  }

  startButton.addEventListener("click", startGame);
  scorePlaceHolder.classList.add("score-placeholder");
  scorePlaceHolder.textContent = "Score: 0 (Highest: " + highestScore + ")";
  gameContainer.appendChild(scorePlaceHolder);
});
