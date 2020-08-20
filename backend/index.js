const JSONServer = require("json-server");
const server = JSONServer.create();
const Midlewares = JSONServer.defaults();
const PORT = 3000;
const DBCategories = require("./db/categories");
const DBAnimals = require("./db/animals");
const _ = require("lodash");
const AnimalsController = require("./controller/animals");

server.use(JSONServer.bodyParser);
server.use(Midlewares);

server.get("/categories", (req, res) => {
  res.jsonp(DBCategories);
});

server.get("/animals", (req, res) => {
  res.jsonp(AnimalsController.getAnimals(req));
});

server.get("/animals/:id", (req, res) => {
  const id = req.params.id;

  const result = AnimalsController.getAnimal(id);

  if (!result) {
    return res.status(404).jsonp({});
  }

  res.jsonp(result);
});

server.get("/animals/related/:id", (req, res) => {
  const id = req.params.id;

  const result = AnimalsController.getRelatedAnimal(id);

  res.jsonp(result);
});

server.get("/random", (req, res) => {
  setTimeout(() => {
    const index = Math.floor(Math.random() * 19);
    res.jsonp(DBAnimals[index]);
  }, 1000);
});

server.listen(PORT, () => {
  console.log("Server Runing");
});
