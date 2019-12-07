var searchItem;
var queryURL;

///$("someSubmitButton").onclick(startSearch);



function startSearch(){
    buildQuery("NPS");
    buildQuery("weather");
}

function callAPI(type){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        switch(type){
            case 1:
                let nationalPark = response;
                let parkName = nationalPark.fullName;
                let parkLoc = nationalPark.directionsURL;
                let parkDesc = nationalPark.description;
                let parkURL = nationalPark.url;
                $("#parkname").text(parkName);
                $("#address").text(parkLoc);
                $("#description").text(parkDesc);
                $("#url").text(parkURL);
                break;
            case 2:
                let weather = response;
                break;
            default:
                break;
        }
    });
}

function buildQuery(searchType){
    switch(searchType){
        case NPS:
            apiKey="api_key=auId6pdJdBjNrQajHOe6lmOqvegjIh77fAeCZ694";
            queryURL = "https://developer.nps.gov/api/v1/parks?";
            var state = "stateCode="
            var stateCode;
            var userQuestion;

            if(stateCode !== undefined){
                var queryURL = queryURL+state+stateCode+"&"+apiKey;
            }else if(userQuestion !== undefined){
                var queryURL = queryURL+"q="+userQuestion+"&"+apiKey;
            }else{
                var queryURL = queryURL+"&"+apiKey;
            }
            return queryURL;

            break;
        case "weather":
            queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
            +userQuestion
            +"&APPID=6bd5f328c4eb31862977239b636ff37a";

            callAPI(2);

            break;
        default:
            break;
    }
}