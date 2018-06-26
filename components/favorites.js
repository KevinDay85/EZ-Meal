import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { HOME } from './constants';

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    removeMeal(title) {
        this.props.removeMeals(title)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginBottom: 10, alignItems:"center" }}>
                    <TouchableOpacity style={styles.button} onPress={() => { this.props.link(HOME) }}>
                        <Text>Home</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.favorites}
                    renderItem={({ item }) =>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 15, fontWeight: 'bold' }}>{item.title}</Text>
                            <Image style={{ width: 400, height: 250, marginBottom: 20 }} source={{ uri: item.image }} />
                            <Text style={{ marginBottom: 15 }}>{item.summary}</Text>
                            <TouchableOpacity style={styles.button} onPress={this.removeMeal.bind(this, item.title)}>
                                <Text>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item, index) => index + ''}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 25
    },
    button: {
        backgroundColor: 'lightgray',
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        marginLeft: 5,
        marginBottom: 25,
        borderWidth:3,
        borderColor:"black"
    },
})

export default Favorites;