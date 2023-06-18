const units = {
    length: [
        { label: 'Centimeter (cm)', value: 'cm' },
        { label: 'Inch (in)', value: 'in' },
        { label: 'Meter (m)', value: 'm' },
        { label: 'Kilometer (km)', value: 'km' },
        { label: 'Mile (mi)', value: 'mi' },
    ],
    temperature: [
        { label: 'Celsius (°C)', value: 'c' },
        { label: 'Fahrenheit (°F)', value: 'f' },
        { label: 'Kelvin (K)', value: 'k' },
    ],
    mass: [
        { label: 'Gram (g)', value: 'g' },
        { label: 'Kilogram (kg)', value: 'kg' },
        { label: 'Pound (lb)', value: 'lb' },
        { label: 'Ounce (oz)', value: 'oz' },
    ],
    volume: [
        { label: 'Milliliter (ml)', value: 'ml' },
        { label: 'Liter (l)', value: 'l' },
        { label: 'US Gallon (gal)', value: 'gal' },
        { label: 'US Fluid Ounce (fl oz)', value: 'floz' },
    ],
};

// Populate the unit select dropdowns
function populateUnitSelects() {
    const inputUnitSelect = document.getElementById('inputUnit');
    const outputUnitSelect = document.getElementById('outputUnit');
    const selectedType = document.getElementById('unitType').value;

    // Clear existing options
    inputUnitSelect.innerHTML = '';
    outputUnitSelect.innerHTML = '';

    // Populate with new options based on the selected type
    units[selectedType].forEach(unit => {
        const option1 = document.createElement('option');
        option1.text = unit.label;
        option1.value = unit.value;
        inputUnitSelect.appendChild(option1);
        const option2 = document.createElement('option');
        option2.text = unit.label;
        option2.value = unit.value;
        outputUnitSelect.add(option2);
        // outputUnitSelect.appendChild(option1);
    });
}

// Perform the conversion
function convert() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    let outputValue;

    // Conversion logic for different unit types
    switch (document.getElementById('unitType').value) {
        case 'length':
            outputValue = convertLength(inputValue, inputUnit, outputUnit);
            break;
        case 'temperature':
            outputValue = convertTemperature(inputValue, inputUnit, outputUnit);
            break;
        case 'mass':
            outputValue = convertMass(inputValue, inputUnit, outputUnit);
            break;
        case 'volume':
            outputValue = convertVolume(inputValue, inputUnit, outputUnit);
            break;
        default:
            outputValue = inputValue;
            break;
    }

    document.getElementById('outputValue').value = outputValue.toFixed(2);
    document.getElementById('result').textContent = `${inputValue} ${inputUnit} = ${outputValue.toFixed(2)} ${outputUnit}`;
}

// Conversion functions for different unit types
function convertLength(value, inputUnit, outputUnit) {
    const ratios = {
        cm: 1,
        in: 2.54,
        m: 100,
        km: 100000,
        mi: 160934.4,
    };
    return value * ratios[inputUnit] / ratios[outputUnit];
}

function convertTemperature(value, inputUnit, outputUnit) {
    let result;
    switch (inputUnit) {
        case 'c':
            result = value;
            break;
        case 'f':
            result = (value - 32) * (5 / 9);
            break;
        case 'k':
            result = value - 273.15;
            break;
        default:
            result = value;
            break;
    }
    switch (outputUnit) {
        case 'c':
            return result;
        case 'f':
            return result * (9 / 5) + 32;
        case 'k':
            return result + 273.15;
        default:
            return value;
    }
}

function convertMass(value, inputUnit, outputUnit) {
    const ratios = {
        g: 1,
        kg: 1000,
        lb: 453.592,
        oz: 28.3495,
    };
    return value * ratios[inputUnit] / ratios[outputUnit];
}

function convertVolume(value, inputUnit, outputUnit) {
    const ratios = {
        ml: 1,
        l: 1000,
        gal: 3785.41,
        floz: 29.5735,
    };
    return value * ratios[inputUnit] / ratios[outputUnit];
}

// Initialize unit select dropdowns
populateUnitSelects();