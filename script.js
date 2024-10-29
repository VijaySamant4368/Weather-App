async function getWeather(city) {
    // Construct URL with the city name
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(city)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '7b98852a21mshb2c7e2ec200c103p1e7663jsn2395a3d48bfd',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    try {
        // Fetch data from the API
        const response = await fetch(url, options);
        
        // Check if the response is OK, otherwise throw an error
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        // Parse the response as JSON
        const result = await response.json();
        return result; // Log the entire response or work with specific fields as needed

    } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching weather data:", error);
        return null;
    }
}

// Call the function with the desired city name
getWeather("goa");

var data;
async function tableData() {

const cities=["New York", "Tokyo", "Paris", "Sydney", "Dubai"];
for (const city of cities){
    data =await getWeather(city);
    const tableBody = document.querySelector("tbody");

    // Add new row with the weather details
    const row = `<tr>
    <td>${city}</td>
    <td>${data.location.lat}</td>
    <td>${data.location.lon}</td>
    <td>${data.location.country}</td>
    <td>${data.current.temp_f}</td>
    <td>${data.current.temp_c}</td>
    <td>${data.current.wind_mph}</td>
    <td>${data.current.pressure_mb}</td>
    <td>${data.current.cloud}</td>
    <td>${data.current.humidity}</td>
                </tr>`;

    tableBody.insertAdjacentHTML("beforeend", row);
}
}



async function getCityImage(city) {
    const extensions = ['jpg', 'jpeg', 'png'];
    let imagePath;

    for (let ext of extensions) {
        imagePath = `assets/${city}.${ext}`;
        
        // Attempt to load the image by setting it as the source
        const img = document.getElementById('city-icon');
        img.src = imagePath;

        // Wait for the image to load or fail
        const imageLoaded = await new Promise((resolve) => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });

        // If image loaded successfully, return the path
        if (imageLoaded) return imagePath;
    }

    // Fallback image if no matching file found
    return 'assets/default.jpg';
}


async function loadCityDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');

    if (city) {
        const data = await getWeather(city);
        if (data) {
            document.getElementById('city-name').innerText = city;
            document.getElementById('temp').innerText = `${data.current.temp_c}`;
            document.getElementById('humidity').innerText = `${data.current.humidity}`;
            document.getElementById('wind').innerText = `${data.current.wind_mph}`;
            document.getElementById('pressure').innerText = `${data.current.pressure_mb}`;
            document.getElementById('cloud').innerText = `${data.current.cloud}`;

            // Set the city image

            const cityImageSrc = await getCityImage(city);
            document.getElementById('city-icon').src = cityImageSrc;
            // const cityImage = `assets/${city}.jpeg`;
            // document.getElementById('city-icon').src = cityImage;
            // document.getElementById('city-icon').alt = `${city} Image`;
            
            // Set the weather icon
            const iconUrl = `https:${data.current.condition.icon}`;
            document.getElementById('weather-icon').src = iconUrl;
            document.getElementById('weather-icon').alt = data.current.condition.text; // Accessible text for icon
        }
    } else {
        console.error("City parameter not found in URL");
    }
}


if (window.location.pathname.includes("index.html")) {
    document.addEventListener("DOMContentLoaded", tableData);
}



if (window.location.pathname.includes("cityName.html")) {
    loadCityDetails();
}