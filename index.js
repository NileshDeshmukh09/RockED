const express = require('express');
const db  = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

const userRoutes = require('./routes/user.routes');
const certRoutes = require('./routes/certificate.routes');
app.use('/users', userRoutes);
app.use('/certificates', certRoutes);
// Connect to the database
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err);
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
