import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-deck-swiper';
import SwipeCard from '../components/SwipeCard';
import { MOCK_NOMADS } from '../constants/mockData';
import { X, Heart, Star, Undo } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const swiperRef = useRef(null);
    const [cardIndex, setCardIndex] = useState(0);

    const onSwiped = (index) => {
        setCardIndex(index + 1);
    };

    const onSwipedLeft = (index) => {
        console.log('Passed on:', MOCK_NOMADS[index].name);
    };

    const onSwipedRight = (index) => {
        console.log('Liked:', MOCK_NOMADS[index].name);
        // TODO: Match logic - check if mutual like exists
    };

    const onSwipedTop = (index) => {
        console.log('Super Liked:', MOCK_NOMADS[index].name);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.logo}>nomadly</Text>
            </View>

            <View style={styles.swiperContainer}>
                <Swiper
                    ref={swiperRef}
                    cards={MOCK_NOMADS}
                    cardIndex={cardIndex}
                    renderCard={(card) => <SwipeCard card={card} />}
                    onSwiped={onSwiped}
                    onSwipedLeft={onSwipedLeft}
                    onSwipedRight={onSwipedRight}
                    onSwipedTop={onSwipedTop}
                    onSwipedAll={() => console.log('All cards swiped')}
                    stackSize={3}
                    stackScale={5}
                    stackSeparation={14}
                    animateCardOpacity
                    verticalSwipe={true}
                    horizontalSwipe={true}
                    backgroundColor={'transparent'}
                    cardVerticalMargin={0}
                    cardHorizontalMargin={(width - width * 0.9) / 2}
                    overlayLabels={{
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                    backgroundColor: 'transparent',
                                    borderColor: COLORS.error,
                                    color: COLORS.error,
                                    borderWidth: 3,
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: -30,
                                },
                            },
                        },
                        right: {
                            title: 'LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'transparent',
                                    borderColor: COLORS.success,
                                    color: COLORS.success,
                                    borderWidth: 3,
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: 30,
                                },
                            },
                        },
                        top: {
                            title: 'SUPER LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'transparent',
                                    borderColor: COLORS.accent,
                                    color: COLORS.accent,
                                    borderWidth: 3,
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                            },
                        },
                    }}
                />
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonSmall]}
                    onPress={() => swiperRef.current?.swipeBack()}
                >
                    <Undo size={22} color={COLORS.warning} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonLarge, { backgroundColor: 'rgba(238, 82, 83, 0.15)' }]}
                    onPress={() => swiperRef.current?.swipeLeft()}
                >
                    <X size={30} color={COLORS.error} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonMedium]}
                    onPress={() => swiperRef.current?.swipeTop()}
                >
                    <Star size={24} color={COLORS.accent} fill={COLORS.accent} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonLarge, { backgroundColor: 'rgba(16, 172, 132, 0.15)' }]}
                    onPress={() => swiperRef.current?.swipeRight()}
                >
                    <Heart size={30} color={COLORS.success} fill={COLORS.success} />
                </TouchableOpacity>
            </View>
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
        paddingVertical: SPACING.md,
    },
    logo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.primary,
        fontStyle: 'italic',
    },
    swiperContainer: {
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SPACING.lg,
        paddingBottom: SPACING.xl,
    },
    button: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.sm,
        ...(SHADOWS?.light || {}),
    },
    buttonSmall: {
        width: 44,
        height: 44,
    },
    buttonMedium: {
        width: 52,
        height: 52,
    },
    buttonLarge: {
        width: 64,
        height: 64,
    },
});

export default HomeScreen;
