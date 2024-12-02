import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { datasource } from './Data';

const Calculate = () => {
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

        // Display GPA using Toast
        Toast.show({
            type: 'success',
            text1: 'GPA Calculated',
            text2: `Your GPA is ${gpa.toFixed(2)}`,
        });
    };

    // Rendering each module
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{`${item.key} Grade: ${item.grade}`}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modules and Grades</Text>
            <FlatList
                data={modules}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
            />
            <Button title="Calculate GPA" onPress={calculateGPA} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
    item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    text: { fontSize: 16 },
});

export default Calculate;
