const mongojs = require("mongojs");
const databaseName = "Hamrah";
const uri = `mongodb+srv://user:pass@mongodb.server/${databaseName}?retryWrites=true&w=majority`;
const db = mongojs(uri);
const collection = db.collection("requests");

const insert = (body, res) => {
  collection.insertOne(body, (err, result) => {
    if (err) {
      throw err;
    }

    res.send("payload inserted.");
  });
};

const find = (res) => {
  collection.find({}, { _id: 0 }, (err, doc) => {
    if (err) {
      throw err;
    }

    res.json(doc);
  });
};

const remove = (res) => {
  collection.remove({}, (err, result) => {
    if (err) {
      throw err;
    }

    res.send("records deleted.");
  });
};

module.exports = async (req, res) => {
  console.log("->", req.method, "request received.");

  switch (req.method) {
    case "POST":
      insert(req.body, res);
      break;
    case "GET":
      find(res);
      break;
    case "DELETE":    
      remove(res);
      break;
    default:
      res.send(`unsupported method ${method}`);
  }
};
