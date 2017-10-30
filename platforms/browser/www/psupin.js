$(function () {
    //images
 $("#pic").click(function (){
  $("#show").empty();
  $("#soon").empty();
     var com=
         '<p>'+
             '<input type="file" id="take-picture" accept="image/*">'+
             '<img src="about:blank" alt="" id="show-picture">'+
         '</p>'+
         '<input id="linkurl" type="text" class="text-input text-input--underbar" placeholder="URL"  value="">'+'</div>'+
         '<div>'+'<input id="title" type="text" class="text-input text-input--underbar" placeholder="Title"  value="">'+'</div>'+
         '<p id="error"></p>'+'<td align="center">'+
         '<br>'+
         '<textarea class="form-control" rows="5" id="comment">'+
         '</textarea>'+
         '</td>'+'<br>'+'<button id="input" class="button">'+'Submit'+'</button>';
      $("#soon").append(com);
      (function () {
        var takePicture = document.querySelector("#take-picture"),
            showPicture = document.querySelector("#show-picture");
        if (takePicture && showPicture) {
            // Set events
            takePicture.onchange = function (event) {
                // Get a reference to the taken picture or chosen file
                var files = event.target.files,
                    file;
                if (files && files.length > 0) {
                    file = files[0];
                    try {
                        // Get window.URL object
                        var URL = window.URL || window.webkitURL;
                        // Create ObjectURL
                        var imgURL = URL.createObjectURL(file);
                        // Set img src to ObjectURL
                        showPicture.src = imgURL;
                        // Revoke ObjectURL after imagehas loaded
                        showPicture.onload = function() {
                            URL.revokeObjectURL(imgURL);  
                        };
                    }
                    catch (e) {
                        try {
                            // Fallback if createObjectURL is not supported
                            var fileReader = new FileReader();
                            fileReader.onload = function (event) {
                                showPicture.src = event.target.result;
                            };
                            fileReader.readAsDataURL(file);
                        }
                        catch (e) {
                            // Display error message
                            var error = document.querySelector("#error");
                            if (error) {
                                error.innerHTML = "Neither createObjectURL or FileReader are supported";
                            }
                        }
                    }
                }
            };
        }
    })();  
 });




 //camera
 $("#hello").click(function (){
  $("#show").empty();
  var c='<img src="http://media.istockphoto.com/vectors/coming-soon-square-grunge-stamp-vector-id652769400?k=6&m=652769400&s=612x612&w=0&h=F4OsUv_Unlg2UKdmQoo-VRqexvhMJ6fgy0s7CEtbaF4=">';
   $("#soon").empty();
   $("#show").append(c);
});
});

    

 //map 
$(function () {  
$("#loadmap").click(function initMap(){
  $("#soon").empty();
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 7.894443, lng: 98.352760},
    zoom: 13,
    mapTypeId: 'roadmap'
  });
//map button
  var a = '<div class="contain">'+
 '<div class="pin">'+
   '<div class="circle">'+ 
   '</div>'+
 '</div>'+'<button id="location"class="button button--material" style=" height: 10%;width: 95%;">Location</button>' ;
var del ='<br>'+'<br>'+'<button id="clear"class="button button--material"onclick="cpage()" >View DB</button>';
$("#clear").empty(del);

$("#location").append(a);
 $("#clear").append(del);
 
   }); });
///get location
$(function () {
    var url=' http://localhost:3000/location';
    $("#location").click(function(){
      var onSuccess = function(position) {
          alert('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
                $.post(url, {
                    latitude: position.coords.latitude ,
                    longitude: position.coords.longitude
                  });
                  alert('get location complete');
      };  
      // onError Callback receives a PositionError object
      infoWindow = new google.maps.InfoWindow;
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          infoWindow.setPosition(pos);
          var marker = new google.maps.Marker({
           position: pos,
           animation: google.maps.Animation.BOUNCE,
                                              });
         marker.setMap(map);
          var infowindow = new google.maps.InfoWindow({
         content: 'You are Here!'
         });
             infowindow.open(map, marker);
          google.maps.event.addListener(marker, 'click', function() {
           infowindow.open(map, marker);
          });
          infowindow.open(map, marker);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
        } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }
   navigator.geolocation.getCurrentPosition(onSuccess, onError); 
  }); 
});






function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
                   
  infoWindow.open(map);
}