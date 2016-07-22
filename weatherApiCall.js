$(document).ready(function() {
  var options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
  };
  var lat = null, long = null, temp = null, description = null, metric=false, city=null;
    //Assgns the current position of the laptop
  function success(pos) {
        var crd = pos.coords;
        lat = (crd.latitude);
        long = (crd.longitude);    
        weatherCall(lat, long);
  };
  
  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
  
  function weatherCall(lat, long)
  {
  	var apiKey ="6fc12dd2309836e483e9f7df02240311";
  	var url ="http://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+long+"&units=imperial"+"&appid="+apiKey;
  	gettingJSON(url);
  }
  
    function gettingJSON(url){
        $.getJSON(url,function(json){
          //  alert("This is what i want " +json.weather[0].main);
            description = json.weather[0].main;
           // alert(JSON.stringify(json.main.temp));
            temp = Math.round(json.main.temp);
          //  alert(JSON.stringify(json.name));
            city = json.name;
            setHtml();
        });
    }
    //Will add in the appropriate html when the JSON 
    function setHtml(){
        $(".city").html(city);
        $(".des").html(description);
        addTemp();
    }
    function isMetric(){
        if(metric)
            {
                return "C";
            }
        return "F";
    }
    function addTemp(){
        $("#tempC").html(temp + "&deg" + isMetric());
    };
    function changeTemp(){
        if(!metric){
            //now it is in celcius
            temp =(Math.round(temp * (1.8))+32);
        }
        if(metric){
           //now temp is in farenheit 
            temp = Math.round((temp - 32)/1.8);
        }
    }
    
  
    //This function call begins all other function calls
  navigator.geolocation.getCurrentPosition(success, error, options);
  

      $("#tempC").on('click', function(){
        metric = !metric;
        changeTemp();
        //alert(metric);
        addTemp();
    });
});