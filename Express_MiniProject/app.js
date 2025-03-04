const express = require("express");
const app = express();
const fs = require("fs").promises;

const {
  updateNoteById,
  notesList,
  deleteNote,
  addNote,
  Note,
  findDuplicateInNoteStructure,
  searchNotes,
} = require("./notes_app");

const { error } = require("console");
const { isDataView } = require("util/types");
const { stat } = require("fs");

const PORT = 3000;

// Paths
const NOTES_PATH = __dirname + "/notes.json";

// APP.USE CASES.
// to read json post.
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
// END OF APP.USE CASES.

app.get("/", (req, res) => {
  res.status(200);
  res.send("Succesfull");
});

app.get("/notes", (req, res) => {
  notesList()
    .then((notes) => {
      res.status(200);
      res.json(notes);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});

// Delete note by id
app.delete("/notes/:id", (req, res) => {
  let noteIdToDelete = req.params.id;

  console.log("noteIdToDelete:", noteIdToDelete);

  deleteNote(noteIdToDelete)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// POST a note to the notes.
// body check and title check before adding note , using middleware.
app.post(
  "/notes",
  (req, res, next) => {
    if (req.body.title == undefined || req.body.body == undefined) {
      res.status(500).send("req.body.title or req.body.body not defined");
    } else {
      next();
    }
  },
  (req, res) => {
    addNote(new Note(req.body.title, req.body.body))
      .then((result) => {
        res.status(200).json({
          title: req.body.title,
          body: req.body.body,
          status: `200 ${result}`,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: error, status: 500 });
      });
  }
);

// Put (update) note by noteID.
app.put("/notes/:id", (req, res) => {
  const noteIdToUpdate = req.params.id;

  updateNoteById(noteIdToUpdate, new Note(req.body.title, req.body.title))
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err, status: 500 });
    });
});

// Search note by noteTitle.
app.get("/notes/:noteTitle", (req, res) => {
  const noteTitle = req.params.noteTitle;

  searchNotes(noteTitle)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err, status: 500 });
    });
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
