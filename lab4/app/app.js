const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const app = express();
const port = process.env.PORT || 3000;


const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});


async function seedBooks() {
  const count = await Book.count();
  if (count === 0) {
    await Book.bulkCreate([
      { title: 'title1', author: 'author1' },
      { title: 'title2', author: 'author2' },
      { title: 'title3', author: 'author3' },
    ]);
  }
}


app.get('/', async (req, res) => {
  try {
    const book = await Book.findOne({ where: { title: 'title2' } });
    if (book) {
      res.send(`Author of the book "title2" is ${book.author}`);
    } else {
      res.send(`Book with title "title2" not found`);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});


sequelize.authenticate().then(() => {
  console.log('Database connected...');
  seedBooks().then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

