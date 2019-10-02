$(document).ready(function() {

    //topics array for buttons
    var topics = ["cats", "horror", "bat", "spooky", "owl", "halloween", "cuttlefish"];
    
    var offset = 0;

    //calls function to create a button for each topic
    makeButtons();

    //function runs when a button is clicked
    $(document).on("click", ".topicButton", function(event) {
        
        //variable to hold data for the button that was clicked
        var topic = $(this).attr("data-topic");

        //variable to randomize offset so that search params return different results each time topic button is clicked
        offset = Math.floor(Math.random() * 1000);

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cvRWJMp97Is61OrbMFOy1QvO6ypDnp7Y&q=" + topic + "&offset=" + offset + "&limit=10&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            var results = response.data;
            
            //loops through results of query associated with the button-topic clicked displays static gif image and rating in gif-display div
            for (var r = 0; r < results.length; r++) {
                
                gifResults = {
                    gifCount: results[r].id,
                    rating: results[r].rating,
                    title: results[r].title,
                    display: results[r].images.fixed_height_still.url,
                    static: results[r].images.fixed_height_still.url,
                    animate: results[r].images.fixed_height.url,
                };

                $("#gif-display").prepend(`<div class="container fig" id="number-${gifResults.gifCount}"> <img src="${gifResults.display}" data-state="still" class="gif" data-still="${gifResults.static}" data-animate="${gifResults.animate}">
                <p>Rating: ${gifResults.rating}</p>
                <p>Title: ${gifResults.title}</p>
                <button class="faves" id="${gifResults.gifCount}">Add to favorites</button>
                </div>`)

            };
            
            //console log query url and data response
            console.log(queryURL);
            console.log(response.data);
            
            
            //click event for gif images
            $(".gif").off().on("click", function(event) {
                console.log("click");
               
               //gets state of gif and stores in variable
               var state = $(this).attr("data-state");
            
               //changes gif between static and animated
               if (state === "still") {

                 $(this).attr("data-state", "animate");
                 $(this).attr("src", $(this).attr("data-animate"));
                   
                } else {
                 $(this).attr("data-state", "still");
                 $(this).attr("src", $(this).attr("data-still"));
                }
                
            });

            $(".faves").on("click", function() {

                $("#faves").append($("#number-" + gifResults.gifCount));

                $("#" + gifResults.gifCount).hide();
            })
            
        });

    });
    
    //loops through topics array and adds buttons to buttons div
    function makeButtons() {

        $("#buttons").empty();

        for (var t = 0; t < topics.length; t++) {

            $("#buttons").append(`<button class="topicButton" data-topic="${topics[t]}">${topics[t]}</button>`)    
        
        };
        
    };

    // function to add new topic button
    $("#add-topic").on("click", function(event) {

        event.preventDefault();

        var topic = $("#topic-input").val().trim();

        //stops user from submitting new topic and gives an alert if input field is blank otherwise adds new topic to array
        if ($("#topic-input").val().trim() === "") {
            alert("You didn't add a topic!");
        } else {

            topics.push(topic);
            
            makeButtons();

            //form clears on submission
            $("#form-display").trigger('reset');
        }
    })


    //figure out how to get 10 NEW gifs each time the topic is clicked
    //click event for favorites button
    //if added to favorites move to a favorites section
    //MAKE IT LOOK NICE

})