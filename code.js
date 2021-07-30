var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

// Create object and giving them colours

var boundary1 = createSprite(200,15,400,5);
boundary1.shapeColor="white";

var boundary2 = createSprite(200,385,400,5);
boundary2.shapeColor="white";

var boundary5 = createSprite(200,100,400,5);
boundary5.shapeColor="white";

var boundary6 = createSprite(200,300,400,5);
boundary6.shapeColor="white";


var boundary3= createSprite(15,200,5,400);
boundary3.shapeColor="white";

var boundary4 = createSprite(385,200,5,400);
boundary4.shapeColor="white";


var striker = createSprite(200,200,10,10);
striker.shapeColor="white";


var playmallet = createSprite(200,50,50,10);
playmallet.shapeColor="black";

var goalpost1 = createSprite(200,28,100,20);
goalpost1.shapeColor="yellow";

var playmalletScore=0;

var compmallet = createSprite(200,350,50,10);
compmallet.shapeColor="black";

var goalpost2 = createSprite(200,372,100,20);
goalpost2.shapeColor="yellow";

var compmalletScore=0;

//variable to store different state of game
var gameState="serve";




function draw() {
  //to clear the screen or to colour the screen
  background("green");
  //create edge boundaries
  createEdgeSprites();
  //make the striker bounceOff with all edges and player and computer paddle and boundaries
  striker.bounceOff(edges);
  striker.bounceOff(playmallet);
  striker.bounceOff(compmallet);
  striker.bounceOff(boundary1);
  striker.bounceOff(boundary2);
  striker.bounceOff(boundary3);
  striker.bounceOff(boundary4);
 
  // make the player paddle and computer paddle bounceOff with edges and boundaries
  playmallet.bounceOff(edges);
  compmallet.bounceOff(edges);
  playmallet.bounceOff(boundary1);
  playmallet.bounceOff(boundary2);
  playmallet.bounceOff(boundary3);
  playmallet.bounceOff(boundary4);
  playmallet.bounceOff(boundary5);
  playmallet.bounceOff(boundary6);
  compmallet.bounceOff(boundary1);
  compmallet.bounceOff(boundary2);
  compmallet.bounceOff(boundary3);
  compmallet.bounceOff(boundary4);
  compmallet.bounceOff(boundary5);
  compmallet.bounceOff(boundary6);
  
  //to make player paddle or computer paddle bounceOff goalpost1 and goalpost2
  playmallet.bounce(goalpost1);
  playmallet.bounce(goalpost2);
  compmallet.bounce(goalpost1);
  compmallet.bounce(goalpost2);
  //to display the sprites
  drawSprites();
  
  // use for loop condition to make dash line and centeral line
  for (var num = 0; num < 400; num=num+20) {
  line(num,200,num+10,200);
}
//serve the ball when space is pressed
  if (keyDown("space") && gameState==="serve") {
  serve();
  gameState="play";
 }
 
 if (gameState === "serve") {
    fill("black");
    textSize(20);
    text("Press space to strike",100,180);
  }
  // Score
  
   if (striker.isTouching(goalpost1)){
     playmalletScore=playmalletScore+1;
     reset();
    
   }
    if (striker.isTouching(goalpost2)) {
      compmalletScore=compmalletScore+1;
     
      reset();
     gameState="serve";
    }
    
    //to make the striker bounceOff with goalpost1 and goalpost2
    striker.bounceOff(goalpost1);
    striker.bounceOff(goalpost2);
    
    //to colour the text
    fill("black");
    //to give size to the text
    textSize(30);
    //to write the text
    text(compmalletScore,30,190);
    text(playmalletScore,30,230);
    
    
      
    
  // to show the text game over and press r to restart the game
  if (playmalletScore===5 || compmalletScore===5) {
    fill("darkBlue");
    textSize(20);
    text("GAME OVER",150,180);
    text("Press r to restart the game",100,220);
    gameState="gameOver";
  }
  // to upgrade the score when the game restart
  if (keyDown("r") && gameState==="gameOver") {
    gameState="serve";
    playmalletScore=0;
    compmalletScore=0;
  }
  
  
 //make the player paddle move with arrow keys
 
  if (keyDown("left")) {
    playmallet.x=playmallet.x-10;
  }
  
  if (keyDown("right")) {
    playmallet.x=playmallet.x+10;
  }
  
  if (keyDown("up")) {
    playmallet.y=playmallet.y-5;
  }
  
  if (keyDown("down")) {
    playmallet.y=playmallet.y+5;
  }
  
  //AI for computer paddle
  // make it move with the striker's y position
  compmallet.x = striker.x;
}

function serve(){
striker.velocityX=7;
striker.velocityY=6;
}
function reset(){
striker.x = 200;
striker.y = 200;
striker.velocityX=0;
striker.velocityY=0;

}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
