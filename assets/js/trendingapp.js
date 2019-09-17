$(document).ready(function () {

    var linkData;
    var photographerData;
    //my onclicks ----------------------------------------
    //carousel-items click event
    $(document).on("click", ".carousel-item", function () {
        //grabbing the carrousel "type" to grab on click 
        var type = $(this).attr("type");
        //empty the modal before adding anything else in 
        $(".modal-content").empty();
        //switch case to decide what type of modal display you need on click 
        switch (type) {
            //in the case of the type first
            case "first":
                //store the photographer class data into a var
                photographerData = $(this).attr("photographer");
                //store the link class data into a var
                 linkData = $(this).attr("link");
            
                //adding an image 
                var newModalImg = $("<img>");
                //adding the src with the link to the class of src assigned to the image in the AJAX call
                newModalImg.attr("src", $(this).attr("src"))
                //giving the image a smaller size
                newModalImg.height(100).width(100)
    
                //appending everything to the Modal 
                $(".modal-content").append(newModalImg);
                $(".modal-content").append("<br>"+"Photographer: " + photographerData + "<br>");
                $(".modal-content").append("Link: " + "<a href=" + linkData + ">" + linkData +"</a>");
                $(".modal-content").append("<input type=text value = "+linkData+" id=hiddenfield></input>")
                $("#hiddenfield").hide();
                break;
    
            case "second":
    
    
                var userNameData = $(this).attr("userName");
                var linkData = $(this).attr("link");
               
    
                var newModalImg = $("<img>");
                newModalImg.attr("src", $(this).attr("src"))
                newModalImg.height(100).width(100)
    
                $(".modal-content").append(newModalImg);
                $(".modal-content").append("<br>"+"UserName: " + userNameData + "<br>");
                $(".modal-content").append("Link: " + "<a href=" + linkData + ">" + linkData +"</a>");
                $(".modal-content").append("<input type=text value = "+linkData+" id=hiddenfield></input>")
                $("#hiddenfield").hide();
    
                break;
    
            case "third":
                var displayName = $(this).attr("displayName");
                var linkData = $(this).attr("link");
                console.log(linkData);
    
    
                var newModalImg = $("<img>");
                newModalImg.attr("src", $(this).attr("src"))
                newModalImg.height(100).width(100)
                $(".modal-content").append(newModalImg);
                $(".modal-content").append("<br>" + "Title: " + displayName + "<br>");
                $(".modal-content").append("Link: " + "<a href=" + linkData + ">" + linkData +"</a>");
                $(".modal-content").append("<input type=text value = "+linkData+" id=hiddenfield></input>")
                $("#hiddenfield").hide();
                
                
                break;
    
    
        }
    
    
    
        $('.modal').modal();
        $('.modal').modal("open");
    
    })

    //modal copy click event

    $("#modalCopyButton").click(function(){
         var toCopy = document.getElementById("hiddenfield");
         console.log("work dammit", toCopy.value);
         $(toCopy).show()
        toCopy.select();
        document.execCommand('copy');
        $(toCopy).hide();
    });


    

    //first AJAX call for pexel----------------------------------------------------------------------
    
    //defining the search term since pexel doesnt have a likes within the API
    
    //hard coded search term sice pexel doesnt have a likes number within their API
    
    
    //AJAX call itsef
    // function PexelCall()
    $.ajax({
        headers: {
            'Authorization': "563492ad6f917000010000017098dda7af7c4fb4a3fb3db88f792ca6",
        },
        url: "https://api.pexels.com/v1/curated?per_page=15&page=1",
        method: "GET"
    }).then(function (response) {
        //creating a varaible to more easily  navigate the response 
        var results = response.photos;

        console.log(response);
        //iterating through 
        for (i = 0; i < results.length; i++) {


            //creating a new image tage for each object iterated through
            var newImag = $("<img>");
            //giving it the materialize class of carousel item
            newImag.attr("class", "carousel-item");

            //assigning the values for the modal to grab in my switch statment
            newImag.attr("photographer", results[i].photographer)
            newImag.attr("link", results[i].src.original)


            //giving the the image source of the object 
            newImag.attr("src", results[i].src.medium);

            newImag.attr("type", "first");
            //setting a predefined width and height 
            newImag.height(300).width(300)
            //appending to carousel



            // flipcardFront.append(newImag);

            // flipcardInner.append(flipcardFront);
            // flipcardInner.append(flipcardBack);
            // flipcardHolder.append(flipcardInner);
            console.log($(`#carousel1holder`));

            $(`#carousel1holder`).append(newImag);


        }
        $('#carousel1holder').carousel();


    });
//setting up an onclick for the photos within the Caraousel to present a modal with info 

    //--------------------------------------------------------------------------------------------------------

    $.ajax({
        url: "https://api.unsplash.com/search/photos?client_id=472a152bc2a07709c0d4f5b008a8d10af25bb70ba35abbdd0aa4badc9c488731&page=1&query=wallpapers&order_by=popular",
        method: "GET"

    }).then(function (response) {

        var results2 = response.results;
        console.log(results2);
        console.log(results2[0].likes);

        for (i = 0; i < results2.length; i++) {
            if (results2[i].likes > 80) {
                //creating a new image tage for each object iterated through
                var newImag = $("<img>");
                //giving it the materialize class of carousel item
                newImag.attr("class", "carousel-item");
                //giving the the image source of the object 
                newImag.attr("src", results2[i].urls.small);
                //setting a predefined width and height 
                newImag.height(300).width(300)

                newImag.attr("type", "second");

                newImag.attr("userName", results2[i].user.name);

                newImag.attr("link", results2[i].urls.full);

                //appending to carousel
                $(`#carousel2holder`).append(newImag);

            }
            $('#carousel2holder').carousel();
        }




    })

    //----------------------------------------------------------

    $.ajax({
        url: "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10",
        method: "GET"

    }).then(function(response) {

        var results3 =  response.data;

        console.log(results3);


        for(i=0; i < results3.length; i++){
            //creating a new image tage for each object iterated through
            var newImag =$("<img>");
            //giving it the materialize class of carousel item
            newImag.attr("class","carousel-item");
            //giving the the image source of the object 
            newImag.attr("src", results3[i].images.fixed_height.url);
            //setting a predefined width and height 
            newImag.height(300).width(300);

            newImag.attr("type", "third");

            newImag.attr("displayName", results3[i].title);
        
            newImag.attr("link", results3[i].images.original.url);



            //appending to carousel
            $(`#carousel3holder`).append(newImag);

            }
            $('#carousel3holder').carousel();

        });



    // $(document).on("click", ".carousel-item", function() {
    //     var img = $(this);
    // var posLeft = ($this.offset().left)-10
    // var posTop = ($this.offset().top)-10
    // $('.popup', $this).css({
    //                             // position: 'fixed',
    //                             // // top: posTop,
    //                             // // left: posLeft
    //                             width: '400px',
    //                             height: '400px'
    // }).fadeIn('fast');
    // if(!clicked){
    // img.css("width", '600px');
    // img.css("height", '400px');
    // img.css("transform:", '{translateX(500px), translateY(50px), translateX(0px), translateZ(0px)}');



    // clicked = true;
    // }else {
    //     clicked = false;
    //     img.css("width", '300px');
    //     img.css("height", '300px');
    //     img.css("transform:", '{translateX(648px), translateY(50px), translateX(0px), translateZ(0px)}');

    // }
    // }).mouseleave(function() {
    //     $('.popup', this).fadeOut('fast');
    // });









});

