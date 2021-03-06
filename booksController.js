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
  async show(request, response, next) {
    const { id } = request.params;
    const {
      rows,
    } = await pool.query("SELECT * FROM books WHERE id = $1 LIMIT 1", [id]);
    response.status(200).json({ book: rows[0] });
  },
  async delete(request, response, next) {
    const { id } = request.params;
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
    response
      .status(202)
      .json({ message: "Book successfully removed from database" });
  },
  async update(request, response, next) {
    const { author, title } = request.body;
    const { id } = request.params;
    const { rows } = await pool.query(
      `UPDATE books
      SET author = $1, title = $2
      WHERE id = $3`,
      [author, title, id]
    );
    response
      .status(201)
      .json({ message: "Book was updated in the DB", book: rows[0] });
  },
};

module.exports = { booksController };
