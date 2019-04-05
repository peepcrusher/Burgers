//require express
var express = require("express");

var router = express.Router();

//import the food model
var food = require("../models/burger.js");

//create our routes

router.get("/", function (req, res) {
    food.all(function (data) {
        var hbsObject = {
            food: data
        };
        res.render("index", hbsObject);
    });
});

router.post("/api/foods", function (req, res) {
    food.create([
        "food", "eaten"
    ],
        [
            req.body.food, req.body.eaten
        ], function (result) {
            res.json({ id: result.insertId });
        });
});

router.put("/api/foods/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    food.update({
        eaten: req.body.eaten
    }, condition, function (result) {

        if(result.changedRows == 0){
            return res.status(404).end();
        }

        else {
            res.status(200).end();
        }
    })
}
)

module.exports = router;