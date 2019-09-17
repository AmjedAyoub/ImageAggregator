var selectedSize = "select";
var selectedSite = "select";
var selectedType = "select";
var count1 = 0;
var count2 = 0;
var count3 = 0;

$(".AdvSearchBtn").on("click", function() {

    $("#imgSearch").empty();
    count1 = 0;
    count2 = 0;
    count3 = 0;
    userInput = $("#searchBox").val().trim();
    displaySearch();


});

$(".searchBtn").on("click", function() {
    if ($("#searchBox").val() !== "") {

        $("#imgSearch").empty();
        count1 = 0;
        count2 = 0;
        count3 = 0;
        userInput = $("#searchBox").val().trim();
        displaySearch();

    }
})



$("#searchBox").keypress(function(e) {

    if (e.which === 13 && $("#searchBox").val() !== "") {
        $("#imgSearch").empty();
        count1 = 0;
        count2 = 0;
        count3 = 0;
        userInput = $("#searchBox").val().trim();
        displaySearch();
    }


});




$("select.sizeImg").change(function() {
    selectedSize = $(this).children("option:selected").val();
});

$("select.typeImg").change(function() {
    selectedType = $(this).children("option:selected").val();
});

$("select.siteImg").change(function() {
    selectedSite = $(this).children("option:selected").val();
});



$(document).on("click", ".flip-card", function() {
    var itemUrl = $(this).attr("data-url");
    alert(itemUrl);
});





function displaySearch() {
    if ((selectedSite === "select" || selectedSite === "pexels") && (selectedType === "select" || selectedSite === ".jpeg")) {
        $.ajax({
            headers: {
                'Authorization': '563492ad6f917000010000017098dda7af7c4fb4a3fb3db88f792ca6',
            },
            url: "https://api.pexels.com/v1/search?query=" + userInput,
            method: "GET"
        }).then(function(params) {
            // console.log(params);
            for (let i = 0; i < params.photos.length; i++) {

                var newflip = $("<div class='flip-card' id='imgSearchFlip'>");
                var newcard = $("<div class='flip-card-inner'>");
                var newcardFront = $("<div class='flip-card-front'>");
                var newimg = $("<img style='width:250px;height:200px'>");

                if (selectedSize === "select") {
                    newimg.attr("src", params.photos[i].src.original);
                    newflip.attr("data-url", params.photos[i].src.original);
                } else if (selectedSize === "lerge") {
                    newimg.attr("src", params.photos[i].src.large);
                    newflip.attr("data-url", params.photos[i].src.large);
                } else if (selectedSize === "medium") {
                    newimg.attr("src", params.photos[i].src.medium);
                    newflip.attr("data-url", params.photos[i].src.medium);
                }

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
                count1++;
            }
            console.log("count1   " + count1);
            err();

        });
    }
    if ((selectedSite === "select" || selectedSite === "unsplash") && (selectedType === "select" || selectedSite === ".jpg")) {
        $.ajax({
            // url: "https://api.unsplash.com/photos?client_id=472a152bc2a07709c0d4f5b008a8d10af25bb70ba35abbdd0aa4badc9c488731&limit=50&page=1&query=" + userInput,
            url: "https://api.unsplash.com/search/photos?page=1&query='" + userInput + "'cat&client_id=472a152bc2a07709c0d4f5b008a8d10af25bb70ba35abbdd0aa4badc9c488731",
            method: "GET"
        }).then(function(params) {
            console.log(params);
            var results = params.results;
            for (let j = 0; j < results.length; j++) {

                var newflip = $("<div class='flip-card' id='imgSearchFlip'>");
                var newcard = $("<div class='flip-card-inner'>");
                var newcardFront = $("<div class='flip-card-front'>");
                var newimg = $("<img style='width:250px;height:200px'>");

                if (selectedSize === "select") {
                    newimg.attr("src", results[j].urls.regular);
                    newflip.attr("data-url", results[j].urls.regular);

                } else if (selectedSize === "lerge") {
                    newimg.attr("src", results[j].src.full);
                    newflip.attr("data-url", results[j].urls.full);
                } else if (selectedSize === "medium") {
                    newimg.attr("src", results[j].src.small);
                    newflip.attr("data-url", results[j].urls.small);
                }
                console.log(results[j].urls.regular);
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
                count2++;
            }
            console.log("count2   " + count2);
            err();

        })
    }
    if ((selectedSite === "select" || selectedSite === "giphy") && (selectedType === "select" || selectedSite === ".gif")) {
        var query = "https://api.giphy.com/v1/gifs/search?api_key=Boi88Wtkqy6j61XKYNFfl5SbSbL1Hs2c&q=" + userInput + "&limit=50&offset=0&lang=en";
        $.ajax({
            url: query,
            method: "GET"
        }).then(function(params) {
            // console.log(params);
            for (let k = 0; k < params.data.length; k++) {

                var newflip = $("<div class='flip-card' id='imgSearchFlip'>");
                var newcard = $("<div class='flip-card-inner'>");
                var newcardFront = $("<div class='flip-card-front'>");
                var newimg = $("<img style='width:250px;height:200px'>");

                if (selectedSize === "select") {
                    newimg.attr("src", params.data[k].images.original_still.url);
                    newflip.attr("data-url", params.data[k].images.original_still.url);
                } else if (selectedSize === "lerge") {
                    newimg.attr("src", params.data[k].images.downsized_large.url);
                    newflip.attr("data-url", params.data[k].images.downsized_large.url);
                } else if (selectedSize === "medium") {
                    newimg.attr("src", params.data[k].images.downsized_medium.url);
                    newflip.attr("data-url", params.data[k].images.downsized_medium.url);
                }

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
                count3++;

            }
            console.log("count3   " + count3);
            err();
        })
    }




}

function err() {

    var total = count1 + count2 + count3;
    if (total !== 0) {

    } else {

        var info1 = $("<h2>");
        info1.text("404 No results");
        $("#imgSearch").append(info1);
    }


}