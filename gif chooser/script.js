
$(document).ready(function(){
    $("#new").click(function() {
      var imgSrc;
      var imgId;
      $.ajax ({
        url: "//api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=dog",
        type: "GET",
        dataType: "json",
        success: function(response) {
          imgSrc = response.data.image_url;
          imgId = response.data.id;
          console.log(response);
          $("#giphy-embed").attr("src", "https://giphy.com/embed/"+imgSrc);
          $("#tweetButton").attr("href", "https://giphy.com/gifs/"+imgId+"/tweet")
          return false;
        }, 
        error: function(e) {
          console.log("uh oh");
          }
        });
    });
  });
  
  
  