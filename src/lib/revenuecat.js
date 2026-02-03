import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

const API_KEYS = {
    apple: 'YOUR_APPLE_API_KEY',
    google: 'YOUR_GOOGLE_API_KEY',
};

export const configurePurchases = async () => {
    if (Platform.OS === 'ios') {
        await Purchases.configure({ apiKey: API_KEYS.apple });
    } else if (Platform.OS === 'android') {
        await Purchases.configure({ apiKey: API_KEYS.google });
    }
};

export const ENTITLEMENTS = {
    NOMAD_PLUS: 'nomad_plus',
};

export const checkNomadPlus = async () => {
    try {
        const customerInfo = await Purchases.getCustomerInfo();
        return customerInfo.entitlements.active[ENTITLEMENTS.NOMAD_PLUS] !== undefined;
    } catch (e) {
        return false;
    }
};
