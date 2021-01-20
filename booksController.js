const { pool } = require("./config");

const booksController = {
  async index(request, response, next) {
    const { rows } = await pool.query("SELECT * FROM books");
    response.status(200).json({ books: rows });
  },
  async create(request, response, next) {
    const { author, title } = request.body;
    await pool.query("INSERT INTO books (author, title) VALUES ($1, $2)", [
      author,
      title,
    ]);
    response.status(201).json({ message: "Book was added to the db" });
  },
};

module.exports = { booksController };
