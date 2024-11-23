const express = require('express');
const app = express();
const fs = require("fs").promises;
const { notesList, deleteNote } = require('./notes_app');

const PORT = 3000;

// Paths
const NOTES_PATH = __dirname + "/notes.json";

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path}`);
    next();
})

app.get("/", (req,res) => {
    
    res.status(200);
    res.send("Succesfull");

})

// Delete note by id
app.delete("/notes/:id",(req,res) =>{
    let noteIdToDelete = req.params.id;

    console.log(noteIdToDelete);
    
    deleteNote(noteIdToDelete)
    .then(res=>{
        req.status(200);
        req.send(res);
    })
    .catch(err=>{
        req.status(400);
        req.send(err);
    })

});

app.get("/notes", (req,res) => {
    
    notesList()
        .then(notes => {
            res.status(200);
            res.json(notes);
        })
        .catch(err =>{
            res.status(400);
            res.send(err);
        })

});


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);