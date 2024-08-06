// // let weather = {
// //     apiKey: "d451858f3d23742cf6985907b508a110",
// //     // https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
// //      fetchWeather: function(){
// //        fetch(
// //         "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}").then((response) => response.json())
// //         .then((data) => console.log(data));


// //      }
// // }
// const inputBox = document.querySelector('.search-bar');
// const searchbtn = document.getElementById('searchbtn');
// // const weather_img = document.querySelector('.weather-img');
// const temp= document.querySelector('.temp');
// const description = document.querySelector('.description');
// const humidity = document.querySelector('.humidity');
// const wind_speed = document.querySelector('.wind');
// const city_name = document.querySelector('.city-name');
// const back_ground=document.querySelector('.back_ground');
// // const weather_body=document.querySelector('.weather');
// async  function checkWeather(city)
// {
//     const api_key = "d451858f3d23742cf6985907b508a110";
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

//     const weather_data = await fetch(`${url}`).then(Response => Response.json());
     

//     const apiKey = "S48ggAo4IeT3310m9KgZPQT7eLbeip4-fYh1EhV7alY";
//     // const url_image='https://api.unsplash.com/search/photos?query=${city}&page=1&per_page=1&cliend-id=${apiKey}`'
//     // const background_data = await fetch(`${url_image}`).then(Response => Response.json());

//     back_ground.style.backgroundImage="url('https://api.unsplash.com/search/photos?query=${city}&page=1&per_page=1&cliend-id=${apiKey}`')";
//     // "url('https://images.unsplash.com/photo-1620554600249-636b81e27699?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)')";
//     temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
//     description.innerHTML = `${weather_data.weather[0].description}`;
//     humidity.innerHTML = `${"Humidity: "+weather_data.main.humidity}%`;
//     wind_speed.innerHTML=`${"Wind speed: "+weather_data.wind.speed}km/hr`;
//     city_name.innerHTML=`${"Weather in " + weather_data.name}`;
//     // document.body.style.background-image = ""
//     // document.querySelector(".icon").src =
//     //   "https://openweathermap.org/img/wn/" + icon + ".png";
    
//     console.log(weather_data);
// }



// searchbtn.addEventListener('click', ()=>{
//     checkWeather(inputBox.value);
// })
const inputBox = document.querySelector('.search-bar');
const searchbtn = document.getElementById('searchbtn');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const wind_speed = document.querySelector('.wind');
const city_name = document.querySelector('.city-name');
const back_ground = document.querySelector('.back_ground');

// Function to check weather and get an image for the city
async function checkWeather(city) {
    const api_key = "d451858f3d23742cf6985907b508a110";
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        // Fetch weather data
        const weather_response = await fetch(weather_url);
        const weather_data = await weather_response.json();

        if (weather_data.cod !== 200) {
            throw new Error('City not found');
        }

        // Update weather details
        temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `Humidity: ${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `Wind speed: ${weather_data.wind.speed} km/hr`;
        city_name.innerHTML = `Weather in ${weather_data.name}`;

        // Fetch city image
        const image_api_key = "S48ggAo4IeT3310m9KgZPQT7eLbeip4-fYh1EhV7alY";
        const image_url = `https://api.unsplash.com/search/photos?query=${city}&page=1&per_page=1&client_id=${image_api_key}`;
        const image_response = await fetch(image_url);
        const image_data = await image_response.json();

        if (image_data.results.length > 0) {
            const image_url = image_data.results[0].urls.regular;
            back_ground.style.backgroundImage = `url(${image_url})`;
        } else {
            back_ground.style.backgroundImage = `url('default_image_url_here')`; // Fallback image URL
        }

    } catch (error) {
        console.error(error);
        alert('Error fetching data. Please check the city name.');
    }
}
let geocode = {
    reverseGeocode: function (latitude,longitude)
    {
    var api_keys = "558266e8af544b68869af62d865858f6";

  // reverse geocoding example (coordinates to address)
//   var latitude = '52.3877830';
//   var longitude = '9.7334394';
  var query = latitude + ',' + longitude;

  // forward geocoding example (address to coordinate)
  // var query = 'Philipsbornstr. 2, 30165 Hannover, Germany';
  // note: query needs to be URI encoded (see below)

  var api_url = `https://api.opencagedata.com/geocode/v1/json`;

  var request_url = api_url
    + '?'
    + 'key=' + api_keys
    + '&q=' + encodeURIComponent(query)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#required-params

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){
      // Success!
      var data = JSON.parse(request.responseText);
    //   alert(data.results[0].components.cityformatted); // print the location
    //    searchbtn.addEventListener('click', () => {
        const city = data.results[0].components.city;
        if (city) {
            checkWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    // });
    } else if (request.status <= 500){
      // We reached our target server, but it returned an error

      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };

  request.send();  // make the request
},
getLocation: function() {
    function success(data) {
       geocode.reverseGeocode(data.coords.latitude , data.coords.longitude);
    }
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, console.error);}
    // else{
    //     searchbtn.addEventListener('click', () => {
    //         const city = inputBox.value.trim();
    //         if (city) {
    //             checkWeather(city);
    //         } else {
    //             alert('Please enter a city name.');
    //         }
    //     });
    // }
}};

//Event listener for search button
searchbtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
geocode.getLocation();
