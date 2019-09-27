var topics = ["creepy", "cross-stitch", "weird", "painting", "drawing", "piercings", "tattoos", "cats", "tarot", "spooky", "halloween"];

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cvRWJMp97Is61OrbMFOy1QvO6ypDnp7Y";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

});


    
//loops through topics var and adds buttons to buttons div
for (var t = 0; t < topics.length; t++) {
    $("#buttons").append(`<button class="topicButton" id="${topics[t]}">${topics[t]}</button>
    `)    
    console.log(topics[t]);
    }



//take in array and output buttons of each string
//when button is clicked add 10 static gifs from GIPHY API to screen
//when gif is clicked start playing - when clicked again stop playing
//under each gif display it's rating
