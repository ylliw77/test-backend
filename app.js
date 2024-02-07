const express = require("express");
const { connection } = require("./db/mongo");
const Model = require("./model/crud");
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});

app.post("/users", async (req, res) => {
  const { email, name } = req.body;
  try {
    await Model.handleRegister(req.body);
  } catch (err) {
    console.log(err);
  }
});


app.put("/users", async (req, res) => {
    const { email, name } = req.body;
    try {
      await Model.updateUser(req.body);
      res.status(200).json({
        message : "Success Register User"
      })
    } catch (err) {
      console.log(err);
    }
  });

const startServer = async () => {
  try {
    // connect to the database...
    connection(process.env.MONGODB_URI);

    app.listen(3000, () =>
      console.log("Server started on port http://localhost:3000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
