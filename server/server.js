require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const { CurrencyPipe } = require('@angular/common');

const app = express();

// https://checkout.stripe.dev/

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

app.post("/checkout", async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            // on accède au body de la requete dans cart.component 
            // on boucle pour recrér un nouveau tableau
            line_items: req.body.items.map((item) => ({
                currency:"euro",
                product_data: {
                    name: item.name,
                    images: [item.product]
                },
                unit_amount: item.price * 100,
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