//Declarari
var snake = document.querySelector('.snake');
var cap = document.querySelector('.cap');
var fruct = document.querySelector('.fruct');
var senzor = document.querySelector('.senzor');
var newGame = document.querySelector('.newGame');
var scor = document.querySelector('.score');
var over = document.querySelector('.over');
elemente = new Array();
poziti = new Array();
k = 0;
newGame.addEventListener("click", function(){
  newGame();
})

//Functii Elementare  

window.addEventListener("keydown" , function(e){
  keys = e.keyCode; 
  if(keys == 32 && game == false)
  newGame();
})

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      bottom: rect.bottom,
      right: rect.right
    };};

function keybord(){
  if((keys == 87 || keys == 38) && direction != "JOS" && direction != "SUS"){
    if(direction == "DREAPTA")
    rotate -= 90;
    if(direction == "STANGA")
    rotate += 90;
    direction = "SUS";
    cap.style.boxShadow = "#000a -0.1em -0.1em  inset,#fff 0.1em 0.1em  inset";
  }
  
   if((keys == 83 || keys == 40)  && direction != "SUS" && direction != "JOS"){
    if(direction == "DREAPTA")
    rotate += 90;
    if(direction == "STANGA")
    rotate -= 90;
    direction = "JOS";
    cap.style.boxShadow = "#000a -0.1em 0.1em  inset,#fff 0.1em -0.1em  inset";
   }
     
   if((keys == 65 || keys == 37) && direction != "DREAPTA" && direction != "STANGA"){
    if(direction == "JOS")
    rotate += 90;
    if(direction == "SUS")
    rotate -= 90;
    direction = "STANGA";
    cap.style.boxShadow = "#000a -0.1em 0.1em  inset,#fff 0.1em -0.1em  inset";
   }
  
   if((keys == 68 || keys == 39) && direction != "STANGA"  && direction != "DREAPTA"){
    if(direction == "JOS")
    rotate -= 90;
    if(direction == "SUS")
    rotate += 90;
    direction = "DREAPTA";
    cap.style.boxShadow = "#000a -0.1em -0.1em  inset,#fff 0.1em 0.1em  inset";
   }

  }
     
GameOver = (poziti,i) =>{
  var interval_id = window.setInterval(()=>{}, 99999);
  for (var j = 0; j < interval_id; j++)
  window.clearInterval(j);
  cap.style.transform = poziti[i-1] + `rotate(${rotate}deg)`;
  over.style.display = "flex";
  game = false;
}

randomFruct = () =>{
  fruct_i = Math.floor(Math.random() * 10) * 10;
  fruct_j = Math.floor(Math.random() * 10) * 10;
  mar = `translate3d(${fruct_j * 5}px, ${fruct_i * 5}px, 0px)`;
  let poz_mar = true;
  for(j = 0;j<=k;j++){
  if(poziti[i-j] == mar)
  poz_mar = false;
  }
  if(poz_mar){
    fruct.style.top = `${fruct_i}%`;
    fruct.style.left = `${fruct_j}%`;
  }else{
    randomFruct();
  }


}

//Game

newGame = () => {
  for(j = 1;j<k;j++){
    snake.removeChild(elemente[j]);
  }
  rotate = 0;
  speed = 300;
  i = 0;
  k = 1;
  game = true;
  score = 0;
  scor.innerHTML = `Score: ${score}`;
  over.style.display = "none";
  randomFruct();
  cap.style.transition = "0s";
  cap.style.boxShadow = "#000a -0.1em -0.1em  inset,#fff 0.1em 0.1em  inset";
  cap.style.transform = `translate3d(50px, 0px, 0px) rotate(0deg)`;
  setTimeout(() => {
    cap.style.transition = "0.2s linear";
  }, 50);

  Move(poziti);
  setTimeout(newElement(k,poziti),0);
  k++;
  
  setInterval(function() {
    if((getOffset(senzor).left >= getOffset(fruct).left) && (getOffset(senzor).top >= getOffset(fruct).top) && 
     (getOffset(senzor).right <= getOffset(fruct).right) && (getOffset(senzor).bottom <= getOffset(fruct).bottom))
     {
      randomFruct();
      nou = true;
      score++;
      scor.innerHTML = `Score: ${score}`
     }
      
  } ,5);

}

Move = (poziti) =>{
let left = 0;
let top = 0;
keys = null;
nou = false;
poziti[i] =`translate3d(${left}px, ${top}px, 0px)`;
i++;
direction = "DREAPTA";

setInterval(() => { 
  keybord();
  if(direction == "DREAPTA")
  left +=50;
  if(direction == "STANGA")
  left -=50;
  if(direction == "JOS")
  top +=50;
  if(direction == "SUS")
  top -=50;
  if(top > 450 || top < 0 || left > 450 || left < 0){
    GameOver(poziti,i);
  }
  else{
    poziti[i] =`translate3d(${left}px, ${top}px, 0px)`;
    for(j = 3;j<=k;j++)
      if(poziti[i] == poziti[i-j])
        game = false;
      if(game)
      { cap.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${rotate}deg)`;}
      else{
        GameOver(poziti,i);
      }
      i++;
  } 
if(nou == true)
{ 
newElement(k,poziti);
k++;
nou = false
}
 }, 200);
}

newElement = (k,poziti) => {
  elemente[k] = document.createElement("DIV");
  snake.appendChild(elemente[k]);
  elemente[k].setAttribute('class', "coada");
  elemente[k].style.transform = poziti[i-k-1];
    setInterval(() => { 
      elemente[k].style.transform = poziti[i-k-1];
     }, 200);   
}

newGame();

