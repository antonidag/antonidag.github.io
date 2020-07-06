var image64base;

var token; 

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onloadend = function() {
        image64base = reader.result;
      console.log(reader.result)
    }
    reader.readAsDataURL(file);
}

document.getElementById("ButtonLogin").addEventListener("click", function(event){
  event.preventDefault();
  console.log("Login in... ");
  const nickname = document.getElementById("InputEmail");
  const password = document.getElementById("InputPassword");
  console.log(nickname.value);
  console.log(password.value);
});