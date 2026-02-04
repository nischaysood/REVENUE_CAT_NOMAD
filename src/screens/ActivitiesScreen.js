import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_ACTIVITIES, ACTIVITY_TYPES } from '../constants/mockActivities';
import { MapPin, Calendar, Users, Mountain, Coffee, Tent, PersonStanding } from 'lucide-react-native';

const getActivityIcon = (type) => {
    switch (type) {
        case 'Hiking':
            return <Mountain size={18} color={COLORS.accent} />;
        case 'Climbing':
            return <Mountain size={18} color={COLORS.warning} />;
        case 'Coworking':
            return <Coffee size={18} color={COLORS.primary} />;
        case 'Campfire':
            return <Tent size={18} color={COLORS.warning} />;
        case 'Yoga':
            return <PersonStanding size={18} color={COLORS.success} />;
        default:
            return <Mountain size={18} color={COLORS.textSecondary} />;
    }
};

const ActivityCard = ({ activity }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <View style={styles.cardHeader}>
            <View style={styles.typeChip}>
                {getActivityIcon(activity.type)}
                <Text style={styles.typeText}>{activity.type}</Text>
            </View>
            <View style={styles.participantsChip}>
                <Users size={12} color={COLORS.textSecondary} />
                <Text style={styles.participantsText}>{activity.participants}/{activity.maxParticipants}</Text>
            </View>
        </View>

        <Text style={styles.activityTitle}>{activity.title}</Text>

        <View style={styles.metaRow}>
            <MapPin size={14} color={COLORS.primary} />
            <Text style={styles.metaText}>{activity.location}</Text>
        </View>
        <View style={styles.metaRow}>
            <Calendar size={14} color={COLORS.accent} />
            <Text style={styles.metaText}>{activity.date} • {activity.time}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>{activity.description}</Text>

        <View style={styles.hostRow}>
            <Image source={{ uri: activity.host.avatar }} style={styles.hostAvatar} />
            <Text style={styles.hostName}>Hosted by {activity.host.name}</Text>
        </View>

        <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Activity</Text>
        </TouchableOpacity>
    </TouchableOpacity>
);

const ActivitiesScreen = () => {
    const [selectedType, setSelectedType] = useState(null);

    const filteredActivities = selectedType
        ? MOCK_ACTIVITIES.filter(a => a.type === selectedType)
        : MOCK_ACTIVITIES;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Find Activities</Text>
                <Text style={styles.subtitle}>Connect with nomads nearby</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterContainer}
                contentContainerStyle={styles.filterContent}
            >
                <TouchableOpacity
                    style={[styles.filterChip, !selectedType && styles.filterChipActive]}
                    onPress={() => setSelectedType(null)}
                >
                    <Text style={[styles.filterText, !selectedType && styles.filterTextActive]}>All</Text>
                </TouchableOpacity>
                {ACTIVITY_TYPES.map((type) => (
                    <TouchableOpacity
                        key={type.id}
                        style={[styles.filterChip, selectedType === type.name && styles.filterChipActive]}
                        onPress={() => setSelectedType(type.name)}
                    >
                        <Text style={[styles.filterText, selectedType === type.name && styles.filterTextActive]}>
                            {type.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={filteredActivities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ActivityCard activity={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.sm,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    subtitle: {
        fontSize: FONTS.body2,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    filterContainer: {
        maxHeight: 50,
        marginBottom: SPACING.sm,
    },
    filterContent: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
    },
    filterChip: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: 20,
        marginRight: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    filterChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterText: {
        color: COLORS.textSecondary,
        fontWeight: '600',
        fontSize: FONTS.body2,
    },
    filterTextActive: {
        color: COLORS.white,
    },
    listContent: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        ...(SHADOWS?.light || {}),
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    typeChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 210, 211, 0.1)',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: SIZES.radius,
    },
    typeText: {
        color: COLORS.accent,
        fontSize: FONTS.caption,
        fontWeight: '600',
        marginLeft: 4,
    },
    participantsChip: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    participantsText: {
        color: COLORS.textSecondary,
        fontSize: FONTS.caption,
        marginLeft: 4,
    },
    activityTitle: {
        fontSize: FONTS.h3,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: SPACING.sm,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    metaText: {
        color: COLORS.textSecondary,
        fontSize: FONTS.caption,
        marginLeft: 6,
    },
    description: {
        color: COLORS.textSecondary,
        fontSize: FONTS.body2,
        lineHeight: 18,
        marginTop: SPACING.sm,
        marginBottom: SPACING.md,
    },
    hostRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    hostAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: SPACING.sm,
    },
    hostName: {
        color: COLORS.textSecondary,
        fontSize: FONTS.caption,
    },
    joinButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.sm,
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    joinButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: FONTS.body2,
    },
});

export default ActivitiesScreen;
