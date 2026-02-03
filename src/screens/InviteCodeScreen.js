import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const InviteCodeScreen = ({ navigation }) => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = async () => {
        if (!code) {
            Alert.alert('Error', 'Please enter an invite code.');
            return;
        }

        setIsLoading(true);
        // TODO: Implement actual Supabase check here
        setTimeout(() => {
            setIsLoading(false);
            if (code.toLowerCase() === 'shipyard') {
                navigation.navigate('CreateProfile'); // Will create this later
            } else {
                Alert.alert('Invalid Code', 'This invite code is not valid or has already been used.');
            }
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <SafeAreaView style={styles.safeArea}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.content}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                        </TouchableOpacity>

                        <View style={styles.header}>
                            <Text style={styles.title}>Enter Invite Code</Text>
                            <Text style={styles.subtitle}>
                                Nomadly is currently in private beta. You need an invite code to join.
                            </Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="INVITE CODE"
                                placeholderTextColor={COLORS.textSecondary}
                                value={code}
                                onChangeText={setCode}
                                autoCapitalize="characters"
                                autoCorrect={false}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isLoading && styles.buttonDisabled]}
                            onPress={handleVerify}
                            disabled={isLoading}
                        >
                            <Text style={styles.buttonText}>
                                {isLoading ? 'Verifying...' : 'Continue'}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.helpContainer}>
                            <Text style={styles.helpText}>Don't have a code?</Text>
                            <TouchableOpacity>
                                <Text style={styles.helpLink}>Join the waitlist</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: SIZES.padding,
    },
    backButton: {
        marginTop: SPACING.md,
        marginBottom: SPACING.xl,
    },
    header: {
        marginBottom: SPACING.xxl,
    },
    title: {
        fontSize: FONTS.h1,
        color: COLORS.white,
        fontWeight: 'bold',
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONTS.body1,
        color: COLORS.textSecondary,
        lineHeight: 22,
    },
    inputContainer: {
        marginBottom: SPACING.xl,
    },
    input: {
        backgroundColor: COLORS.surface,
        color: COLORS.white,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        fontSize: FONTS.h3,
        letterSpacing: 2,
        borderWidth: 1,
        borderColor: COLORS.border,
        textAlign: 'center',
        height: 60,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: FONTS.h3,
        fontWeight: '600',
    },
    helpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: SPACING.md,
    },
    helpText: {
        color: COLORS.textSecondary,
        marginRight: SPACING.xs,
    },
    helpLink: {
        color: COLORS.accent,
        fontWeight: 'bold',
    },
});

export default InviteCodeScreen;
