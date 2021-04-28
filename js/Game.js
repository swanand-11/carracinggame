class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,300);
    car1.addImage("car1",carimg1)
    car2 = createSprite(300,300);
    car2.addImage("car2",carimg2)
    car3 = createSprite(500,300);
    car3.addImage("car3",carimg3)
    car4 = createSprite(700,300);
    car4.addImage("car4",carimg4)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(groundimg);
      image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5)
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 300;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if (player.distance>4000){
      gameState = 2;
    }

    drawSprites();
  }
  end(){
    background("white");
      this.output = createElement("h2")
      this.output.html("your game has ended")
      this.output.position(displayWidth/2,displayHeight/2)
    textSize(30)
    text("game has ended !!",displayWidth/2,displayHeight/2);
    console.log("game ended")
  }
}
