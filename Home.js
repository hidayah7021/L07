import React, { useState } from 'react';
import { StatusBar, Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { datasource } from './Data';

const Home = ({ navigation }) => {
    const [modules, setModules] = useState(datasource);

    // Function to calculate GPA
    const calculateGPA = () => {
        const gradeMap = { A: 4, B: 3, C: 2, D: 1, F: 0 };
        let totalPoints = 0;
        let count = 0;

        modules.forEach((module) => {
            if (module.grade && gradeMap[module.grade] !== undefined) {
                totalPoints += gradeMap[module.grade];
                count++;
            }
        });

        const gpa = count > 0 ? totalPoints / count : 0;

        // Display GPA using a long toast
        Toast.show({
            type: 'info',
            text1: 'GPA Calculation Result',
            text2: `Your GPA is ${gpa.toFixed(2)}.\nCalculated using grades from your modules.`,
            visibilityTime: 5000, // Long toast duration in milliseconds
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Edit', { module: item, setModules })}
        >
            <Text style={styles.text}>{`${item.key} Grade: ${item.grade}`}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar />
            <Button title="Add Module" onPress={() => navigation.navigate('Add', { setModules })} />
            <FlatList data={modules} renderItem={renderItem} keyExtractor={(item) => item.key} />
            <Button title="Calculate GPA" onPress={calculateGPA} color="#841584" />
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    text: { fontSize: 16 },
});

export default Home;
