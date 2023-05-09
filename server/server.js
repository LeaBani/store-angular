require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const port = 4242;

// https://checkout.stripe.dev/

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);
// console.log(process.env.STRIPE_KEY);

app.post('/checkout', async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['DE', 'FR'],
              },
            shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 0,
                      currency: 'eur',
                    },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 5,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 7,
                      },
                    },
                  },
                },
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 1500,
                      currency: 'eur',
                    },
                    display_name: 'Next day air',
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 1,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 1,
                      },
                    },
                  },
                },
              ],
            // on accède au body de la requete dans cart.component 
            // on boucle pour recrér un nouveau tableau
            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency:"eur",
                    product_data: {
                        name: item.name,
                        images: [item.product]
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
        })),
        mode: "payment",
        success_url: "http://localhost:4242/success.html",
        cancel_url: "http://localhost:4242/cancel.html"
        });

        res.status(200).json(session);
        console.log('session', session);

    } catch (error) {
        next(error);
    }
});

app.listen(port, () => {
    console.log(`Server ready: http://localhost:${port}`);
});