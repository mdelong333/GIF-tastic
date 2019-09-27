$(document).ready(function() {

    //topics array for buttons
    var topics = ["weird", "painting", "drawing", "piercings", "tattoos", "cats", "tarot", "spooky", "halloween"];

    //calls function to create a button for each topic
    makeButtons();

    //function runs when a button is clicked
    $(".topicButton").on("click", function() {

        //variable to hold data for the button that was clicked
        var topic = $(this).attr("data-topic");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cvRWJMp97Is61OrbMFOy1QvO6ypDnp7Y&q=" + topic + "&limit=10&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            var results = response.data;
            
            //loops through results of query associated with the button clicked displays static gif image and rating in gif-display div
            for (var r = 0; r < results.length; r++) {
                
                var rating = results[r].rating;

                $("#gif-display").prepend(`<img src="${results[r].images.fixed_height_still.url}" data-state="still" class="gif" data-still="${results[r].images.fixed_height_still.url}" data-animate="${results[r].images.fixed_height.url}">
                <p>Rating: ${rating}</p>`)

            };

            //console log query url and data response
            console.log(queryURL);
            console.log(response.data);

            $(".gif").on("click", function() {

               console.log("click");
                //gets state of gif and stores in variable
               var state = $(this).attr("data-state");
               
               
               if (state === "still") {

                   $(this).attr("src", $(this).attr("data-animate"));
                   $(this).attr("data-state", "animate");
            
                } else {

                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
                
            });
            

        });

    })
    
    //loops through topics array and adds buttons to buttons div
    function makeButtons() {
        for (var t = 0; t < topics.length; t++) {

            $("#buttons").append(`<button class="topicButton" data-topic="${topics[t]}">${topics[t]}</button>
            `)    
        
        }
    };

    
    
        
    
})

//when button is clicked add 10 static gifs from GIPHY API to screen
//when gif is clicked start playing - when clicked again stop playing
//under each gif display it's rating
