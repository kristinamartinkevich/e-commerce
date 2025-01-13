import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const stripePK = import.meta.env.VITE_STRIPE_PK;

const getStripe = (): Promise<Stripe | null> => {
    if (!stripePromise) {
        stripePromise = loadStripe(stripePK);
    }
    return stripePromise;
};

export default getStripe;