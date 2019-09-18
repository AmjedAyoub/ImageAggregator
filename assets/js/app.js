var selectedSize = "select";
var selectedSite = "select";
var selectedType = "select";
var result1 = false;

$(".AdvSearchBtn").on("click", function() {

    if (selectedSize !== "select" || selectedSite !== "select" || selectedType !== "select" || $("#photographer").val().trim() !== "" || $("#searchBox").val().trim() !== "") {
        $("#imgSearch").empty();
        result1 = false;
        userInput = $("#searchBox").val().trim();
        displaySearch();
    }
});

$("#photographer").keypress(function(e) {

    if (e.which === 13 && $("#photographer").val() !== "") {
        if (selectedSize !== "select" || selectedSite !== "select" || selectedType !== "select" || $("#photographer").val().trim() !== "" || $("#searchBox").val().trim() !== "") {
            $("#imgSearch").empty();
            result1 = false;
            userInput = $("#searchBox").val().trim();
            displaySearch();
        }
    }
});


$(".searchBtn").on("click", function() {
    if ($("#searchBox").val() !== "") {

        $("#imgSearch").empty();
        result1 = false;
        userInput = $("#searchBox").val().trim();
        displaySearch();

    }
});



$("#searchBox").keypress(function(e) {

    if (e.which === 13 && $("#searchBox").val() !== "") {
        $("#imgSearch").empty();
        result1 = false;
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

$(document).ready(function() {
    $('.sidenav').sidenav();
});

$(document).on("click", ".flip-card", function() {

    var itemUrl = $(this).attr("data-url");

    //grabbing the carrousel "type" to grab on click 
    //empty the modal before adding anything else in 
    $(".modal-content").empty();

    //store the photographer class data into a var

    //store the link class data into a var
    linkData = itemUrl;

    //adding an image 
    var newModalImg = $("<img>");
    //adding the src with the link to the class of src assigned to the image in the AJAX call
    newModalImg.attr("src", itemUrl)
    newModalImg.attr("class", "ModalPicture")

    //giving the image a smaller size
    //  newModalImg.height(370).width(530)

    //appending everything to the Modal 
    $(".modal-content").append(newModalImg);
    $(".modal-content").append("<br>" + "<a href=" + linkData + ">" + `<div class="waves-effect waves-green btn-flat">Link` + "</a>");

    $('#modal1').modal();
    $('#modal1').modal("open");


});


  $(document).on("click", ".flip-card", function() {

    var itemUrl = $(this).attr("data-url");

    //grabbing the carrousel "type" to grab on click 
    //empty the modal before adding anything else in 
    $(".modal-content").empty();
    
               //store the photographer class data into a var
           
            //store the link class data into a var
             linkData = itemUrl;
        
            //adding an image 
            var newModalImg = $("<img>"); 
            //adding the src with the link to the class of src assigned to the image in the AJAX call
            newModalImg.attr("src", itemUrl)
            newModalImg.attr("class","ModalPicture")

            //giving the image a smaller size
            //  newModalImg.height(370).width(530)

            //appending everything to the Modal 
            $(".modal-content").append(newModalImg);
            $(".modal-content").append("<br>"+"<a href=" + linkData + ">" + `<div class="waves-effect waves-green btn-flat">Link` +"</a>");

            $('#modal1').modal();
            $('#modal1').modal("open");
          
    
});




function displaySearch() {
    if (((selectedSite === "select" || selectedSite === "pexels") && (selectedType === "select" || selectedType === ".jpeg")) || ($("#photographer").val().trim() !== "")) {
        $.ajax({
            headers: {
                'Authorization': '563492ad6f917000010000017098dda7af7c4fb4a3fb3db88f792ca6',
            },
            url: "https://api.pexels.com/v1/search?query=" + userInput,
            method: "GET"
        }).then(function(params) {
            console.log("pexels         " + params);
            for (let i = 0; i < params.photos.length; i++) {
                if ($("#photographer").val().trim() === "") {
                    var newflip = $("<div class='flip-card' id='imgSearchFlip'>");
                    var newcard = $("<div class='flip-card-inner'>");
                    var newcardFront = $("<div class='flip-card-front'>");
                    var newimg = $("<img style='width:250px;height:200px'>");

                    if (selectedSize === "select") {
                        newimg.attr("src", params.photos[i].src.original);
                        newflip.attr("data-url", params.photos[i].src.original);
                    } else if (selectedSize === "large") {
                        newimg.attr("src", params.photos[i].src.large);
                        newflip.attr("data-url", params.photos[i].src.large);
                    } else if (selectedSize === "medium") {
                        newimg.attr("src", params.photos[i].src.medium);
                        newflip.attr("data-url", params.photos[i].src.medium);
                    }

                    newcardFront.append(newimg);
                    var newcardBack = $("<div class='flip-card-back' style='width:250px;height:200px'>");
                    var newinfo1 = $("<h6>");
                    newinfo1.text("Photographer: " + params.photos[i].photographer);
                    var newinfo2 = $("<h6>");
                    newinfo2.text(params.photos[i].photographer_url);
                    var newinfo3 = $("<h6>");
                    newinfo3.text("Site: www.Pexels.com");
                    newcardBack.append(newinfo1, newinfo2, newinfo3);
                    newcard.append(newcardFront, newcardBack);
                    newflip.append(newcard);
                    $("#imgSearch").append(newflip);
                } else if ($("#photographer").val().trim().toLowerCase() === params.photos[i].photographer.toLowerCase()) {
                    var newflip = $("<div class='flip-card' id='imgSearchFlip'>");
                    var newcard = $("<div class='flip-card-inner'>");
                    var newcardFront = $("<div class='flip-card-front'>");
                    var newimg = $("<img style='width:250px;height:200px'>");

                    if (selectedSize === "select") {
                        newimg.attr("src", params.photos[i].src.original);
                        newflip.attr("data-url", params.photos[i].src.original);
                    } else if (selectedSize === "large") {
                        newimg.attr("src", params.photos[i].src.large);
                        newflip.attr("data-url", params.photos[i].src.large);
                    } else if (selectedSize === "medium") {
                        newimg.attr("src", params.photos[i].src.medium);
                        newflip.attr("data-url", params.photos[i].src.medium);
                    }

                    newcardFront.append(newimg);
                    var newcardBack = $("<div class='flip-card-back' style='width:250px;height:200px'>");
                    var newinfo1 = $("<h6>");
                    newinfo1.text("Photographer: " + params.photos[i].photographer);
                    var newinfo2 = $("<h6>");
                    newinfo2.text(params.photos[i].photographer_url);
                    var newinfo3 = $("<h6>");
                    newinfo3.text("Site: www.Pexels.com");
                    newcardBack.append(newinfo1, newinfo2, newinfo3);
                    newcard.append(newcardFront, newcardBack);
                    newflip.append(newcard);
                    $("#imgSearch").append(newflip);

                }
            }
        });
        result1 = true;
        err();
    }

    if (((selectedSite === "select" || selectedSite === "unsplash") && (selectedType === "select" || selectedType === ".jpg")) || ($("#photographer").val().trim() !== "")) {
        $.ajax({
            url: "https://api.unsplash.com/search/photos?page=1&query='" + userInput + "'&client_id=472a152bc2a07709c0d4f5b008a8d10af25bb70ba35abbdd0aa4badc9c488731",
            method: "GET"
        }).then(function(params) {
            console.log("unsplashhh         " + params);
            var results = params.results;
            for (let j = 0; j < results.length; j++) {
                if ($("#photographer").val().trim() === "") {
                    var newflip = $("<div class='flip-card' id='imgSearchFlip'>");
                    var newcard = $("<div class='flip-card-inner'>");
                    var newcardFront = $("<div class='flip-card-front'>");
                    var newimg = $("<img style='width:250px;height:200px'>");

                    if (selectedSize === "select") {
                        newimg.attr("src", results[j].urls.regular);
                        newflip.attr("data-url", results[j].urls.regular);
                    }
                    if (selectedSize === "large") {
                        newimg.attr("src", results[j].urls.raw);
                        newflip.attr("data-url", results[j].urls.raw);
                    }
                    if (selectedSize === "medium") {
                        newimg.attr("src", results[j].urls.thumb);
                        newflip.attr("data-url", results[j].urls.thumb);
                    }

                    newcardFront.append(newimg);
                    var newcardBack = $("<div class='flip-card-back' style='width:250px;height:200px'>");
                    var newinfo1 = $("<h6>");
                    newinfo1.text("Photographer: " + results[j].user.name);
                    var newinfo2 = $("<h6>");
                    newinfo2.text(results[j].user.links.html);
                    var newinfo3 = $("<h6>");
                    newinfo3.text("Site: www.Unsplash.com");
                    var newinfo4 = $("<h6>");
                    newinfo4.text("Description: " + results[j].alt_description);
                    newcardBack.append(newinfo1, newinfo2, newinfo4, newinfo3);
                    newcard.append(newcardFront, newcardBack);
                    newflip.append(newcard);
                    $("#imgSearch").append(newflip);

                } else if ($("#photographer").val().trim().toLowerCase() === results[j].user.name.toLowerCase()) {
                    var newflip = $("<div class='flip-card' id='imgSearchFlip'>");
                    var newcard = $("<div class='flip-card-inner'>");
                    var newcardFront = $("<div class='flip-card-front'>");
                    var newimg = $("<img style='width:250px;height:200px'>");

                    if (selectedSize === "select") {
                        newimg.attr("src", results[j].urls.regular);
                        newflip.attr("data-url", results[j].urls.regular);
                    }
                    if (selectedSize === "large") {
                        newimg.attr("src", results[j].urls.raw);
                        newflip.attr("data-url", results[j].urls.raw);
                    }
                    if (selectedSize === "medium") {
                        newimg.attr("src", results[j].urls.thumb);
                        newflip.attr("data-url", results[j].urls.thumb);
                    }

                    newcardFront.append(newimg);
                    var newcardBack = $("<div class='flip-card-back' style='width:250px;height:200px'>");
                    var newinfo1 = $("<h6>");
                    newinfo1.text("Photographer: " + results[j].user.name);
                    var newinfo2 = $("<h6>");
                    newinfo2.text(results[j].user.links.html);
                    var newinfo3 = $("<h6>");
                    newinfo3.text("Site: www.Unsplash.com");
                    var newinfo4 = $("<h6>");
                    newinfo4.text("Description: " + results[j].alt_description);
                    newcardBack.append(newinfo1, newinfo2, newinfo4, newinfo3);
                    newcard.append(newcardFront, newcardBack);
                    newflip.append(newcard);
                    $("#imgSearch").append(newflip);

                }
            }
        });
        result1 = true;
        err();
    }

    if ((selectedSite === "select" || selectedSite === "giphy") && (selectedType === "select" || selectedType === ".gif") && ($("#photographer").val().trim() === "")) {
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

                if (selectedSize === "select") {
                    newimg.attr("src", params.data[k].images.original_still.url);
                    newflip.attr("data-url", params.data[k].images.original_still.url);
                } else if (selectedSize === "large") {
                    newimg.attr("src", params.data[k].images.downsized_still.url);
                    newflip.attr("data-url", params.data[k].images.downsized_still.url);
                } else if (selectedSize === "medium") {
                    newimg.attr("src", params.data[k].images.fixed_width_small_still.url);
                    newflip.attr("data-url", params.data[k].images.fixed_width_small_still.url);
                }

                newcardFront.append(newimg);
                var newcardBack = $("<div class='flip-card-back' style='width:250px;height:200px'>");
                var newinfo3 = $("<h6>");
                newinfo3.text("Site: www.Giphy.com");
                var newinfo1 = $("<h6>");
                newinfo1.text("Descreption: " + params.data[k].title);
                newcardBack.append(newinfo1, newinfo3);
                newcard.append(newcardFront, newcardBack);
                newflip.append(newcard);
                $("#imgSearch").append(newflip);

            }
        });
        result1 = true;
        err();
    }

    err();

}

function err() {

    if (!result1) {
        var info1 = $("<h2>");
        info1.text("404 No results");
        $("#imgSearch").append(info1);
    }

}