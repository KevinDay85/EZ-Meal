import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import axios from 'axios';
import { HOME, DISHRESULTS } from './constants';
import { MainStyle } from '../styles';
import API_KEY from './../config/api';

const objectCreatorForDishName = (data) => {
    let newObj = {};
    for (let key in data) {
        newObj[key] = {
            value: data[key].value,
            unit: data[key].unit
        }
    }
    return newObj;
}

class DishSearch extends React.Component {
    state = {
        search: '',
        dishNutritionArray: []
    }

    changeHandler = (text) => {
        this.setState({
            search: text
        })
    }


    getNutrientsByDishName = (search) => {
        let config = {
            headers: {
                "X-Mashape-Key": API_KEY,
                "Accept": "application/json"
            }
        }
        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/guessNutrition?title=" + search + "'", config + API_KEY)
            .then((response) => {
                console.log('Dish Search Container', response.data)

                var nutrients = objectCreatorForDishName(response.data);

                console.log("OBJECT CREATOR:", nutrients);

                //converting the nutrients from an object to an array
                var nutrientsArray = Object.keys(nutrients).map(i => nutrients[i]);
                console.log(nutrientsArray);
                nutrientsArray.shift();
                console.log("Converted Array", nutrientsArray);

                let calories = nutrientsArray.find(x => x.unit === 'calories').value;
                console.log(calories);

                nutrientsArray[1].type = 'Fat';
                nutrientsArray[2].type = 'Protein';
                nutrientsArray[3].type = 'Carbohydrates';
                console.log('NUTRIENTS ARRAY WITH TYPE', nutrientsArray);

                let modifiedNutrientsArrayForPieChart = nutrientsArray.map(function (obj) {
                    switch (obj.type) {
                        case 'Protein':
                            return { ...obj, value: Math.ceil((((obj.value * 4) / calories) * 100)) }
                        case 'Carbohydrates':
                            return { ...obj, value: Math.ceil((((obj.value * 4) / calories) * 100)) }
                        case 'Fat':
                            return { ...obj, value: Math.ceil((((obj.value * 9) / calories) * 100)) }
                        default:
                            return obj
                    }
                })
                this.setState({
                    dishNutritionArray: modifiedNutrientsArrayForPieChart
                }, this.getDish)
            })
    }

    getDish = () => {
        const props = {
            dishNutritionArray: this.state.dishNutritionArray
        }

        console.log('IN DISHSEARCH CONTAINER:', props);

        this.props.link(DISHRESULTS, props)
    }

    render() {
        return (
            <ImageBackground style={MainStyle.dishSearch} source={require("../images/veggie5.jpg")}>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { this.props.link(HOME) }}>
                        <Text> Back </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 40, textAlign: 'center' }}>Enter Dish Name or Food Item</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='e.g. Spaghetti or Salmon'
                    onChangeText={this.changeHandler} />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.getNutrientsByDishName(this.state.search)}>
                    <Text>Search</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: 230,
        height: 50,
        borderColor: 'black',
        backgroundColor: "white",
        borderWidth: 3,
        borderRadius: 10,
        paddingHorizontal: 5,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#fce5e5',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 170,
        height: 40,
        borderRadius: 30,
        borderColor: "black",
        marginTop: 20
    },
    button: {
        backgroundColor: '#fce5e5',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        borderColor: "black",
    },
})

export default DishSearch;