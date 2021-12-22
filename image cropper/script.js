function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#blah').attr('src', e.target.result)
      };
      reader.readAsDataURL(input.files[0]);
      setTimeout(initCropper, 1000);
    }
  }
  function initCropper(){
    console.log("Came here")
    var image = document.getElementById('blah');
    var cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      crop: function(e) {
        console.log(e.detail.x);
        console.log(e.detail.y);
      }
    });

    document.getElementById('crop_button').addEventListener('click', function(){
      var imgurl =  cropper.getCroppedCanvas().toDataURL();
      var img = document.createElement("img");
      img.src = imgurl;
      document.getElementById("cropped_result").appendChild(img);
  
    })
  }