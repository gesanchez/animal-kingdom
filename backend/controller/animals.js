const _ = require("lodash");
const DBCategories = require("../db/categories");
const DBAnimals = require("../db/animals");

module.exports.getAnimals = (req) => {
  const limit = req.query.limit || 10;
  const order = req.query.order;
  const category = req.query.category;
  const page = req.query.page || 1;
  const filters = {};

  let rated = _.sortBy(DBAnimals, order);

  if (order === "view") {
    rated = rated.reverse();
  }

  if (category) {
    const index = _.findIndex(DBCategories, x => x.title === category);
    if (index !== -1) {
      filters["category"] = DBCategories[index].id;
    } else {
      filters["category"] = 0;
    }
  }

  rated = _.filter(rated, filters);
  const start = (page - 1) * 10;

  return {
    data: rated.slice(start, limit * page),
    count: rated.length,
    page: parseInt(page) + 1
  };
};

module.exports.getAnimal = (id) => {
  const index = _.findIndex(DBAnimals, x => x.id === parseInt(id));
  if (index === -1) {
    return null;
  }

  DBAnimals[index].view += 1;

  return DBAnimals[index];
};

module.exports.getRelatedAnimal = (id) => {
  const index = _.findIndex(DBAnimals, x => x.id === parseInt(id));
  if (index === -1) {
    return null;
  }
  let flag = true;
  const related = [];
  const count = _.filter(DBAnimals, (o) => o.category === DBAnimals[index].category);
  if (count.length > 0) {
    while (flag) {
      const random = Math.floor(Math.random() * count.length);
      if (
        count[random].id !== DBAnimals[index].id &&
        !_.find(related, x => x.id === count[random].id)
      ) {
        related.push(count[random]);
      }

      if (related.length === 3) {
        flag = false;
      }
    }
  }

  return related;
};
