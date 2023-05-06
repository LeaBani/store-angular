require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();


// https://checkout.stripe.dev/

app.use(router);

app.listen(port, () => {
    console.log(`Server ready: http://localhost:${port}`);
});