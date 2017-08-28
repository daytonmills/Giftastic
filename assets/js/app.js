var gifLibrary = ["Apple", "Banana", "Orange", "Grape"];

updateButtons();

function updateButtons(update, newGif)
{
    if(!update)
    {
        for(let g = 0; g < gifLibrary.length; g++)
        {
            $("#buttons").append("<button class='gifBtn btn btn-sm btn-outline-primary' dataGif='"+gifLibrary[g]+"'>"+gifLibrary[g]+"</button>");
        }
    }
    else
    {
        $("#buttons").append("<button class='gifBtn btn btn-sm btn-outline-primary' dataGif='"+newGif+"'>"+newGif+"</button>");
    }
}

$("#addBtn").on("click", function()
{
    var newGif = $("#add").val();
    updateButtons(true, newGif);
})

$("#buttons").on("click", ".gifBtn", function()
{
  var gif = $(this).attr("dataGif");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response)
    {
      var results = response.data;

      for (let i = 0; i < results.length; i++)
      {
        const gifDiv = $("<div class='item'>");
        const gifImg = $("<img>");
        let p = $("<p>").text("Rating: " + results[i].rating);

        let datastate = gifImg.attr("datastate", "still");
        let datastill = gifImg.attr("datastill", results[i].images.fixed_height_still.url);
        let datamove = gifImg.attr("datamove", results[i].images.fixed_height.url);

        gifImg.attr("src", results[i].images.fixed_height_still.url);
        gifDiv.prepend(p);
        gifDiv.prepend(gifImg);
        $("#gifs").prepend(gifDiv);
      }
    });
});

$("#gifs").on("click", ".item img", function()
{
    var state = $(this).attr("datastate");
    var move = $(this).attr("datamove");
    var still = $(this).attr("datastill");

    if(state === "still")
    {
        $(this).attr("src", move);
        $(this).attr("datastate", "move");
    }
    else if(state === "move")
    {
        $(this).attr("src", still);
        $(this).attr("datastate", "still");
    }
})
