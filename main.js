//var url ='http://www.splashbase.co/api/v1/images/search?query=';
/*$.getJSON('https://geoip-db.com/json/')
   .done (function(location) {
    buildUlr = url.concat(location.city);
  }).then( () => {

  });*/
//
/*$.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('http://www.splashbase.co/api/v1/images/latest') + '&callback=?', function(data){
	alert(data.contents);
}).then((data) => {

  while(true){
    var jsonObject = JSON.parse(data.contents);
    var rndNum =Math.floor(Math.random() * jsonObject.images.length);
    var stringImage = jsonObject.images[rndNum].large_url;
    if(stringImage.match(/\.(gif|jpg|jpeg|tiff|png)$/i)){
      break;
    }
  }
  $("#lead").css("background-image","url(" + stringImage + ")");
});*/


var url = 'https://www.hidemyass-freeproxy.com/proxy/sv-se/aHR0cDovL3d3dy5zcGxhc2hiYXNlLmNvL2FwaS92MS9pbWFnZXMvbGF0ZXN0';
  $.ajax({
      url: url,
      type: 'GET',
      success: function(data) {
        console.log(url);
         console.log(data);
       }
  }).then( (data) => {

    while(true){
      var rndNum =Math.floor(Math.random() * data.images.length);
      var stringImage = data.images[rndNum].large_url;
      if(stringImage.match(/\.(gif|jpg|jpeg|tiff|png)$/i)){
        break;
      }
    }
    $("#lead").css("background-image","url(" + stringImage + ")");
  });
