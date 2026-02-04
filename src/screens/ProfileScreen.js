import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, MapPin, Navigation, Shield, Crown, ChevronRight, LogOut, Edit3 } from 'lucide-react-native';

// Mock user data
const USER = {
    name: 'Alex',
    age: 29,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    nomadType: 'Van Lifer',
    travelStyle: 'Slow Travel',
    currentLocation: 'Joshua Tree, CA',
    nextDestination: 'Sedona, AZ',
    leavingIn: 12,
    interests: ['Hiking', 'Photography', 'Coffee'],
    bio: 'Living the dream in my Sprinter. Always chasing sunsets.',
    isVerified: true,
    isPremium: false,
};

const SettingsItem = ({ icon, label, onPress, showBadge }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.settingsItemLeft}>
            {icon}
            <Text style={styles.settingsLabel}>{label}</Text>
            {showBadge && (
                <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>PRO</Text>
                </View>
            )}
        </View>
        <ChevronRight size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
);

const ProfileScreen = () => {
    const handleUpgrade = () => {
        Alert.alert(
            'Upgrade to Nomad+',
            'Get unlimited matches, advanced filters, and priority visibility for $9.99/month.',
            [
                { text: 'Maybe Later', style: 'cancel' },
                { text: 'Upgrade Now', onPress: () => Alert.alert('Coming Soon', 'RevenueCat paywall will be shown here.') },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <TouchableOpacity>
                        <Settings size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileCard}>
                    <Image source={{ uri: USER.avatar }} style={styles.avatar} />
                    <View style={styles.profileInfo}>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>{USER.name}, {USER.age}</Text>
                            {USER.isVerified && (
                                <Shield size={18} color={COLORS.accent} style={{ marginLeft: 6 }} />
                            )}
                        </View>
                        <Text style={styles.type}>{USER.nomadType} • {USER.travelStyle}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Edit3 size={18} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.locationCard}>
                    <View style={styles.locationRow}>
                        <MapPin size={16} color={COLORS.primary} />
                        <Text style={styles.locationLabel}>Currently in</Text>
                        <Text style={styles.locationValue}>{USER.currentLocation}</Text>
                    </View>
                    <View style={styles.locationRow}>
                        <Navigation size={16} color={COLORS.accent} />
                        <Text style={styles.locationLabel}>Headed to</Text>
                        <Text style={styles.locationValue}>{USER.nextDestination}</Text>
                    </View>
                    <View style={styles.leavingBadge}>
                        <Text style={styles.leavingText}>Leaving in {USER.leavingIn} days</Text>
                    </View>
                </View>

                {!USER.isPremium && (
                    <TouchableOpacity style={styles.upgradeCard} onPress={handleUpgrade}>
                        <Crown size={24} color={COLORS.warning} />
                        <View style={styles.upgradeInfo}>
                            <Text style={styles.upgradeTitle}>Upgrade to Nomad+</Text>
                            <Text style={styles.upgradeSubtitle}>Unlimited matches & more</Text>
                        </View>
                        <ChevronRight size={20} color={COLORS.warning} />
                    </TouchableOpacity>
                )}

                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <View style={styles.settingsCard}>
                        <SettingsItem
                            icon={<Shield size={20} color={COLORS.accent} />}
                            label="Verification Status"
                            onPress={() => { }}
                        />
                        <SettingsItem
                            icon={<Crown size={20} color={COLORS.warning} />}
                            label="Subscription"
                            onPress={handleUpgrade}
                            showBadge={USER.isPremium}
                        />
                        <SettingsItem
                            icon={<Settings size={20} color={COLORS.textSecondary} />}
                            label="Account Settings"
                            onPress={() => { }}
                        />
                        <SettingsItem
                            icon={<LogOut size={20} color={COLORS.error} />}
                            label="Log Out"
                            onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?')}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.md,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.lg,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.md,
        ...(SHADOWS?.light || {}),
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: SPACING.md,
    },
    profileInfo: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: FONTS.h2,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    type: {
        fontSize: FONTS.body2,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    editButton: {
        padding: SPACING.sm,
        backgroundColor: COLORS.background,
        borderRadius: SIZES.radius,
    },
    locationCard: {
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.lg,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.md,
        ...(SHADOWS?.light || {}),
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    locationLabel: {
        color: COLORS.textSecondary,
        fontSize: FONTS.body2,
        marginLeft: SPACING.sm,
        marginRight: SPACING.sm,
    },
    locationValue: {
        color: COLORS.white,
        fontSize: FONTS.body2,
        fontWeight: '600',
    },
    leavingBadge: {
        backgroundColor: 'rgba(255, 159, 67, 0.15)',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: SIZES.radius,
        alignSelf: 'flex-start',
        marginTop: SPACING.xs,
    },
    leavingText: {
        color: COLORS.warning,
        fontSize: FONTS.caption,
        fontWeight: '600',
    },
    upgradeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 159, 67, 0.1)',
        marginHorizontal: SPACING.lg,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.warning,
    },
    upgradeInfo: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    upgradeTitle: {
        color: COLORS.warning,
        fontSize: FONTS.body1,
        fontWeight: 'bold',
    },
    upgradeSubtitle: {
        color: COLORS.textSecondary,
        fontSize: FONTS.caption,
    },
    settingsSection: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xxl,
    },
    sectionTitle: {
        color: COLORS.textSecondary,
        fontSize: FONTS.body2,
        fontWeight: '600',
        marginBottom: SPACING.sm,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    settingsCard: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        ...(SHADOWS?.light || {}),
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    settingsItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsLabel: {
        color: COLORS.white,
        fontSize: FONTS.body1,
        marginLeft: SPACING.md,
    },
    premiumBadge: {
        backgroundColor: COLORS.warning,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: SPACING.sm,
    },
    premiumBadgeText: {
        color: COLORS.background,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
