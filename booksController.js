const { pool } = require("./config");

const booksController = {
  index(request, response, next) {
    pool.query("SELECT * FROM books", (error, results) => {
      if (error) {
        throw error;
      } else {
        response.status(200).json({ books: results.rows });
      }
    });
  },
  create(request, response, next) {
    const { author, title } = request.body;
    pool.query(
      "INSERT INTO books (author, title) VALUES ($1, $2)",
      [author, title],
      error => {
        if (error) {
          throw error;
        }
        response.status(201).json({ message: "Book was added to the db" });
      }
    );
  },
};

module.exports = { booksController }