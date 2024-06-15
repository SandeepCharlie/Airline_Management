const stripe = require('stripe')(process.env.STRIPEKEY);
const User = require("../models/userSchema");

const createCheckoutSession = async (amount) => {
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [{
                name: "Flight Reservation",
                amount: amount * 100,
                currency: "USD",
                quantity: 1
            }],
        });

        return session;
    } catch (e) {
        console.log(e);
        return false;
    }
}



module.exports = { createCheckoutSession };