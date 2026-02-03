import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { COLORS, FONTS, SPACING, SIZES, SHADOWS } from '../constants/theme';
import { MapPin, Navigation, Clock, CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.65;

const SwipeCard = ({ card }) => {
    if (!card) return null;

    return (
        <View style={styles.card}>
            <Image source={{ uri: card.avatar }} style={styles.image} />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>{card.name}, {card.age}</Text>
                        {card.isVerified && (
                            <CheckCircle size={20} color={COLORS.accent} style={{ marginLeft: 6 }} />
                        )}
                    </View>
                    <Text style={styles.type}>{card.nomadType} • {card.travelStyle}</Text>

                    <View style={styles.locationContainer}>
                        <View style={styles.locationRow}>
                            <MapPin size={14} color={COLORS.primary} />
                            <Text style={styles.locationText}>{card.currentLocation}</Text>
                        </View>
                        <View style={styles.locationRow}>
                            <Navigation size={14} color={COLORS.accent} />
                            <Text style={styles.locationText}>{card.nextDestination}</Text>
                        </View>
                    </View>

                    <View style={styles.leavingBadge}>
                        <Clock size={12} color={COLORS.warning} />
                        <Text style={styles.leavingText}>Leaving in {card.leavingIn} days</Text>
                    </View>

                    <View style={styles.interestsContainer}>
                        {card.interests.map((interest, index) => (
                            <View key={index} style={styles.interestChip}>
                                <Text style={styles.interestText}>{interest}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.bio} numberOfLines={2}>{card.bio}</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: SIZES.radius * 2,
        overflow: 'hidden',
        backgroundColor: COLORS.surface,
        ...SHADOWS.medium,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55%',
        justifyContent: 'flex-end',
        padding: SPACING.lg,
    },
    content: {
        // Content styles
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    type: {
        fontSize: FONTS.body2,
        color: COLORS.textSecondary,
        marginTop: 2,
        marginBottom: SPACING.sm,
    },
    locationContainer: {
        flexDirection: 'row',
        marginBottom: SPACING.sm,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    locationText: {
        color: COLORS.white,
        fontSize: FONTS.caption,
        marginLeft: 4,
    },
    leavingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 159, 67, 0.2)',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: SIZES.radius,
        alignSelf: 'flex-start',
        marginBottom: SPACING.sm,
    },
    leavingText: {
        color: COLORS.warning,
        fontSize: FONTS.caption,
        fontWeight: '600',
        marginLeft: 4,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: SPACING.sm,
    },
    interestChip: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: 12,
        marginRight: 6,
        marginBottom: 4,
    },
    interestText: {
        color: COLORS.white,
        fontSize: FONTS.caption,
    },
    bio: {
        color: COLORS.textSecondary,
        fontSize: FONTS.body2,
        lineHeight: 18,
    },
});

export default SwipeCard;
