import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { extractNutrients } from './helper';
import { HOME, MEALPLAN, NUTRIENTSFROMMEALPLAN } from './constants';
import axios from 'axios';
import API_KEY from './../config/api';


class MealPlanResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    seeNutrientsFromMealPlan = id => {
        let config = {
            headers: {
                'X-Mashape-Key': API_KEY,
                "Accept": 'text/html'
            }
        }

        axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/nutritionWidget?defaultCss=false`, config + API_KEY)
            .then(response => {
                console.log("HERE", id)
                console.log(response.data)
                let convertedNutrients = extractNutrients(response.data)
                let neededNutrientsForPieChart = convertedNutrients.filter(x => (x.type === 'Calories') || (x.type === 'Fat') || (x.type === 'Protein') || (x.type === 'Carbohydrates'))
                console.log(JSON.stringify(convertedNutrients));
                let calories = neededNutrientsForPieChart.find(x => x.type === 'Calories').value;

                let modifiedNutrientsForPieChart = neededNutrientsForPieChart.map(function (obj) {
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

                const props = {
                    mealPlanNutritionObjects: modifiedNutrientsForPieChart,
                    mealPlanObjects: this.props.mealPlanObjects 
                    //storing mealPlanObjects as a prop so that we can access it on the back button from the nutrients page.
                }

                this.props.link(NUTRIENTSFROMMEALPLAN, props);
            });
    }

    saveMeal(item) {
        this.props.saveMeals(item);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                    <TouchableOpacity style={styles.backButton} onPress={() => { this.props.link(MEALPLAN) }}>
                        <Text style={{ marginLeft: 35 }}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backButton} onPress={() => { this.props.link(HOME) }}>
                        <Text style={{ marginLeft: 35 }}> Home </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.mealPlanObjects}
                    renderItem={({ item }) =>
                        <View>

                            <View>
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 15, fontWeight: 'bold' }}>{item.title}</Text>
                                    <Image style={{ width: 400, height: 250, marginBottom: 20 }} source={{ uri: item.image }} />
                                    <Text style={{ marginBottom: 15 }}>{item.summary}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity style={styles.button} onPress={this.saveMeal.bind(this, item)}>
                                    <Text style={styles.textStyle}>Save Meal </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => { this.seeNutrientsFromMealPlan(item.id) }}>
                                    <Text style={styles.textStyle}>See Nutrients </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index + ''}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    resultsView: {
        alignItems: 'center',
        marginTop: 25
    },
    backButton: {
        backgroundColor: 'lightgray',
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 30,
        borderWidth:3,
        borderColor:"black"
    },
    button: {
        backgroundColor: 'powderblue',
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        borderWidth:3,
        borderColor:"black"
    }
})

export default MealPlanResults;