import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const NOMAD_TYPES = ['Van Lifer', 'Digital Nomad', 'Overlander', 'Seasonal Worker', 'Backpacker'];
const TRAVEL_STYLES = ['Slow Travel', 'Fast Paced', 'Seasonal', 'Weekend Warrior'];

const CreateProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [interests, setInterests] = useState('');

    const handleContinue = () => {
        // TODO: Save profile to Supabase
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    };

    const renderOption = (options, selected, onSelect) => (
        <View style={styles.chipsContainer}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option}
                    style={[styles.chip, selected === option && styles.chipSelected]}
                    onPress={() => onSelect(option)}
                >
                    <Text style={[styles.chipText, selected === option && styles.chipTextSelected]}>
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Who are you?</Text>
                        <Text style={styles.subtitle}>Help others find you on the road.</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>My Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Alex Supertramp"
                            placeholderTextColor={COLORS.textSecondary}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>I am a...</Text>
                        {renderOption(NOMAD_TYPES, selectedType, setSelectedType)}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Travel Style</Text>
                        {renderOption(TRAVEL_STYLES, selectedStyle, setSelectedStyle)}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Interests (comma separated)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Hiking, Coding, Coffee..."
                            placeholderTextColor={COLORS.textSecondary}
                            value={interests}
                            onChangeText={setInterests}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Complete Profile</Text>
                        <Ionicons name="arrow-forward" size={20} color={COLORS.white} style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        padding: SIZES.padding,
        paddingBottom: 40,
    },
    header: {
        marginBottom: SPACING.xl,
        marginTop: SPACING.md,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONTS.body1,
        color: COLORS.textSecondary,
    },
    inputGroup: {
        marginBottom: SPACING.xl,
    },
    label: {
        fontSize: FONTS.h3,
        color: COLORS.white,
        marginBottom: SPACING.sm,
        fontWeight: '600',
    },
    input: {
        backgroundColor: COLORS.surface,
        color: COLORS.white,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        fontSize: FONTS.body1,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    chip: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        margin: 4,
    },
    chipSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    chipText: {
        color: COLORS.textSecondary,
        fontSize: FONTS.body2,
        fontWeight: '600',
    },
    chipTextSelected: {
        color: COLORS.white,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.md,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: FONTS.h3,
        fontWeight: 'bold',
    },
});

export default CreateProfileScreen;
