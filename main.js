//var url ='http://www.splashbase.co/api/v1/images/search?query=';
/*$.getJSON('https://geoip-db.com/json/')
   .done (function(location) {
    buildUlr = url.concat(location.city);
  }).then( () => {

  });*/
//
var url = 'http://www.splashbase.co/api/v1/images/latest'
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
