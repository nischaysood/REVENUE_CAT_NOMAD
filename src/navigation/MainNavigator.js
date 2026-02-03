import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import BuilderScreen from '../screens/BuilderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../constants/theme';
import { Home, Map, Hammer, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.surface,
                    borderTopColor: COLORS.border,
                    height: Platform.OS === 'ios' ? 88 : 60,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Explore"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Activities"
                component={ActivitiesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Builders"
                component={BuilderScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Hammer color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default MainNavigator;
