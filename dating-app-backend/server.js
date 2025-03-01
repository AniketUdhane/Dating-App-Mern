import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';
//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  'mongodb+srv://<username>:<password>@cluster0.nj651.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//MiddleWare
app.use(express.json());
app.use(Cors());

//DB Config
mongoose
  .connect(connection_url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    // socketTimeoutMS: 45000, // 45 seconds
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection failed:', err));

//API Endpoints
app.get('/', (req, res) => res.status(200).send('hello ji'));

app.post('/dating/cards', async (req, res) => {
  try {
    const dbCard = await Cards.create(req.body);
    res.status(201).json(dbCard);
  } catch (error) {
    console.error('Error handling cards: ', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

app.get('/dating/cards', async (req, res) => {
  try {
    const dbcards = await Cards.find();
    res.status(200).json(dbcards);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ error: 'Failed to retrieve card' });
  }
});
//Listner
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
