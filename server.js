var path = require('path');
//========== EXPRESS ==============
const express = require('express');
const app = express();
//========== BODY PARSER ==============
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//======= MONGOOSE ==========
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/1955_db');
mongoose.Promise = global.Promise;

var PersonSchema = new mongoose.Schema({
    name: {
        type: String,
    }
},
    {
        timestamps: true
    }
)
var Person = mongoose.model("Person", PersonSchema);

// ================ ROUTES =====================
app.get("/", function(request, response){
    Person.find({}, function(error, data){
        if(error){
            console.log("could not load people from data base");
            response.json({message: "Error", error: error})
        }
        else {
            response.json({message: "Success", data: data})
        }
    })
})

app.get("/new/:name/", function(request, response){
    var new_person = new Person({
        name: request.params.name,
    })
    new_person.save(function(error){
        if(error){
            console.log("could not save person in our data base");
            response.json({message: "Error", error: error})
        } else {
            response.json({message: "Success" })
        }
    })
})

app.get("/remove/:name/", function(request, response){
    Person.remove({name: request.params.name}, function(error){
        if(error){
            console.log("could not delete name");
            response.json({message: "Error", error: error})
        } else {
            console.log("successfully deleted name");
            response.json({message: "Success" });
        }
    })

})

app.get("/:name", function(request, response){
    Person.find({name: request.params.name}, function (error, data){
        if(error){
            console.log("could not find name");
            response.json({message: "Error", error: error})
        } else {
            console.log("successfully found name to display");
            response.json({message: "Success" , data: data});
        }
    })
})


app.listen(8000, function () {
    console.log("I am in port 8000");
})