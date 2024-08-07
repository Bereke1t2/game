var correcteAns=[];
var level = 0,checkerIndex=0;
const body =document.body;
var textArea = document.querySelector('#level-title');

var color =["green","red","yellow","blue"];


function makeSound(sound){
    var voice = new Audio(`./sounds/${sound}.mp3`);
    voice.play();
 }

 // the animator one
 function animate(id){
      document.querySelector(`#${id}`).classList.add("pressed");

      setTimeout(function(){
        document.querySelector(`#${id}`).classList.remove("pressed");
      },100)

 }
//randome number generator function
function randomNum(){
  return Math.floor(Math.random()*4);
}


document.addEventListener("keypress",newGame)

function newGame(){
  reSet();
  body.classList.remove('game-over');
  startGame();
}


function startGame(){
    var number = randomNum();
    setTimeout(()=>{
      correcteAns.push(number);
      makeSound(color[number]);
      animate(color[number]);
      level++;
      textArea.textContent = `level: ${level}`;
    },500);
    
}
function reSet(){
  level=0;
  checkerIndex = 0;
  correcteAns = [];
}
function gameOver(){
  textArea.textContent = 'game over!'
  body.classList.add("game-over");
  body.classList.add("pressed");
  makeSound('wrong');
  setTimeout(()=>{
    body.classList.remove("pressed");
  },150)
  setTimeout(()=>{
   
    body.classList.remove("game-over");
    textArea.textContent  =  'Press A Key to Start';
  },1000)
  
  reSet();
}
function check(id){
  if(color[correcteAns[checkerIndex]]==id)checkerIndex++;
  else gameOver();
  if(level==checkerIndex && level!=0){
    checkerIndex=0;
    startGame();
  }
  
}
document.querySelectorAll(".btn").forEach(element=>{
  element.addEventListener('click',
    event=>{
      makeSound(event.currentTarget.id);
      animate(event.currentTarget.id);
      check(event.currentTarget.id);
    
})
})



