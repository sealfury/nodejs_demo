const app = require("../../server");
const supertest = require("supertest");
const { expect, jsonResponse } = require("../specHelper");
const { after } = require("mocha");

let server, request, response;

before(done => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after(done => {
  server.close(done);
});

describe("GET /books", () => {
  beforeEach(async () => {
    response = await request.get("/books");
  });

  it("is expected to respond with status 200", () => {
    expect(response.status).to.equal(200);
  });

  it('is expected to return a collection of books', () => {
    const expectedBody = '{"books":[{"id":1,"author":"J.K. Rowling","title":"Harry Potter"},{"id":2,"author":"A. Lindgren","title":"The Adventures of Pippi Longstocking"},{"id":6,"author":"John Irving","title":"Setting Free The Bears"},{"id":7,"author":"David Mitchell","title":"Star Of The Sea"},{"id":3,"author":"T. Ochman","title":"Fun With Postgres part II"}]}'
    expect(jsonResponse(response)).to.equal(expectedBody)
  });
});
