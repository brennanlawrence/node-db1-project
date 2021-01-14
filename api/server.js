const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();
server.use(express.json());

server.post("/", (req, res) => {
  db("accounts")
    .insert(req.body)
    .then((accountid) => {
      res
        .status(201)
        .json({ message: `New account created with id: ${accountid}` });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to add account" + err.message });
    });
});

server.get("/", (req, res) => {
  db("accounts")
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get accounts" });
    });
});

server.get("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id: id })
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get accounts" });
    });
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts").where({ "id": id}).update(req.body).then((numOfAcountsUpdated) => {
    res
      .status(201)
      .json({ message: `Account updated with id: ${id}` });
  })
  .catch((err) => {
    res.status(500).json({ message: "Failed to update account" + err.message });
  });
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts").where({ "id": id}).del().then((numOfAcountsDel) => {
    res
      .status(201)
      .json({ message: `Account deleted with id: ${id}` });
  })
  .catch((err) => {
    res.status(500).json({ message: "Failed to delete account" + err.message });
  });
});

server.use(express.json());

module.exports = server;
