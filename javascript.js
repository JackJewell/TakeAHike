var searchItem;
var queryURL;

$("#btn-submit").on("click",startSearch);



function startSearch(){
    event.preventDefault();
    searchItem = $("#searchLocations").val();
    console.log(searchItem);
    buildQuery("NPS");
    buildQuery("weather");
}

function callAPI(type){
    console.log(type);
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        switch(type){
            case "1":
                let nationalPark = response.data;
                let i = 0;
                nationalPark.forEach(function(parkVar){
                    let newCardId = "newCard"+i;
                    let newCard = $("<div></div>");
                    newCard.attr("class","uk-card uk-card-default");
                    newCard.attr("style", "width: 1000px; margin: 30px;");
                    newCard.attr("id", newCardId);
                    $("#slideRow").append(newCard);

                    let newDivId = "newDiv"+i;
                    let newDiv = $("<div></div>");
                    newDiv.attr("class","uk-card-title");
                    newDiv.attr("id", newDivId);
                    $(newCardId).append(newDiv);

                    let newBodyId = "newBody"+i;
                    let bodyDiv = $("<div></div>");
                    bodyDiv.attr("class","uk-card-body");
                    bodyDiv.attr("style", "height: 600px;");
                    bodyDiv.attr("id", newBodyId);
                    $(newCardId).append(bodyDiv);

                    let newImgId = "newImg"+i;
                    let newImg = $("<img></img>");
                    newImg.attr("id", newImgId);
                    $(newCardId).append(newImg);

                    let newHeaderId = "newHeader"+i;
                    let newHeader = $("<h1></h1>");
                    newHeader.attr("id", newHeaderId);
                    newHeader.attr("style", "margin-top: 20px; margin-left: 30px;");
                    $(newCardId).append(newHeader);

                    let bodyHeaderId = "bodyHeader"+i;
                    let bodyHeader = $("<h2></h2>");
                    bodyHeader.attr("id", bodyHeaderId);
                    $(newCardId).append(bodyHeader);

                    let firstPId = "firstP"+i;
                    let firstP = $("<p></p>");
                    firstP.attr("id", firstPId);
                    $(newCardId).append(firstP);

                    let secondPId = "secondP"+i;
                    let secondP = $("<p></p>");
                    secondP.attr("id", secondPId);
                    $(newCardId).append(secondP);

                    let parkName = parkVar.fullName;
                    let parkLoc = parkVar.directionsUrl;
                    let parkDesc = parkVar.description;
                    let parkURL = parkVar.url;
                    
                    $(newHeaderId).text(parkName);
                    $(bodyHeaderId).text(parkLoc);
                    $(firstPId).text(parkDesc);
                    $(secondPId).text(parkURL);
                    i++;
                })

                break;
            case "2":
                let weather = response;
                break;
            default:
                break;
        }
    });
}

function buildQuery(searchType){
    switch(searchType){
        case "NPS":
            apiKey="api_key=auId6pdJdBjNrQajHOe6lmOqvegjIh77fAeCZ694";
            queryURL = "https://developer.nps.gov/api/v1/parks?";
            var state = "stateCode="
            var stateCode;

            if(stateCode !== undefined){
                queryURL = queryURL+state+stateCode+"&"+apiKey;
            }else if(searchItem !== undefined){
                queryURL = queryURL+"q="+searchItem+"&"+apiKey;
            }else{
                queryURL = queryURL+"&"+apiKey;
            }
            console.log(queryURL);
            callAPI("1");

            break;
        case "weather":
            queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
            +searchItem
            +"&APPID=6bd5f328c4eb31862977239b636ff37a";

            callAPI("2");

            break;
        default:
            break;
    }
}