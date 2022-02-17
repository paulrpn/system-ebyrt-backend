const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 3333;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening on port ${port}!`));
