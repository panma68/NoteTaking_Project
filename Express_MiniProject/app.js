const express = require('express');
const app = express();
const fs = require("fs").promises;

const {updateNoteById ,notesList, deleteNote, addNote, Note, findDuplicateInNoteStructure } = require('./notes_app');

const { error } = require('console');
const { isDataView } = require('util/types');

const PORT = 3000;

// Paths
const NOTES_PATH = __dirname + "/notes.json";


// APP.USE CASES.
// to read json post.
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
})
// END OF APP.USE CASES.

app.get("/", (req, res) => {

    res.status(200);
    res.send("Succesfull");

})

app.get("/notes", (req, res) => {

    notesList()
        .then(notes => {
            res.status(200);
            res.json(notes);
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        })

});

// Delete note by id
app.delete("/notes/:id", (req, res) => {

    let noteIdToDelete = req.params.id;

    console.log("noteIdToDelete:", noteIdToDelete);

    deleteNote(noteIdToDelete)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });

});


// POST a note to the notes.
app.post("/notes", (req, res) => {
    try {
        if (req.body.title == undefined || req.body.body == undefined) {
            throw "req.body.title or req.body.body not defined";
        }

        addNote(new Note(req.body.title, req.body.body))
            .then((result) => {
                res.status(200).json({ title: req.body.title, body: req.body.body, status: `200 ${result}` });
            })
            .catch(error => {
                res.status(500).json({ message: error, status: 500 })
            })
    }
    catch (err) {
        res.status(500).json({ message: err, status: 500 });
    }

})

// Put (update) note by noteID.
app.put("/notes/:id", (req, res) => {

    const noteIdToUpdate = req.params.id;
    console.log(noteIdToUpdate);
    console.log(req.body.title, req.body.title);
    
    updateNoteById(noteIdToUpdate, new Note(req.body.title, req.body.title))
    .then(result => { res.status(200).send(result); })
    .catch(err => { res.status(500).send(err); })
})


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);