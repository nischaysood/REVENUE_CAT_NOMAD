import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import InviteCodeScreen from '../screens/InviteCodeScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: COLORS.background },
                ...TransitionPresets.SlideFromRightIOS,
            }}
            initialRouteName="Onboarding"
        >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="InviteCode" component={InviteCodeScreen} />
            <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
