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


describe("GET /books/:id", () => {
  beforeEach(async () => {
    response = await request.get("/books/1");
  });

  it("is expected to respond with status 200", () => {
    expect(response.status).to.equal(200);
  });

  it('is expected to return a specific book', () => {
    const expectedBody = '{"book":{"id":1,"author":"J.K. Rowling","title":"Harry Potter"}}'
    expect(jsonResponse(response)).to.equal(expectedBody)
  });
});