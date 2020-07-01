
var btn_encode = document.getElementById("btn_encoder");
btn_encode.addEventListener("click", () => {
    getEncodeText = $( "#text_to_encode" ).val();
    $("#text_field_out").val(encodeText(getEncodeText));
});

var btn_copy = document.getElementById("btn_copy");
btn_copy.addEventListener("click", () => {
    copyToClipBoard();
    showInfoBox();
});

function encodeText(text){
    var encodedString = btoa(text.replace(/\s/g, ""));
    console.log(encodedString);
    return encodedString;
}

function copyToClipBoard(){
    var copyText = document.getElementById("text_field_out");
    copyText.select();
    document.execCommand("copy");
    console.log("Copy to clipborad");
}

function showInfoBox(){
    $("#info_box").fadeIn("slow").fadeOut("slow");
}


function testingAPI(){ 
    var key = "NDAxYjMyODQtYzQ5Mi00YzAwLTk2MTItYzVmZTJiMTY2MTlj"; 
    var url = "http://se.api.anpdm.com:80/v1/subscribers/all";
    console.log(httpGet(url,key)); 
    httpGet(url,key);
}


function httpGet(url,key){
    $.ajax
    ({
      type: "GET",
      url: url,
      dataType: 'json',
      headers: {
        "Authorization": "Basic " + key
      },
      success: function (){
        alert('Thanks for your comment!'); 
      }
    });
}
