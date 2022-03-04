var express = require("express");
var app = express();

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.post("/reg", (req, res, next) => {
    console.log(req.body); //lägg till post
});

//node js write to file och node js read file