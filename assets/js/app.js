$(".searchBtn").on("click", function() {
    if ($("#searchBox").val() !== "") {

        $("#imgSearch").empty();
        userInput = $("#searchBox").val().trim();
        displaySearch();

    }
})

$("#searchBox").keypress(function(e) {
    if (e.which === 13 && $("#searchBox").val() !== "") {
        $("#imgSearch").empty();
        userInput = $("#searchBox").val().trim();
        displaySearch();
    }
});

function displaySearch() {
    $.ajax({
        headers: {
            'Authorization': '563492ad6f917000010000017098dda7af7c4fb4a3fb3db88f792ca6',
        },
        url: "https://api.pexels.com/v1/search?query=" + userInput,
        method: "GET"
    }).then(function(params) {
        console.log(params);
        for (let i = 0; i < params.photos.length; i++) {

            var newflip = $("<div class='flip-card' id='imgSearchFlip'>");
            var newcard = $("<div class='flip-card-inner'>");
            var newcardFront = $("<div class='flip-card-front'>");
            var newimg = $("<img style='width:250px;height:200px'>");
            newimg.attr("src", params.photos[i].src.original);
            newcardFront.append(newimg);
            var newcardBack = $("<div class='flip-card-back' style='width:250px;height:200px'>");
            var newinfo1 = $("<h5>");
            newinfo1.text(params.photos[i].photographer);
            var newinfo2 = $("<h5>");
            newinfo2.text(params.photos[i].photographer_url);
            var newinfo3 = $("<h5>");
            newinfo3.text("Site: www.Pexels.com");
            newcardBack.append(newinfo1, newinfo2, newinfo3);
            newcard.append(newcardFront, newcardBack);
            newflip.append(newcard);
            $("#imgSearch").append(newflip);
        }

    });


    $.ajax({
        url: "https://api.unsplash.com/photos?client_id=472a152bc2a07709c0d4f5b008a8d10af25bb70ba35abbdd0aa4badc9c488731&limit=50&page=1&q=" + userInput,
        method: "GET"
    }).then(function(params) {
        console.log(params);
        for (let j = 0; j < params.length; j++) {

            var newflip = $("<div class='flip-card' id='imgSearchFlip'>");
            var newcard = $("<div class='flip-card-inner'>");
            var newcardFront = $("<div class='flip-card-front'>");
            var newimg = $("<img style='width:250px;height:200px'>");
            newimg.attr("src", params[j].urls.regular);
            newcardFront.append(newimg);
            var newcardBack = $("<div class='flip-card-back' style='width:250px;height:200px'>");
            // var newinfo1 = $("<h5>");
            // newinfo1.text(params[j].sponsorship.sponsor.name);
            // var newinfo2 = $("<h5>");
            // newinfo2.text(params[j].sponsorship.sponsor.portfolio_url);
            var newinfo3 = $("<h5>");
            newinfo3.text("Site: www.Unsplash.com");
            newcardBack.append(newinfo3);
            newcard.append(newcardFront, newcardBack);
            newflip.append(newcard);
            $("#imgSearch").append(newflip);
        }

    })

    var query = "https://api.giphy.com/v1/gifs/search?api_key=Boi88Wtkqy6j61XKYNFfl5SbSbL1Hs2c&q=" + userInput + "&limit=50&offset=0&lang=en";
    $.ajax({
        url: query,
        method: "GET"
    }).then(function(params) {
        console.log(params);
        for (let k = 0; k < params.data.length; k++) {

            var newflip = $("<div class='flip-card' id='imgSearchFlip'>");
            var newcard = $("<div class='flip-card-inner'>");
            var newcardFront = $("<div class='flip-card-front'>");
            var newimg = $("<img style='width:250px;height:200px'>");
            newimg.attr("src", params.data[k].images.original_still.url);
            newcardFront.append(newimg);
            var newcardBack = $("<div class='flip-card-back' style='width:250px;height:200px'>");
            // var newinfo1 = $("<h5>");
            // newinfo1.text(params.data[k].user.display_name);
            // var newinfo2 = $("<h5>");
            // newinfo2.text(params.data[k].user.profile_url);
            var newinfo3 = $("<h5>");
            newinfo3.text("Site: www.Giphy.com");
            newcardBack.append(newinfo3);
            newcard.append(newcardFront, newcardBack);
            newflip.append(newcard);
            $("#imgSearch").append(newflip);
        }
    })
}