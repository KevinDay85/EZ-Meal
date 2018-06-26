import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native';
import axios from 'axios'
import { HOME, MEALPLANRESULTS} from './constants';
import { MainStyle } from '../styles';
import API_KEY from './../config/api';

const convertHTML = response => response.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<a href="/g, '').replace(/">/g, ' for the ').replace(/<\/a>/g, '')

class MealPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchDiet: '',
            searchExclude: '',
            searchCal: '',
            searchTimeFrame: '',
            mealPlanObjects: {}
        }
    }

    changeHandler = (text) => {
        this.setState({
            searchDiet: text
        })
    }

    changeHandler2 = (text) => {
        this.setState({
            searchExclude: text
        })
    }

    changeHandler3 = (text) => {
        this.setState({
            searchCal: text
        })
    }

    changeHandler4 = (text) => {
        this.setState({
            searchTimeFrame: text
        })
    }

    getMealPlan = (searchDiet, searchExclude, searchCal, searchTimeFrame) => {
        let config = {
            headers: {
                "X-Mashape-Key": API_KEY,
                "Accept": "application/json"
            }
        }
        axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?diet=${searchDiet}&exclude=${searchExclude}&targetCalories=${searchCal}&timeFrame=${searchTimeFrame}`, config + API_KEY)
            .then((response) => {
                console.log(searchTimeFrame)

                if (searchTimeFrame.toLowerCase() == 'day') {
                    console.log(response.data)
                    var { meals } = response.data;
                    

                    var newInfo = [];
                    var promises = [];

                    for (var i = 0; i < meals.length; i++) {
                    
                        var newMealPlanObjects = {}
                        newMealPlanObjects.title = meals[i].title
                        newMealPlanObjects.image = 'https://spoonacular.com/recipeImages/' + meals[i].id + '-240x150.jpg'
                        newMealPlanObjects.id = meals[i].id

                        newInfo.push(newMealPlanObjects);
                        promises.push(axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + newMealPlanObjects.id + '/summary', config))
                    }

                    Promise.all(promises)
                        .then((res) => {

                            newInfo = newInfo.map((info, i) => {
                                return { ...info, summary: convertHTML(res[i].data.summary) }
                            });


                            this.setState({
                                mealPlanObjects: newInfo,

                            }, this.getMealPlan2);
                        })

                } else if (searchTimeFrame.toLowerCase() == 'week') {
                    console.log(response.data);

                    var promises = []
                    var newInfo = []

                    for (var i = 0; i < response.data.items.length; i++) {

                        let newMealPlanObjects = {};
                        var convertedToObject = JSON.parse(response.data.items[i].value)
                        newMealPlanObjects.title = convertedToObject.title;
                        newMealPlanObjects.id = convertedToObject.id;
                        newMealPlanObjects.image = 'https://spoonacular.com/recipeImages/' + newMealPlanObjects.id + '-240x150.jpg'

                        newInfo.push(newMealPlanObjects);
                        promises.push(axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + newMealPlanObjects.id + '/summary', config))
                    }

                    Promise.all(promises)
                        .then((res) => {
                            console.log(res.data)
                            newInfo = newInfo.map((info, i) => {
                                return { ...info, summary: convertHTML(res[i].data.summary) }
                            })
                            console.log(newInfo)

                            this.setState({
                                mealPlanObjects: newInfo,
                            }, this.getMealPlan2)
                        })
                }
                else {
                    return alert("Please enter 'Day' or 'Week' in Timeframe")
                 }
            })
    }
    getMealPlan2 = () => {
        const props = {
            mealPlanObjects: this.state.mealPlanObjects
        }

        console.log('IN MEALPLAN CONTAINER:', props);

        this.props.link(MEALPLANRESULTS, props)
    }

    render() {
        return (
            <ImageBackground style={MainStyle.container} source={require("../images/veggie5.jpg")}>
            <KeyboardAvoidingView 
            style={MainStyle.container}
            behavior = "padding"
            >
                <TouchableOpacity style={styles.button} onPress={() => { this.props.link(HOME) }}>
                    <Text> Back </Text>
                </TouchableOpacity>
                <View >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 20, textAlign: 'center' }}>Enter diet (optional)</Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder='e.g. vegetarian, pescatarian'
                    onChangeText={this.changeHandler} />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 20, textAlign: 'center' }}>Exclude (optional)</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='e.g. shellfish, olives'
                    onChangeText={this.changeHandler2} />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 20, textAlign: 'center' }}>Target calories per day</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='e.g. 2500'
                    onChangeText={this.changeHandler3} />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 20, textAlign: 'center' }}>Enter Time frame</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='day or week'
                    onChangeText={this.changeHandler4} />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.getMealPlan(this.state.searchDiet, this.state.searchExclude, this.state.searchCal, this.state.searchTimeFrame)}>
                    <Text>Search</Text>
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
        borderWidth: 3,
        borderRadius: 10,
        paddingHorizontal: 5,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 5,
        backgroundColor: 'white'
    },
    submitButton: {
        backgroundColor: '#fce5e5',
        height: 40,
        width: 100,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        borderColor: 'black',
        borderWidth: 3

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
})

export default MealPlan;