$(document).ready(function(){
    getWeather();

    var temp;

    function getWeather(){
        var city = $("#city").val();
        
        if(city == ''){
            city = 'Delhi';
            $("#city").val(city);
        }

        $.ajax({
           url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=ec517718f681b71bab3339e24a3ff351",
            type: "GET",
            dataType: "jsonp",
            success: function(data){
                var date = moment().format("DD MMM");
                var day = moment().format("dddd");

                temp = data.main.temp;

                $('.date').html(date);
                $('.day').html(day);
                $('.sky-type').html(data.weather[0].description);
                $('.location').html(data.name+', '+ data.sys.country);
                $('.num').html(Math.round(data.main.temp)+'<sup>o</sup>C');
                $('.feels_like').html(data.main.feels_like);
                $('.humidity').html(data.main.humidity);
                $('.wind').html(data.wind.speed);
                $('.pressure').html(data.main.pressure);
                $('.max_temp').html(data.main.temp_max);
                $('.min_temp').html(data.main.temp_min);
                //$("#city").val('');
            }
            
        });
    }

    function celsius_F(unit) {
    if (unit == "F") {
        temp = Math.round((temp * (9 / 5) + 32) * 10 / 10);
    } else if (unit == "C") {
        temp = Math.round((temp - 32) * 5 / 9 * 10 / 10);
    }
    $(".num").html(temp+'<sup>o</sup>'+unit);
}



    
    $.ajaxSetup({ cache: false });
    $('#city').keyup(function(){
        $('#result').html('');
        var cityField = $('#city').val();
        if(!cityField){
            return;
        }
        var expression = new RegExp(cityField, "i");
        var cityArr = [];
        $.getJSON('history.city.list.json', function(data) {
           $.each(data, function(key, city){
            if (city.name.search(expression) != -1)
            {
                cityArr.push(city.name);
                $('#result').append('<li class="list-group-item link-class">'+city.name+'</li>');
            }
           });   
           if($('#result li').length < 4){
            $.each(data, function(key, city){
                if (key <=4 && cityArr.indexOf(city.name) == -1)
                {
                 $('#result').append('<li class="list-group-item link-class">'+city.name+'</li>');
                }
           });   
           }
        });
    });
 
    $('#result').on('click', 'li', function() {
        var click_text = $(this).text().split('|');
        $('#city').val($.trim(click_text[0]));
        $("#result").html('');
    });

    $("#submitCity").click(function(){
        return getWeather();
    }); 

    $('#myonoffswitch').change(function() {

      var is_farhn = $(this).is(':checked');  // this gives me null
      var unit = "C";
      if(is_farhn){
        unit = "F";
      }
      celsius_F(unit);
    });
});








