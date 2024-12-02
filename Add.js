import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const Add = ({ navigation, route }) => {
    const { setModules } = route.params;
    const [module, setModule] = useState('');
    const [grade, setGrade] = useState('');

    const handleAdd = () => {
        if (!module || !grade) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Please fill all fields!' });
            return;
        }

        setModules((prevModules) => [...prevModules, { key: module, grade }]);
        Toast.show({ type: 'success', text1: 'Success', text2: 'Module added successfully!' });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Module:</Text>
            <TextInput style={styles.input} value={module} onChangeText={setModule} placeholder="Enter module" />
            <Text style={styles.label}>Grade:</Text>
            <TextInput style={styles.input} value={grade} onChangeText={setGrade} placeholder="Enter grade (A-F)" />
            <Button title="Add Module" onPress={handleAdd} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    label: { fontSize: 16, marginBottom: 8 },
    input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 16, padding: 8, fontSize: 16, borderRadius: 4 },
});

export default Add;
