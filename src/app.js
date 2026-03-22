import express from 'express';
import sequelize from './util/db.js';
import cors from 'cors';

import controllerErrors from './middlewares/catchControllerErrors.js';

import generalRouters from './routes/general.js';
import authRouters from './routes/auth.js';
import recommendationRouters from './routes/recommendation.js';
import curriculumsRouters from './routes/curriculum.js';
import tagRouters from './routes/tag.js';


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('src/uploads'));

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use('/api', generalRouters);
app.use('/api', authRouters);
app.use('/api', recommendationRouters);
app.use('/api', curriculumsRouters);
app.use('/api', tagRouters);

app.use(controllerErrors);


sequelize.authenticate().then(function () {
  console.log("Connected successfully!");
}).catch(function (erro) {
  console.log("Failed to connect: " + erro);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server online on port ${process.env.PORT || 3000}`);
});


