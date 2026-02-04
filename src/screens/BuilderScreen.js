import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_BUILDERS } from '../constants/mockBuilders';
import { Star, CheckCircle, DollarSign, Clock } from 'lucide-react-native';

const BuilderCard = ({ builder, onBook }) => (
    <View style={styles.card}>
        <View style={styles.cardTop}>
            <Image source={{ uri: builder.avatar }} style={styles.avatar} />
            <View style={styles.info}>
                <View style={styles.nameRow}>
                    <Text style={styles.name}>{builder.name}</Text>
                    {builder.isVerified && (
                        <CheckCircle size={16} color={COLORS.accent} style={{ marginLeft: 4 }} />
                    )}
                </View>
                <Text style={styles.experience}>{builder.yearsExperience} years experience</Text>
                <View style={styles.ratingRow}>
                    <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
                    <Text style={styles.rating}>{builder.rating}</Text>
                    <Text style={styles.reviews}>({builder.reviews} reviews)</Text>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>per hour</Text>
                <Text style={styles.price}>${builder.hourlyRate}</Text>
            </View>
        </View>

        <View style={styles.skillsContainer}>
            {builder.skills.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill}</Text>
                </View>
            ))}
        </View>

        <Text style={styles.bio}>{builder.bio}</Text>

        <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.messageButton} onPress={() => Alert.alert('Coming Soon', 'Messaging will be available soon!')}>
                <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookButton} onPress={() => onBook(builder)}>
                <Text style={styles.bookButtonText}>Book Session</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const BuilderScreen = () => {
    const handleBook = (builder) => {
        // TODO: Integrate RevenueCat purchase flow here
        Alert.alert(
            'Book Session',
            `Book a session with ${builder.name} for $${builder.hourlyRate}/hour?\n\nThis will open the payment flow.`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Continue', onPress: () => Alert.alert('Success', 'RevenueCat payment flow will be integrated here.') },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Builder Help</Text>
                <Text style={styles.subtitle}>Get expert advice on your van build</Text>
            </View>

            <FlatList
                data={MOCK_BUILDERS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <BuilderCard builder={item} onBook={handleBook} />}
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
        paddingBottom: SPACING.md,
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
    cardTop: {
        flexDirection: 'row',
        marginBottom: SPACING.md,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: SPACING.md,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: FONTS.h3,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    experience: {
        fontSize: FONTS.caption,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    rating: {
        color: COLORS.warning,
        fontSize: FONTS.body2,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    reviews: {
        color: COLORS.textSecondary,
        fontSize: FONTS.caption,
        marginLeft: 4,
    },
    priceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    priceLabel: {
        fontSize: FONTS.caption,
        color: COLORS.textSecondary,
    },
    price: {
        fontSize: FONTS.h2,
        fontWeight: 'bold',
        color: COLORS.success,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: SPACING.sm,
    },
    skillChip: {
        backgroundColor: 'rgba(255, 107, 107, 0.15)',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: SIZES.radius,
        marginRight: 6,
        marginBottom: 6,
    },
    skillText: {
        color: COLORS.primary,
        fontSize: FONTS.caption,
        fontWeight: '600',
    },
    bio: {
        color: COLORS.textSecondary,
        fontSize: FONTS.body2,
        lineHeight: 20,
        marginBottom: SPACING.md,
    },
    buttonRow: {
        flexDirection: 'row',
    },
    messageButton: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingVertical: SPACING.sm,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginRight: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    messageButtonText: {
        color: COLORS.white,
        fontWeight: '600',
        fontSize: FONTS.body2,
    },
    bookButton: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.sm,
        borderRadius: SIZES.radius,
        alignItems: 'center',
    },
    bookButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: FONTS.body2,
    },
});

export default BuilderScreen;
