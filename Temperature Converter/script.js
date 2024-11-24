// Get elements
const temperatureConverter = document.getElementById("temperature");
const selectFromUnit = document.getElementById("fromUnit");
const selectToUnit = document.getElementById("toUnit");
const tempConvertBtn = document.getElementById("convertButton");
const getResult = document.getElementById("result");

// Toggle button enable & disable
const validateForm = () => {
    const isTemperatureConverter = temperatureConverter.value.trim() !== "";
    const isFromUnit = selectFromUnit.value !== "";
    const isToUnit = selectToUnit.value !== "";

    // Enable Button
    if (isTemperatureConverter && isFromUnit && isToUnit) {
        tempConvertBtn.classList.remove('disabled');
        tempConvertBtn.disabled = false;
    } else { // Disable Button
        tempConvertBtn.classList.add('disabled');
        tempConvertBtn.disabled = true;
    }
};

// Attach the EventListener for validation
temperatureConverter.addEventListener('input', validateForm);
selectFromUnit.addEventListener('change', validateForm);
selectToUnit.addEventListener('change', validateForm);

// Conversion logic
const convertTemperature = (value, fromUnit, toUnit) => {
    let celsius = 0;

    // Convert input to Celsius
    switch (fromUnit) {
        case "Celsius":
            celsius = value;
            break;
        case "Fahrenheit":
            celsius = (value - 32) * (5 / 9);
            break;
        case "Kelvin":
            celsius = value - 273.15;
            break;
        default:
            throw new Error("Invalid fromUnit");
    }

    // Convert Celsius to target unit
    switch (toUnit) {
        case "Celsius":
            return celsius;
        case "Fahrenheit":
            return celsius * (9 / 5) + 32;
        case "Kelvin":
            return celsius + 273.15;
        default:
            throw new Error("Invalid toUnit");
    }
};

// Handle the convert button click
tempConvertBtn.addEventListener('click', () => {
    const temperature = parseFloat(temperatureConverter.value);
    const fromUnit = selectFromUnit.value;
    const toUnit = selectToUnit.value;

    if (fromUnit === toUnit) {
        getResult.textContent = `${temperature} ${fromUnit} is equal to itself.`;
        return; // Exit if units are the same
    }

    const convertedTemperature = convertTemperature(temperature, fromUnit, toUnit);
    getResult.textContent = `${temperature} ${fromUnit} is ${convertedTemperature.toFixed(2)} ${toUnit}.`;
});