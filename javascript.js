var searchItem;
var queryURL;

///$("someSubmitButton").onclick(startSearch);



function startSearch(){
    buildQuery(NPS);
    callAPI(1);
    buildQuery(weather);
    callAPI(2);
}

function callAPI(type){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        switch(type){
            case 1:
                break;
            case 2:
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
        case weather:
            //apiKey=;
            //queryURL =;
            return queryURL;

            break;
        case googMaps:
            //apiKey=;
            //queryURL =;
            break;
        default:
            break;
    }
}