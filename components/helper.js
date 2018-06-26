import DOMParser from 'react-native-html-parser';

const extractNumber = (valueStr, type) => {
    let numStr = valueStr.match(/[+-]?\d+(\.\d+)?/g)[0];
    let unit = valueStr.split(numStr)[1];
    let value = parseFloat(numStr);

    return {
        type,
        unit,
        value
    }
}

export const extractNutrients = html => {
    const nutrients = [];

    const parser = new DOMParser.DOMParser();
    const parsed = parser.parseFromString(html, 'text/html');

    var names  = parsed.getElementsByAttribute('class', 'spoonacular-nutrient-name'); 
    var values  = parsed.getElementsByAttribute('class', 'spoonacular-nutrient-value'); 

    for (var i = 0; i < names.length; i++) {
        var type = names[i].textContent.trim();
        var value = values[i].textContent.trim();

        nutrients.push(extractNumber(value, type));
    }
    return nutrients;
}