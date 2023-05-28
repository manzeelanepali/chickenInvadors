document.addEventListener("DOMContentLoaded", () => {
    const instructionContainer = document.querySelector(".instruction-container");
    const startButton = document.querySelector(".start-button");
    const mainContainer = document.querySelector(".main-container");
    const gameContainer = document.querySelector(".game-container")
    const mainPlayer = document.querySelector(".main-player-bird")
  
    let playerPositionX = 500;
    // let currentOpposite = false ;
    const chickeHeight =40;
   
    const chickenGap =20;
    // let intervalId;

   const  ammoSpeed = 10;
   const ammoWidth=10;
   const ammoHeight =10;



    function startGame() {
      
        instructionContainer.style.display = "none";
        mainContainer.style.display = "block";
        showMainPlayer()
        setupKeyboardControls();
        setInterval( generateChickenGroup(), 1000);
        
        setInterval(fireAmmo, 200)
       
     
    }

    function showMainPlayer(){
       
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
            if(playerPositionX<0)playerPositionX=0;
           
        } else if (key === "ArrowRight") {
            // Move player to the right
            playerPositionX += 10; // Adjust the value according to your desired movement speed
             
               if(playerPositionX>960)playerPositionX=960;
        }
        else if (key === " "){
            fireAmmo();
        }
        
        // Update the player's position
        mainPlayer.style.left = playerPositionX + "px";
    }



function generateChickenGroup() {
  const enemyGroup = document.createElement("div");
  enemyGroup.classList.add("enemy-group");

  const numRows = 4; // Number of rows of enemy chickens
  const numChickensPerRow = 16; // Number of enemy chickens in each row
 
  
  

  for(let j = 0 ; j< numRows ;j++){

const chickenRow = document.createElement("div");
      chickenRow.classList.add("enemy-row");

  for (let i = 0; i < numChickensPerRow; i++) {
        const enemyChicken = document.createElement("img");
        enemyChicken.src = "hen.gif"; // Replace "hen.gif" with the path to your chicken image
        enemyChicken.classList.add("enemy-chicken");

        chickenRow.appendChild(enemyChicken);
      }


      enemyGroup.appendChild(chickenRow);
  }



 

enemyGroup.style.top= - (numRows*( chickeHeight+chickenGap)-chickenGap) + "px"

   


 setInterval( ()=>{let currentTop = parseInt(enemyGroup.offsetTop)
 
   let newTop = currentTop + 5
   enemyGroup.style.top = newTop+ "px"},500

 )
 


  gameContainer.appendChild(enemyGroup);
}



 function fireAmmo() {
    const ammo = document.createElement("div");
    ammo.classList.add("ammo");
    gameContainer.appendChild(ammo);

    const playerPositionY = mainPlayer.offsetTop;
    const ammoPositionX = playerPositionX + (mainPlayer.offsetWidth - ammoWidth) / 2;
    ammo.style.left = ammoPositionX + "px";
    ammo.style.top = playerPositionY - ammoHeight + "px";
    gameContainer.appendChild(ammo);

    const ammoInterval = setInterval(() => {
      let currentTop = parseInt(ammo.style.top);
      let newTop = currentTop - ammoSpeed;
      ammo.style.top = newTop + "px";
      checkCollision(ammo, ammoInterval);
    }, 50);
}


  function checkCollision(ammo, intervalId) {
    const ammoRect = ammo.getBoundingClientRect();
    // console.log( "ammocheck ", ammoRect)
    const enemyChickens = document.querySelectorAll(".enemy-chicken");

    for (let i = 0; i < enemyChickens.length; i++) {
      const enemyChicken = enemyChickens[i];
      const enemyRect = enemyChicken.getBoundingClientRect();

      if (isColliding(ammoRect, enemyRect)) {
        gameContainer.removeChild(ammo);
        gameContainer.removeChild(enemyChicken);
        clearInterval(intervalId);
        break;
      }
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


    startButton.addEventListener('click', startGame);
});