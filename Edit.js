import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const Edit = ({ navigation, route }) => {
    const { module, setModules } = route.params;
    const [updatedModule, setUpdatedModule] = useState(module.key);
    const [updatedGrade, setUpdatedGrade] = useState(module.grade);

    const handleSave = () => {
        setModules((prevModules) =>
            prevModules.map((mod) => (mod.key === module.key ? { ...mod, key: updatedModule, grade: updatedGrade } : mod))
        );
        Toast.show({ type: 'success', text1: 'Success', text2: 'Module updated successfully!' });
        navigation.goBack();
    };

    const handleDelete = () => {
        setModules((prevModules) => prevModules.filter((mod) => mod.key !== module.key));
        Toast.show({ type: 'error', text1: 'Deleted', text2: 'Module deleted successfully!' });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={updatedModule} onChangeText={setUpdatedModule} placeholder="Module" />
            <TextInput style={styles.input} value={updatedGrade} onChangeText={setUpdatedGrade} placeholder="Grade (A-F)" />
            <Button title="Save Changes" onPress={handleSave} />
            <Button title="Delete Module" onPress={handleDelete} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 16, padding: 8, fontSize: 16, borderRadius: 4 },
});

export default Edit;
