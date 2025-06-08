const express = require('express');
const app = express();
const gameRoutes = require('./routes/game');
app.use(express.json());

app.use('/api/game', gameRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})