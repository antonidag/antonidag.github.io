// Anton Björkman ae4864


//When document is ready add event click event to btn.
$(document).ready(function(){
  $("#btnSearch").click(function(){
    var search = $("#input").val();
    callCountryAPI(search);
  });
});

// Restets the scrollbar
// Makes a new Country object, empty the array.
// Removes all inside off the countries div.
function reset(){
  $("html").scrollTop(0);
  country = new Country();
  boundryCountries = [];
  $("#countries").html("");
  interval.stopInterval();
    
}

// Constructor function. 
function Country(){
  this.name = "";
  this.altSpellings = [];
  this.city = "";
  this.population = 0;
  this.flag = "";
  this.boundryCounties = [];
  this.lat = 0;
  this.lng = 0;
  this.nativeName = "";
  this.languages = [];
  this.area = "";
}
// Assign global variables
var country = new Country();
var boundryCountries = [];
var interval = new Interval();


// Controller fuction, checks when to add the Countries and boundry Countries to the html.
function appendDivsIfReady(){
  if(country.boundryCounties.length === boundryCountries.length){
    appendCountriesToDiv();
  }
}

// Loads the Google API information into the html.
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: country.lat, lng: country.lng},
    zoom: 8
  });
}
// Call the Restcountries API
// Load the country object with information.
// Calls other methods to run.
function callCountryAPI(search){
  reset();
  if(search.length > 0){
    $.ajax({
      url:"https://restcountries.eu/rest/v2/name/"+ search + "?fullText=true",
      async:true,
      success: function(response){
        console.log(response);
        initCountry(response);
        initMap();
        getBoundryCountries();
        callWeatherAPI(country.city);
        $("#map").fadeIn();
      },
      error: function(jqXHR, textStatus, errorThrown,response) {
        $("#map").fadeOut();
        $("#weather").html(""); 
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      } 
    });
  }

}
// Takes the response and sets it to the country object.
function initCountry(response){
  country.name = response[0].name;
  country.nativeName = response[0].nativeName;
  country.city = response[0].capital;
  country.flag = response[0].flag;
  country.population = response[0].population;
  country.lat = parseInt(response[0].latlng[0]);
  country.lng = parseInt(response[0].latlng[1]);
  country.boundryCounties = response[0].borders;
  country.languages = response[0].languages;
  country.area = response[0].area;
  country.altSpellings = response[0].altSpellings;

}

// Make call to the Restcountries API to get the boundry countries, to the main country.
function getBoundryCountries(){
  // If there is no boundry country then just append the divs to the html.
  if(boundryCountries.length === 0){
    appendDivsIfReady();
  }
  for(var i = 0; i < country.boundryCounties.length; i++){
    $.ajax({
      url: "https://restcountries.eu/rest/v2/alpha/" + country.boundryCounties[i],
      async:true,
      success: function(response){
        var bCountry = new Country();
        bCountry.name = response.name;
        bCountry.city = response.capital;
        bCountry.flag = response.flag;
        bCountry.population = response.population;
        bCountry.lat = parseInt(response.latlng[0]);
        bCountry.lng = parseInt(response.latlng[1]);
        boundryCountries.push(bCountry);
        appendDivsIfReady();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }   
    });
  }


}
// Call the Openweathermap API
// Take the response and append to the html.
function callWeatherAPI(city){
  $.ajax({
    url:"http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=8f254a4186f5e86e6f1bbbdd00ed8720&mode=html",
    async:true,
    success: function(response){
      
      // The response it a HTML string. Make changes to it to fit our page.
      var div = document.createElement("div");
      div.innerHTML = response;
      var script = div.getElementsByTagName("script");
      div.removeChild(script[0]);

      var a = div.getElementsByTagName("a");
      var divInsideWeather = div.getElementsByTagName("div")[1];
      divInsideWeather.appendChild(a[0]);

      $("#weather").html(div); 
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }    
  });
}
// Retruns a div with all the information about the main country.
function createCountryDiv(name,nativeName,city,population,flag,area,languages){
  var parrent = document.createElement("div");
  var h1 = document.createElement("h1");
  var h2AltSpelling = document.createElement("h2");
  var h2 = document.createElement("h2");
  var h4 = document.createElement("h4");
  var para = document.createElement("p");
  var para1 = document.createElement("p");
  var img = document.createElement("img");

  img.src = flag;
  h2AltSpelling.id = "altSpelling";

  var textNodeh1 = document.createTextNode(name + " - "+ nativeName);
  var textNodeh2AltSpelling = document.createTextNode(country.altSpellings[country.altSpellings.length - 1]);
  var textNodeh2 = document.createTextNode("The capital in "+ name +" are " + city +".");
  var textNOdepara = document.createTextNode(name+ " has a population of " + population + " people, and has an area of " + area +" km².");
  var textNodePara1 = document.createTextNode(makeStringLag(languages));
  var textNodeh4 = document.createTextNode(country.name + " borders to:");

  h1.appendChild(textNodeh1);
  h2AltSpelling.appendChild(textNodeh2AltSpelling);
  h2.appendChild(textNodeh2);
  h4.appendChild(textNodeh4);
  para.appendChild(textNOdepara);
  para1.appendChild(textNodePara1);
  parrent.appendChild(h1);
  parrent.appendChild(h2AltSpelling);
  parrent.appendChild(img);
  parrent.appendChild(h2);
  parrent.appendChild(para);
  parrent.appendChild(para1);
  parrent.appendChild(h4);


  return parrent;
}
function makeStringLag(languages){
  var string = "The language spoken are ";
  console.log(languages[0]);
  if(languages.length > 1){
    var sLang = "";
    languages.forEach(function(x,index){
      if(languages.length-1 != index){
        sLang += x.name + ", ";
      }else{
        sLang += x.name + ".";
      }
    });
    return string + sLang; 
  }
  return string + languages[0].name+".";
}


// Retruns a Array of img tags of the boundry countries.
function createBoundryCountries(borders){
  var arrayImg = [];
  borders.forEach(item => {
    var img = document.createElement("img");
    img.id = item.name;
    img.src = item.flag;
    //img.className = "boxshadow";
    arrayImg.push(img);
  });
  console.log(arrayImg);
  arrayImg.forEach(item =>{
    item.addEventListener("click",function(){
      callCountryAPI(item.id);
    });
  });

  return arrayImg;
}
// Appends all the divs to the rightfull place in the HTML document.
function appendCountriesToDiv(){
  var mainCDiv = createCountryDiv(country.name,country.nativeName,country.city,country.population,country.flag,country.area,country.languages);
  var bCountries = createBoundryCountries(boundryCountries);
  var bCountriesDiv = document.createElement("div");
  bCountriesDiv.id = "bCounties";
  var cDiv = document.getElementById("countries");

  cDiv.appendChild(mainCDiv);
  bCountries.forEach(item => bCountriesDiv.appendChild(item));
  cDiv.appendChild(bCountriesDiv);
  interval.startInterval();
}

function Interval(){
  this.intervalAltSpelling = {};

  this.startInterval = function() {
    this.intervalAltSpelling = window.setInterval(changeAltSpelling,2500);
  };
  this.stopInterval = function(){
    window.clearInterval(this.intervalAltSpelling);
  }
}
var countAlt = 0;
function changeAltSpelling(){
  countAlt++;
  $("#altSpelling").html(country.altSpellings[countAlt % country.altSpellings.length]);
}