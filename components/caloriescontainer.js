import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native';
import axios from 'axios';
import { MEALSCALORIESLIST, HOME } from './constants';
import { MainStyle } from '../styles';
import API_KEY from './../config/api';

// helper function to convert HTML to JSON
const convertHTML = response => response.replace(/<[^>]*>/g, "")



export default class CaloriesContainer extends React.Component {
    state = {
        calories: '',
        dayOrWeek: '',
        selected: 'mealsFromCalories',
        imagesTitlesIDs: [],
    }




    getMealsFromCalories = () => {

        let config = {
            headers: {
                'X-Mashape-Key': API_KEY,
                "Accept": 'application/json'
            }
        }

        axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=${this.state.calories}&timeFrame=${this.state.dayOrWeek}`, config + API_KEY)
            .then(response => {

                if (this.state.dayOrWeek.toLowerCase() == 'day') {

                    let promises = [];
                    let imagesTitlesIDs = [];

                    for (var i = 0; i < response.data.meals.length; i++) {
                        var imageObject = {};
                        imageObject.image = 'https://spoonacular.com/recipeImages/' + response.data.meals[i].id + '-240x150.jpg'
                        imageObject.id = response.data.meals[i].id;
                        imageObject.title = response.data.meals[i].title
                        imagesTitlesIDs.push(imageObject);
                        promises.push(axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${imageObject.id}/summary`, config))
                    }

                    Promise.all(promises)
                        .then(res => {
                            // res is an array of response objects
                            for (var i = 0; i < res.length; i++) {

                                imagesTitlesIDs[i].summary = convertHTML(res[i].data.summary);
                            }


                            const props = { imagesTitlesIDs: imagesTitlesIDs };

                            this.props.link(MEALSCALORIESLIST, props);
                        })

                } else if (this.state.dayOrWeek.toLowerCase() == 'week') {
                    let promises = [];
                    let imagesTitlesIDs = [];
                    for (var i = 0; i < response.data.items.length; i++) {
                        let imageObject = {};
                        console.log(response.data)
                        let convertedToObject = JSON.parse(response.data.items[i].value)
                         // parse a JSON string to construct the JavaScrpt value.  We needed this to use the access the keys of the object.
                        console.log(convertedToObject);
                        imageObject.title = convertedToObject.title;
                        imageObject.id = convertedToObject.id;
                        imageObject.image = 'https://spoonacular.com/recipeImages/' + imageObject.id + '-240x150.jpg'
                        imagesTitlesIDs.push(imageObject);
                        promises.push(axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${imageObject.id}/summary`, config))

                    }

                    Promise.all(promises)
                        .then(res => {
                            for (var i = 0; i < res.length; i++) {
                                imagesTitlesIDs[i].summary = convertHTML(res[i].data.summary)
                            }

                            const props = { imagesTitlesIDs: imagesTitlesIDs };

                            this.props.link(MEALSCALORIESLIST, props);
                             // sending props down to mealscalorieslist.  link is coming from app.js which takes in both ID and props
                        })
                }
                else {
                    return alert("Please enter 'Day' or 'Week' in Timeframe")
                }
            })
    }

    render() {
        return (
            <ImageBackground style={MainStyle.container} source={require("../images/veggie5.jpg")}>

                <KeyboardAvoidingView
                    style={[MainStyle.container, { marginVertical: 30 }]}
                    behavior="padding"
                >
                    <TouchableOpacity style={styles.button} onPress={() => { this.props.link(HOME) }}>
                        <Text> Back </Text>
                    </TouchableOpacity>

                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 20, textAlign: 'center' }}> Target number of calories per day </Text>
                    <TextInput
                        placeholder="e.g. 2000"
                        style={styles.textInput}
                        value={this.state.calories}
                        onChangeText={(text) => { this.setState({ calories: text }) }}
                    />
                    <Text style={{ marginBottom: 10, fontSize: 25, color: 'white', textAlign: 'center', fontWeight: 'bold' }}> Time frame </Text>
                    <TextInput
                        placeholder="Day or Week"
                        style={styles.textInput}
                        value={this.state.dayOrWeek}
                        onChangeText={(text) => { this.setState({ dayOrWeek: text }) }}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.getMealsFromCalories}>
                        <Text style={styles.textStyle}>Enter </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: 230,
        height: 50,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 5,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#fce5e5',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        borderColor: "black",
        marginBottom: 20

    }
});
