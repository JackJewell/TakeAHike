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