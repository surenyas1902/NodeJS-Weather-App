const getWeather = (locName, callback) => {
    fetch('/weather?address=' + locName).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                callback(data.error, undefined)
            } else {
                callback(undefined, {
                    location: data.location,
                    forecast: data.forecast
                })
            }
        })
    })
}

const weatherForm = document.querySelector("form");
const searchElm = document.querySelector("input");
const errorSel = document.querySelector("#errorMsg");
const locData = document.querySelector("#locData");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const locName = searchElm.value;
    errorSel.textContent = "Loading...";
    locData.textContent = null;
    getWeather(locName, (err, data) => {
        if (err) {
            errorSel.textContent = err;
            return;
        }
        errorSel.textContent = null;
        locData.textContent = data.forecast;
    });
})