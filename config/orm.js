//require the connection
var connection = require("../config/connection.js");

//Helper function, adds question marks for SQL Syntax
function printQuestionMarks(num){
    var arr = [];

    for (var i = 0; i < num; i++){
        arr.push("?");
    }

    return arr.toString();
}


// Convert objects to Key value pairs
function objToPairs (ob){
    var arr = [];

    for(var key in ob){

        var value = ob[key];
        //check to skip hidden properties
        if(Object.hasOwnProperty.call(ob, key)) {
            
            //if string with spaces, add quotes
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
}


var orm = {
    all: function(tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result){
            if(err) {
                throw err;
            }
            // console.log(result);
            cb(result);
        })
    },
    //create function
    create: function(table, cols, vals, cb){
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, function(err, result){
            if(err) {
                throw err;
            }

            cb(result);
        })
    },

    //update function
    update: function(table, objColVals, condition, cb){
        var queryString = "UPDATE " + table;

        queryString += " SET";
        queryString += objToPairs(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result){
            if(err) {
                throw err;
            }
            cb(result);
        })
    }
}
module.exports = orm;