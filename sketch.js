var dog,dogImg,dogImg1;
var database;
var foodS;
var database;
var feedFood,addFood,fedTime,lastFed,foodObj;

function preload(){
   dogImg=loadImage("dogImg.png");
   dogImg1=loadImage("dogImg1.png");
   
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

 this. foodStock=database.ref('food'); //food node in database
  this.foodStock.on("value",readStock);
  textSize(20); 

  foodObj= new Food();
  feedFood=createButton("Feed the dog");
  feedFood.position(700,95);
  feedFood.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}

// function to display UI
function draw() {
  foodObj.display();
  background(46,139,87);
 
 fedTime=database.ref("FeedTime");
 fedTime.on("value",function(data){
   lastFed=data.val();
 })

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed:"+lastFed%12+"PM",350,30);
  }
else if(lastFed===0){
text("Last fed: 12 AM",350,30)
  }
  else{
    text("Last fed:"+lastFed+"AM",350,30);
  }
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x //food node in database
  })
}
function addFoods(){
foodS++;
database.ref("/").update({
  food:foodS
})
}
function feedDog(){
  dog.addImage(dogImg1);
  foodObj.updateFoodstock(foodObj.getfoodStock()-1);
  database.ref("/").update({
    food:foodObj.getfoodStock(),
    fedTime:hour()

  })
}