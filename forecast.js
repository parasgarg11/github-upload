function getForecast(){
    var city = $("#city").val();
    var days = 7;

    if(city == ''){
        city = 'Delhi';
        $("#city").val(city);
    }
    
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + "&units=metric" + "&cnt=" + days + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            console.log('data', data);
            for (var i = 0; i < data.list.length; i++) {
                var date = moment(data.list[i].dt * 1000).format("DD MMM");
                var day = moment(data.list[i].dt * 1000).format("dddd");
                $('.today-'+i+' .date').html(date);
                $('.today-'+i+' .day').html(day);
                $('.today-'+i+' .location').html(data.city.name+', '+ data.city.country);
                $('.today-'+i+' .sky-type').html(data.list[i].weather[0].description);
                $('.today-'+i+' .num').html(Math.round(data.list[i].temp.day)+'<sup>o</sup>C');
                $('.today-'+i+' .feels_like').html(data.list[i].feels_like.day);
                $('.today-'+i+' .humidity').html(data.list[i].humidity);
                $('.today-'+i+' .wind').html(data.list[i].speed);
                $('.today-'+i+' .pressure').html(data.list[i].pressure);
                $('.today-'+i+' .max_temp').html(data.list[i].temp.max);
                $('.today-'+i+' .min_temp').html(data.list[i].temp.min);
            }
        }
    });
}

$(document).ready(function(){

    getForecast();

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
    
    $("#submitForecast").click(function(){
        return getForecast();
    });
    
});