//document ready
$(function(){
    $(".change-eaten").on("click", function(event){
        var id= $(this).data("id");
        
        var newEatenState = {
            eaten: true
        };

        $.ajax("/api/food/" + id, {
            type: "PUT",
            data: newEatenState
        }).then(
            function() {
                location.reload();
            }
        )
    })

    $(".create-form").on("submit", function(event){
        event.preventDefault();

        var newFood = {
            food: $("#food").val().trim(),
            eaten: false
        };

        $.ajax("/api/food", {
            type: "POST",
            data: newFood
        }).then(
            function(){
                location.reload();
            }
        )
    })
})