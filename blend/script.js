var itemFire = document.getElementById('itemFire');
var itemMountain = document.getElementById('itemMountain');
var itemAirballon = document.getElementById('itemAirballon');
var bg = document.getElementById("bg");




itemFire.addEventListener('click', function() {
  fire();
});

itemMountain.addEventListener('click', function(){
  bg.style.backgroundImage = "url('image/mountain.jpg')";
});

itemAirballon.addEventListener('click', function(){
  bg.style.backgroundImage = "url('image/airballon.jpg')";
});

var current = -1;
function fire() {
  current ++;
  bg.style.backgroundImage = "url('image/fire/fireplace" +  current % 2 + ".jpg'";
  console.log(current % 2);
  setTimeout(() => fire(), 15000);

}
function globaltick(){

}
