import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const OnboardingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' }} // Placeholder van life image
                style={styles.backgroundImage}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)', COLORS.background]}
                    style={styles.gradient}
                >
                    <SafeAreaView style={styles.contentContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Find Your tribe,{'\n'}on the road.</Text>
                            <Text style={styles.subtitle}>
                                Connect with nomads, van lifers, and travelers moving in your direction.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('InviteCode')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Get Started</Text>
                        </TouchableOpacity>

                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginLink}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: SIZES.padding,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    textContainer: {
        marginBottom: SPACING.xxl,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: SPACING.md,
        lineHeight: 50,
    },
    subtitle: {
        fontSize: FONTS.body1,
        color: COLORS.textSecondary,
        lineHeight: 24,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginBottom: SPACING.xl,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: FONTS.h3,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: SPACING.lg
    },
    loginText: {
        color: COLORS.textSecondary,
        fontSize: FONTS.body2
    },
    loginLink: {
        color: COLORS.white,
        fontSize: FONTS.body2,
        fontWeight: 'bold'
    }
});

export default OnboardingScreen;
