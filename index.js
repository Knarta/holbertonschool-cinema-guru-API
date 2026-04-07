const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth');
const titlesRouter = require('./routes/titles');
const userActivitiesRouter = require('./routes/userActivities');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/titles', titlesRouter);
app.use('/api/activity', userActivitiesRouter);

const port = process.env.PORT || 8000;
const maxDbRetries = 15;
const dbRetryDelayMs = 2000;

const startServer = async () => {
    for (let attempt = 1; attempt <= maxDbRetries; attempt += 1) {
        try {
            await sequelize.authenticate();
            break;
        } catch (err) {
            if (attempt === maxDbRetries) {
                throw err;
            }
            console.log(`Waiting for PostgreSQL... attempt ${attempt}/${maxDbRetries}`);
            await new Promise((resolve) => setTimeout(resolve, dbRetryDelayMs));
        }
    }

    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
    console.log('PostgreSQL connected');
    const data = await fs.readFile('dump.sql', 'utf8');
    await sequelize.query(data);
    console.log('DB Seeded');

    app.listen(port, () => console.log('Server running...'));
};

startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
