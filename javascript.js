let searchItem;
let queryURL;

$("#btn-submit").on("click",startSearch);

function startSearch(){
    buildQuery("NPS");
    //buildQuery("weather");
    //buildQuery("googMaps");
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
                let parkDesc = nationalPark.description;

                break;
            case 2:
                let weather = response;
                break;
            case 3:
                let maps = response;
                break;
            default:
                break;
        }
    });
}

function buildQuery(searchType){
    let userQuestion = $("#searchLocations").val();
    switch(searchType){
        case "NPS":
            apiKey="api_key=auId6pdJdBjNrQajHOe6lmOqvegjIh77fAeCZ694";
            queryURL = "https://developer.nps.gov/api/v1/parks?";
            let state = "stateCode="
            let stateCode;

            if(stateCode !== undefined){
                queryURL = queryURL+state+stateCode+"&"+apiKey;
                callAPI(1);
            }else if(userQuestion !== undefined){
                queryURL = queryURL+"q="+userQuestion+"&"+apiKey;
                callAPI(1);
            }else{
                queryURL = queryURL+"&"+apiKey;
                callAPI(1);
            }

            break;
        case "weather":
            queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
            +userQuestion
            +"&APPID=6bd5f328c4eb31862977239b636ff37a";

            callAPI(2);

            break;
        case "googMaps":
            //apiKey=;
            //queryURL =;

            callAPI(3);
            break;
        default:
            break;
    }
}