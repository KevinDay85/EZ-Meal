import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import { MEALSCALORIESLIST, HOME } from './constants'
import { PieChart } from 'react-native-svg-charts'

export default class NutrientsFromCalories extends React.Component {
    // render is a method that tells react what to display
    render() {

        const colors = ['powderblue', 'pink', 'lightgreen'];
        const data = this.props.nutrientsList
            .filter(obj => obj.type !== 'Calories')
            .map((x, index) => ({ ...x, svg: { fill: colors[index] }, key: `${index}` }));

        console.log(data)
        const caloriesData = this.props.nutrientsList.find(obj => obj.type == 'Calories')


        return (
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'space-between', flexDirection: "row" }} >
                    {/* imagesTitlesIDs is being sent down to here as well so that we can access it back in the mealscalorieslist.  An analogy is like that of sending a box to a person and it keeps going until the final endpoint just in case it needs to be returned.  */}
                    <TouchableOpacity style={styles.button} onPress={() => { this.props.link(MEALSCALORIESLIST, { imagesTitlesIDs: this.props.imagesTitlesIDs }) }}>  
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
