
var target = "";
var bg = document.getElementById("bg");


$( ".item" ).click(function() {
  var rawStr = $(this).text();
  var str = rawStr.trim();
  console.log(str);

  switch (str) {
    case "Fire":
      $("#menu").fadeOut();
      target = "image/fire/fire";
      globalTicker(target);
      break;
    case "Sky":
      $("#menu").fadeOut();
      break;
    case "Nature":
      $("#menu").fadeOut();
      break;
    case "Ocean":
      $("#menu").fadeOut();
      break;
    default:

  }
  $("#bg").fadeIn();
});



    //bg.style.backgroundImage = "url('image/fire/fireplace" +  current % 2 + ".jpg'";

var current = -1;
function globalTicker(target) {
  if(target != ""){
    current ++;
    bg.style.backgroundImage = "url('"+ target + current % 2 + ".jpg')";
    setTimeout(() => globalTicker(target), 15000);
  }
}
