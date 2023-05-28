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
    function startGame() {
      
        instructionContainer.style.display = "none";
        mainContainer.style.display = "block";
        showMainPlayer()
        setupKeyboardControls();

        // for (let i=0;i<4;i++){
            
        // }
        setInterval( generateChickenGroup(), 1000); 
     
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



    startButton.addEventListener('click', startGame);
});
