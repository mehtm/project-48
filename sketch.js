var helper,helperImage
var PLAY=1;
var END=0;
var gamestate=PLAY;
var score=0;

function preload(){
    groundImage=loadImage("groundimage.png");
    helperImage=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png");
    vaccineImage=loadImage("vaccine.png");
    soapImage=loadImage("soap.png");
    pepperImage=loadImage("pepper.png");
    orangeImage=loadImage("orange.png");
    medicine2Image=loadImage("medicine2.png");
    medicineImage=loadImage("medicine.png");
    cabbageImage=loadImage("cabbage.png");
    breadImage=loadImage("bread.png");
    bananaImage=loadImage("banana.png");
    appleImage=loadImage("apple.png");
    coughingImage=loadImage("coughing.png");
    virusImage=loadImage("virus.png");
    maskImage=loadImage("mask.png");
    cryingImage=loadAnimation("crying.png");

    gameOverImage=loadImage("end.png");
    restartImage=loadImage("reset.png")

}

function setup() {

    createCanvas(1200,400);

    

 ground=createSprite(600,380,1200,20)
 obstaclesGroup=new Group()
 foodGroup=new Group()
 ground.addImage("ground",groundImage);
ground.x=ground.width/2;

invisibleGround=createSprite(600,390,1200,10);
invisibleGround.visible=false;
helper=createSprite(50,200,20,80);
   // helper.debug=true;
    helper.setCollider("rectangle",20,60,helper.width+20,helper.height+35);
    helper.addAnimation("running",helperImage);
    helper.addAnimation("crying",cryingImage);
    helper.scale=0.5;


 restart=createSprite(600,200);
 restart.addImage(restartImage);
 gameOver=createSprite(600,250);
 gameOver.addImage(gameOverImage);
 restart.visible=false;
 gameOver.visible=false;

}

function draw() {

    background("green");
    textSize(25)
    fill("black");
    text("Donations Collected : " +score,200,30)
    console.log(helper.y)

    if (gamestate===PLAY){
        ground.velocityX=-(6+score/20);
        
    
        if (keyDown("space")&&helper.y>220){
            helper.velocityY=-10
        }
        helper.velocityY=helper.velocityY+0.8
    
        if (ground.x < 250){
        ground.x = ground.width/2;
      }

      food();
      createObstacles();
      if(helper.isTouching(foodGroup)){
        
       score=score+5;
       foodGroup.destroyEach()
      }
      if(helper.isTouching(obstaclesGroup)){
              gamestate=END;
              
        }
}

else if(gamestate===END){
    
    //helper.setCollider("circle",0,0,40);
    restart.visible=true;
    gameOver.visibel=true;
    ground.velocityX=0;
    helper.velocityY=0;
   
    helper.changeAnimation("crying",cryingImage);
    helper.scale=0.4;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-2)
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-2);
    
    if(mousePressedOver(restart)){
        
        reset();
    }


}
helper.collide(invisibleGround)
 drawSprites();
}

function food(){
    if (frameCount % 350 === 0) {
        var food = createSprite(1200,120,40,10);
        food.y = Math.round(random(120,230));

        var ran= Math.round(random(1,11));
        switch(ran){
            case 1:food.addImage(appleImage)
            food.scale=0.5
            break;
            case 2:food.addImage(bananaImage)
           
            break;
            case 3:food.addImage(vaccineImage);
            
            break;
            case 4:food.addImage(soapImage);
           
            break;
            case 5:food.addImage(medicineImage);
            break;
            case 6:food.addImage(medicine2Image);
            break;
            case 7:food.addImage(cabbageImage);
           
            break;
            case 8:food.addImage(pepperImage);
            
            break;
            case 9:food.addImage(orangeImage);
            
            break;
            case 10:food.addImage(breadImage);
            break;
            case 11:food.addImage(maskImage);
            break;
            default:break;
           


        }
       // food.addImage(cloudImage);
        food.scale = 0.2;
        food.velocityX = -6;
        
         //assign lifetime to the variable
        food.lifetime = 600;
        
        //adjust the depth
        food.depth = helper.depth;
        helper.depth = helper.depth + 1;
        
        //add each cloud to the group
        foodGroup.add(food);
}
}
function createObstacles(){
    if(frameCount % 100 === 0) {
        var obstacle = createSprite(1200,330,10,40);
        //obstacle.debug = true;
        obstacle.velocityX = -(6+score/20);
        
        //generate random obstacles
        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: obstacle.addImage(coughingImage);
                 obstacle.scale=0.2;
                  break;
          case 2: obstacle.addImage(virusImage);
                obstacle.scale=0.2
                  break;
          default: break;
        }
        
        //assign scale and lifetime to the obstacle           
        //obstacle.scale = 0.5;
        obstacle.lifetime = 600;
        //add each obstacle to the group
        obstaclesGroup.add(obstacle);
}
}
function reset(){

    gamestate=PLAY;
    score=0;
    helper.changeAnimation("running", helperImage);
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    restart.visible=false;
    gameOver.visible=false;

}