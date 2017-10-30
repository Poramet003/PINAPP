/*ลบ*/
function deletepost(id){
    alert('ต้องการลบ ประสบการณ์ครั้งนี้ จริงๆหรือ ? ');

    //Delete from back end
    $.ajax({
        url: "http://localhost:3000/posts/" + id, // post id
        type: "DELETE" // Use DELETE
    })
    alert('DELET COMPLETE');
    setTimeout(window.location.href = "index.html");
    //Delete from front end
    $("#post"+id).empty();

}

/*แก้ไขโพสเพื่อเปิดจาก อ่านเท่านั่นเป็นแก้ไขได้*/
function editpost(id,review,postby,zone,picture) {
    console.log(id);
    var url = "http://localhost:3000/posts";
    $("#preview" + id).prop('readonly', false);
    $("#building" + id).prop('readonly', false);
    $("#roomnum" + id).prop('readonly', false);
    $("#description" + id).prop('readonly', false);


    $.ajax({
        type: 'PUT',
        //data: {name: 'Billy Bob', age: 28},
        url: url + "/" + id,
        success: function () {
            //no data...just a success (200) status code
            console.log(id);
        }
    });
  }

/*แก้ไข้*/
function savepost(id,comment) {
    // console.log(id,title)
    var review = review;
      var picture = picture;
        var zone = zone;
          var postby = postby;
     var newposts = {};

     newposts.id = id;
     newposts.preview = $("#preview"+id).val();
     newposts.building  = $("#building "+id).val();
     newposts.roomnum = $("#roomnum"+id).val();
     newposts.description = $("#description"+id).val();

     var url = "http://localhost:3000/posts/"+id;
     $.ajax({
         type: 'PUT',
         data: newposts,
         url: url,
         success: function () {
             //no data...just a success (200) status code
             console.log(newposts);
         }
     });
 }


$(document).ready(function () {
  var $preview = $ ('#preview');
  var $building  = $ ('#building');
  var $roomnum = $ ('#roomnum');
  var $description = $ ('#description');
  

/*console.log($("#postby").val());*/
  var url = "http://localhost:3000/posts"
/*อ่าน้*/
  $("#report").click(function () {
    $.ajax({
      url: url,
      method: "GET",
      success: function (data, status, xhr) {
        console.log(data);
        var template = $('#template').html();
        for(var i=0;i<data.length;i++){
        var rendered = Mustache.render(template, data[i]);
            $("#posts").append(rendered);
          }
        }
    })
  });



  //create
  $("#report").click(function () {
    console.log($("#postby").val());
    $.post(url, {
      postby: $("#postby").val(),
      review:$("#review").val(),
      comment:"โปรดติชมหรือแสดงความคิดเห็น",
      zone: $("#zone").val(),
      picture : $("#picture").val(),
    });
    alert('อัพเดตให้แล้วนะ ! ไว้เข้ามาใหม่ล่ะ');
      setTimeout(window.location.href = "index2.html");


  });
});