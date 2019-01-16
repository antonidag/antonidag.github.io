$( document ).ready( () => {

    $("#load").fadeOut(700);
    setTimeout(() => $("#menu").fadeIn() , 500);
    ;
});


var target = "";
var bg = document.getElementById("bg");
var timer;




$( ".item" ).click(function() {
  var rawStr = $(this).text();
  var str = rawStr.trim();
  console.log(str);
  $("#bg").fadeIn();
  switch (str) {
    case "Fire":
      $("#menu").fadeOut();
      target = "image/fire/fire";
      globalTicker(target);
      break;
    case "Sky":
      $("#menu").fadeOut();
      target = "image/air/air";
      globalTicker(target);
      break;
    case "Nature":
      $("#menu").fadeOut();
      target = "image/nature/nature";
      globalTicker(target);
      break;
    case "Ocean":
      $("#menu").fadeOut();
      target = "image/water/water";
      globalTicker(target);
      break;
    default:

  }

});


$("#prev").click(() => {
  $("#menu").fadeIn();
  $("#bg").fadeOut();
  current = -1;
  clearTimeout(timer);
});

    //bg.style.backgroundImage = "url('image/fire/fireplace" +  current % 2 + ".jpg'";

var current = -1;
function globalTicker(target) {
  if(target != ""){
    current ++;
    console.log(target);
    bg.style.backgroundImage = "url('"+ target + current % 2 + ".jpg')";
    //bg.style.backgroundImage = "url('image/air/air0.jpg')";
    timer = setTimeout(() => globalTicker(target), 15000);
  }
}
