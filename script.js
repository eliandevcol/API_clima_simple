const API_KEY = 'tu_clave_aqui'; //Clave personal de OpenWeatherMap API
const searchBtn = document.getElementById('searchBtn'); //Elementos que estan en el HTML
const cityInput = document.getElementById('cityInput'); // Capturamos elementos del DOM
const weatherInfo = document.getElementById('weatherInfo'); //Los almacenamos en variables para trabajar con ellos

// Escuchamos el evento click del botón de búsqueda
// y llamamos a la función getWeather con el valor del input
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim(); // Obtenemos el valor del input y eliminamos espacios en blanco al inicio y al final
    if (city) {
        getWeather(city); // Si el input no está vacío, llamamos a la función getWeather
    }
});


function getWeather(city) { // Función para obtener el clima de una ciudad
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`; // Construimos la URL de la API con la ciudad y la clave de API

    // Realizamos la petición a la API
    fetch(url)
        .then(response => {
            if (!response.ok) { // Verificamos si la respuesta es correcta
                throw new Error('Ciudad no encontrada');
            }
            return response.json();
        })
        .then(data => { // Procesamos la respuesta JSON
            const { name, main, weather } = data; // Desestructuramos los datos obtenidos de la API
            // Creamos el HTML para mostrar la información del clima
            const html = ` <h2>Clima en ${name}</h2>
                <p>Temperatura: ${main.temp} °C</p>
                <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">`; // Usamos la URL de la imagen del clima y la descripción del clima
            weatherInfo.innerHTML = html;
        })
        // Si la petición falla, mostramos un mensaje de error
        .catch(error => {
            weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`; // Mostramos el mensaje de error en rojo
        });
}