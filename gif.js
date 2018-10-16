var gifTastic = {
  
    topics: [ "nba","nfl","snl","beyonce","nyc","lol","rihanna"],

    animateGif: function(gifSelected){
        var dataType = gifSelected.getAttribute("data-type");
        if(dataType === "still"){
            gifSelected.setAttribute("src",gifSelected.getAttribute("data-animate"));
            gifSelected.setAttribute("data-type","animate");
        }
        else{
            gifSelected.setAttribute("src",gifSelected.getAttribute("data-still"));
            gifSelected.setAttribute("data-type","still");
        }
    },

    createGif: function(topic){
        var $gifs =  $("#gifs");
        $gifs.empty();
        topic = topic.value.replace(/\s/g, "+");
        $.ajax(this.href, {
            url: "https://api.giphy.com/v1/gifs/search?" + "q=" + topic + "&apikey=9J7oQ0UjOzMoE4UkVP4v3ulo5Xnz0A2h" + "&limit=5",
            method: "GET"
        }).done(function(response) {
            for(i = 0; i < response.data.length; i++){
                var $figure = $("<figure>");
                $figure.addClass("mx-2 d-inline-block");
                var $figCaption = $("<figcaption>");
                $figCaption.addClass("figure-caption text-dark"); 
                $figCaption.html("<strong>Rating: " + response.data[i].rating.toUpperCase() + "</strong");
                $figure.append($figCaption);       
                var $img = $("<img>");
                $img.addClass("figure-img img-fluid rounded");
                $img.attr(
                    {"onclick":"gifTastic.animateGif(this)",
                    "src":response.data[i].images.fixed_height_still.url,
                    "data-still":response.data[i].images.fixed_height_still.url,
                    "data-animate":response.data[i].images.fixed_height.url,
                    "data-type":"still"}
                );
                $figure.append($img);  
                $gifs.append($figure);
            }
        });
    },
    addGif: function(){
        var $input = ($("input"));
        var newTopic = $input.val().trim().toLowerCase();
        var $topics =  $("#topics");
        $topics.empty();
        if(newTopic !== ""){
            this.topics.push(newTopic);
        }
        for(i = 0; i < this.topics.length; i++){
            var $button = $("<button>");
            $button.addClass("topics");
            $button.val(this.topics[i]);
            $button.text(this.topics[i]);
            $button.attr("onclick","gifTastic.createGif(this)");
            $topics.append($button);
        }
        $input.val("");
    }
}
gifTastic.addGif();





