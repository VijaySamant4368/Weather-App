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
document.addEventListener("DOMContentLoaded", () => {
    tableData();
});