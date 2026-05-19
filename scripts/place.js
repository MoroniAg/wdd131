function calculateWindChill(tempC, windKmh) {
    return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}


function updateWindChill() {
    const tempC = 5;
    const windKmh = 10;
    let windChill = undefined;
    if (tempC <= 10 && windKmh > 4.8) {
        windChill = `${calculateWindChill(tempC, windKmh).toFixed(2)} °C`;
    } else {
        windChill = 'N/A';
    }

    document.querySelector('#temperature').textContent = `${tempC}°C`;
    document.querySelector('#wind_speed').textContent = `NW ${windKmh} km/h`;
    document.querySelector('#wind_chill').textContent = `${windChill}`;
}

updateWindChill();