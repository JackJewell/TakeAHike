var searchItem;
var queryURL;
let w;

$("#btn-submit").on("click",startSearch);



function startSearch(){
    event.preventDefault();
    searchItem = $("#searchLocations").val();
    console.log(searchItem);
    buildQuery("NPS");
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
                w = 0;
                let newRowId;
                let newRow;
                nationalPark.forEach(function(parkVar){

                    newRowId = "emptySlide"+i;
                    newRow = $("#"+newRowId);
                    newRow.attr("class","row justify-content-center slidesjs-slide");
                    newRow.attr("slidesjs-index", i);

                    let newCardId = "newCard"+i;
                    let newCard = $("<div></div>");
                    newCard.attr("class","uk-card uk-card-default");
                    newCard.attr("style", " width: 1000px; margin: 30px; background-color: saddlebrown;");
                    newCard.attr("id", newCardId);
                    $("#"+newRowId).append(newCard);

                    let newDivId = "newDiv"+i;
                    let newDiv = $("<div></div>");
                    newDiv.attr("class","uk-card-title");
                    newDiv.attr("style", "background-color: saddlebrown;")
                    newDiv.attr("id", newDivId);
                    $("#"+newCardId).append(newDiv);
                    
                    let newImgId = "newImg"+i;
                    let newImg = $("<img></img>");
                    newImg.attr("id", newImgId);
                    $("#"+newCardId).append(newImg);

                    let newBodyId = "newBody"+i;
                    let bodyDiv = $("<div></div>");
                    bodyDiv.attr("class","uk-card-body");
                    bodyDiv.attr("style", "height: 600px; background-color: saddlebrown; ");
                    bodyDiv.attr("id", newBodyId);
                    $("#"+newCardId).append(bodyDiv);

                    let newHeaderId = "newHeader"+i;
                    let newHeader = $("<h1></h1>");
                    newHeader.attr("id", newHeaderId);
                    newHeader.attr("style", "margin-top: 20px; margin-left: 30px; color: sandybrown;");
                    $("#"+newDivId).append(newHeader);

                    let bodyHeaderId = "bodyHeader"+i;
                    let bodyHeader = $("<h2></h2>");
                    bodyHeader.attr("id", bodyHeaderId);
                    bodyHeader.attr("style", "color: sandybrown;");
                    $("#"+newBodyId).append(bodyHeader);

                    let bodyLinkId = "bodyLink"+i;
                    let bodyLink = $("<a></a>");
                    bodyLink.attr("id", bodyLinkId);
                    $("#"+bodyHeaderId).append(bodyLink);
                    
                    let horizontalLine = $("<hr>");
                    $("#"+newBodyId).append(horizontalLine);

                    let secondBodyHeader = $("<h3></h3>");
                    secondBodyHeader.text("Park Description:")
                    secondBodyHeader.attr("style", "color: sandybrown;")
                    $("#"+newBodyId).append(secondBodyHeader);

                    let firstPId = "firstP"+i;
                    let firstP = $("<p></p>");
                    firstP.attr("id", firstPId);
                    firstP.attr("style", "color: sandybrown;")
                    $("#"+newBodyId).append(firstP);

                    let secondLinkId = "secondLink"+i;
                    let secondLink = $("<a></a>");
                    secondLink.attr("id", secondLinkId);
                    $("#"+newBodyId).append(secondLink);

                    let secondHorizontalLine = $("<hr>");
                    $("#"+newBodyId).append(secondHorizontalLine);

                    let thirdBodyHeader = $("<h3></h3>");
                    thirdBodyHeader.text("Park Weather:")
                    thirdBodyHeader.attr("style", "color: sandybrown;")
                    $("#"+newBodyId).append(thirdBodyHeader);


                    let weatherDivId = "weatherDiv"+i;
                    let weatherDiv = $("<div></div>");
                    weatherDiv.attr("id", weatherDivId);
                    weatherDiv.attr("style", "color: sandybrown;")
                    $("#"+newBodyId).append(weatherDiv);

                    let parkName = parkVar.fullName;
                    let parkLoc = parkVar.directionsUrl;
                    let parkDesc = parkVar.description;
                    let parkURL = parkVar.url;
                    let latEnd = parkVar.latLong.search(",")
                    let lati = parkVar.latLong.substr(4,latEnd-4);
                    let longStart = parkVar.latLong.search("g:");
                    let longi = parkVar.latLong.substr(longStart+2);

                    console.log(lati);
                    
                    console.log(longi);
                    
                    $("#"+newHeaderId).text(parkName);
                    $("#"+bodyLinkId).text("Directions to Park");
                    $("#"+bodyLinkId).attr("href", parkLoc);
                    $("#"+firstPId).text(parkDesc);
                    $("#"+secondLinkId).text("Park Website");
                    $("#"+secondLinkId).attr("href", parkURL);
                    buildQuery("weather",lati,longi);
                    i++;
                    
                })
                slideClearer(i);
                break;
            case "2":
                let weather = response;
                let weatherHTML = "#weatherDiv"+w;

                let temperature = weather.list['2'].main.temp;
                temperature = ((temperature * (9/5)) - 459.67);
                temperature = temperature.toString();
                temperature = temperature.substring(0,5);
                temperature = "Temperature: " + temperature + " F";

                let humid = "Humidity: " + weather.list['2'].main.humidity + "%";

                let conditions = weather.list['2'].weather['0'].icon;
                let temperatureHTML = $("<p></p>").text(temperature);
                temperatureHTML.attr("class","float-left justify-content-center m-2");
                temperatureHTML.attr("style", "color: sandybrown;")
                let humidHTML = $("<p></p>").text(humid);
                humidHTML.attr("class","float-left justify-content-center m-2");
                humidHTML.attr("style", "color: sandybrown;")
                let conditionsHTML = $("<img>").attr("src","http://openweathermap.org/img/w/" + conditions + ".png");
                conditionsHTML.attr("class","float-left justify-content-center m-2");

                $(weatherHTML).append(conditionsHTML);
                $(weatherHTML).append(temperatureHTML);
                $(weatherHTML).append(humidHTML);

                w++;
                break;
            default:
                break;
        }
    });
}

function buildQuery(searchType,lat,lon){
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
            queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="
            +lat
            +"&lon="
            +lon
            +"&APPID=6bd5f328c4eb31862977239b636ff37a";

            callAPI("2");

            break;
        default:
            break;
    }
}

function slideClearer(numberVar){
    let pageList = $(".slidesjs-pagination");
    while(numberVar<31){
    $("#emptySlide"+numberVar).remove();
    //pageList.children[numberVar].empty();
    //pageList.children[numberVar].remove();
    numberVar++;
    }
}