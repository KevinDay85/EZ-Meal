import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { HOME, DISHSEARCH } from './constants';
import { PieChart } from 'react-native-svg-charts'

// extracts by grabbing each key name in the objects with the names provided in the curly brackets
const DishResults = ({ dishNutritionArray, link }) => {
    const colors = ['powderblue', 'pink', 'lightgreen'];
    const data = dishNutritionArray.filter(obj => obj.unit !== 'calories').map((x, index) => ({ ...x, svg: { fill: colors[index] }, key: `${index}` }));

    console.log(data)
    const caloriesData = dishNutritionArray.find(obj => obj.unit == 'calories')

    console.log(caloriesData)

    return (
        <View style={styles.container}>

            <View style={{ justifyContent: 'space-between', flexDirection: "row" }} >
                <TouchableOpacity style={styles.button} onPress={() => { link(DISHSEARCH) }}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { link(HOME) }}>
                    <Text>Home</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 50 }} > Calories: {caloriesData.value} </Text>
            </View>

            <PieChart
                valueAccessor={({ item }) => item.value}
                style={{ height: 200, marginBottom: 50 }}
                data={data}
            />
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: data[1].svg.fill, marginLeft: 15, textDecorationLine: "underline" }}>PROTEIN: {data[1].value}%</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: data[2].svg.fill, marginLeft: 15, textDecorationLine: "underline" }}>CARBS: {data[2].value}% </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: data[0].svg.fill, marginLeft: 15, textDecorationLine: "underline" }}>FAT: {data[0].value}% </Text>
            </View>
            
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        backgroundColor: 'lightgray',
        height: 40,
        width: 100,
        borderWidth:3,
        borderColor:"black",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 50
    }
})

export default DishResults;