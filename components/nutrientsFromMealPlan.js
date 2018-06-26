import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MEALPLANRESULTS, HOME } from './constants'
import { PieChart } from 'react-native-svg-charts'

class NutrientsFromMealPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const colors = ['powderblue', 'pink', 'lightgreen'];
        const data = this.props.mealPlanNutritionObjects
            .filter(obj => obj.type !== 'Calories')
            .map((x, index) => ({ ...x, svg: { fill: colors[index] }, key: `${index}` }));

        console.log(data)
        const caloriesData = this.props.mealPlanNutritionObjects.find(obj => obj.type == 'Calories')
        return (
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'space-between', flexDirection: "row" }} >
                    <TouchableOpacity style={styles.button} onPress={() => { 
                        console.log(this.props.mealPlanObjects);
                        this.props.link(MEALPLANRESULTS, {mealPlanObjects: this.props.mealPlanObjects}) }}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { this.props.link(HOME) }}>
                        <Text>Home</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 50 }}> Calories: {caloriesData.value}  </Text>
                </View>
                <PieChart
                    valueAccessor={({ item }) => item.value}
                    style={{ height: 200, marginBottom: 50 }}
                    data={data}
                />
                 <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: data[2].svg.fill, marginLeft: 15, textDecorationLine: "underline" }}>PROTEIN: {data[2].value}%</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: data[1].svg.fill, marginLeft: 15, textDecorationLine: "underline" }}>CARBS: {data[1].value}% </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: data[0].svg.fill, marginLeft: 15, textDecorationLine: "underline" }}>FAT: {data[0].value}% </Text>
                </View>
            </View>
        )
    }
}

export default NutrientsFromMealPlan;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'lightgray',
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 50
    }
});
