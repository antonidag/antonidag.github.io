var itemFire = document.getElementById('itemFire');
var itemMountain = document.getElementById('itemMountain');
var itemAirballon = document.getElementById('itemAirballon');
var bg = document.getElementById("bg");




itemFire.addEventListener('click', function() {
  fire(0);
});

itemMountain.addEventListener('click', function(){
  bg.style.backgroundImage = "url('image/mountain.jpg')";
});

itemAirballon.addEventListener('click', function(){
  bg.style.backgroundImage = "url('image/airballon.jpg')";
});

function fire(current) {
  bg.style.backgroundImage = "url('image/fire/fireplace" + current + ".jpg'";
  setInterval(() => fire(current + 1), 1000);

}
