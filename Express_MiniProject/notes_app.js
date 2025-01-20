// Imports
const { error } = require("console");
const { json } = require("express");
const fs = require("fs").promises;
const process = require("process");
const { callbackify } = require("util");

const args = process.argv;

const notesJsonPath = __dirname + "\\notes.json";

// To read json file size.
const textEncoder = new TextEncoder();

function Note(title, body) {
  this.id = 0;
  this.title = title;
  this.body = body;
  this.info = function () {
    return this.id + ", " + this.title + ", " + this.body;
  };
}

var noteObject = {
  table: [],
};

// General search matching of elements in notes.json
// HARDCODED ELEMENTS.
// returns : [isDuplicate(true/false/undefined),index,message]
const noteStructureElements = ["id", "title", "body"];
async function findDuplicateInNoteStructure(elementToSearch, noteElement) {
  // Search element in notes
  let elementExists = false;
  for (let i = 0; i < noteStructureElements.length; i++) {
    if (elementToSearch == noteStructureElements[i]) {
      elementExists = true;
      break;
    }
  }

  // If element in noteStructure not found.
  if (!elementExists) {
    return [
      undefined,
      -2,
      "search element not in note structure on findDuplicateInNoteStructure.",
    ];
  }

  try {
    const data = await fs.readFile(notesJsonPath, "utf-8");
    const noteObj = JSON.parse(data);

    for (let i = 0; i < noteObj.table.length; i++) {
      if (noteElement == noteObj.table[i][elementToSearch]) {
        return [
          true,
          i,
          `Dublicate ${elementToSearch}: "${noteObj.table[i][elementToSearch]}"`,
        ];
      }
    }

    return [false, -1, `No duplicate ${elementToSearch} found`];
  } catch (error) {
    console.error("Error reading file in findDuplicateInNoteStructure", error);
    return [
      undefined,
      -2,
      "Error reading file in findDuplicateInNoteStructure",
    ];
  }
}

// Add note to js
async function addNote(noteToAdd) {
  try {
    const data = await fs.readFile(notesJsonPath, "utf-8");
    let noteObj = JSON.parse(data);
    const [isDuplicate, index, message] = await findDuplicateInNoteStructure(
      "title",
      noteToAdd.title
    );

    if (isDuplicate == false) {
      // Set Note ID.
      newNoteID = Date.now();
      noteToAdd.id = newNoteID;

      // Add content to json object
      noteObj.table.push({
        id: noteToAdd.id,
        title: noteToAdd.title,
        body: noteToAdd.body,
      });

      // noteObj to write to file, null and 2 to prettify.
      let json = JSON.stringify(noteObj, null, 2);

      // Write the json object back to the .json file.
      await fs.writeFile(notesJsonPath, json);

      return "note saved!";
    } else {
      // Error relating to findTitleDublicate().
      return message;
    }
  } catch (err) {
    console.error("Error while reading file in addNote", err);
    return "Error while reading file in addNote";
  }
}

async function deleteNote(noteIdToDelete) {
  try {
    const data = await fs.readFile(notesJsonPath, "utf-8");
    let noteObj = JSON.parse(data);

    const [isDuplicate, index, message] = await findDuplicateInNoteStructure(
      "id",
      noteIdToDelete
    );

    if (isDuplicate) {
      console.log(index);
      noteObj.table.splice(index, 1);
      let json = JSON.stringify(noteObj, null, 2);

      // Write the json object back to the .json file.
      await fs.writeFile(notesJsonPath, json);

      // Success
      return message;
    } else {
      return message;
    }
  } catch (err) {
    console.error("Error while reading file in deleteNote ", err);
    return "Error while reading file in deleteNote";
  }
}

async function notesList() {
  try {
    const data = await fs.readFile(notesJsonPath);
    const noteObject = JSON.parse(data);
    return noteObject;
  } catch (err) {
    console.error("");
    return `Error while reading notes.js on notesList(), ${err}`;
  }
}

async function searchNotes(noteTitle) {
  noteTitle = noteTitle.toLowerCase();

  try {
    const data = await fs.readFile(notesJsonPath, "utf-8");

    const noteObj = JSON.parse(data);
    let searchArr = [];

    for (let i = 0; i < noteObj.table.length; i++) {
      // Match found.
      if (noteObj.table[i].title.toLowerCase().match(noteTitle)) {
        searchArr.push(noteObj.table[i]);
      }
    }

    if (searchArr.length > 0) {
      return searchArr;
    } else {
      // No match found.
      throw "Note Title not found.";
    }
  } catch (err) {
    console.error(
      "CONSOLE: Error while reading notes.js in searchNotes()",
      err
    );
    return {
      message: `Error while reading notes.js in searchNotes(), ${err}`,
      status: 500,
    };
  }
}

async function updateNoteById(noteID, newNote) {
  try {
    const data = await fs.readFile(notesJsonPath, "utf-8");
    const noteObj = JSON.parse(data);

    const [isDuplicate, index, message] = await findDuplicateInNoteStructure(
      "id",
      noteID
    );

    const [isDuplicateTitle, indexTitle, messageTitle] =
      await findDuplicateInNoteStructure("title", newNote.title);

    if (isDuplicate && !isDuplicateTitle) {
      // Update note ID title and body.
      noteObj.table[index]["title"] = newNote.title;
      noteObj.table[index]["body"] = newNote.body;

      let json = JSON.stringify(noteObj, null, 2);
      await fs.writeFile(notesJsonPath, json);

      return `note update with id ${noteID} was sucessful!`;
    } else {
      if (!isDuplicate) {
        return [
          `Note with id ${noteID} does not exist. Please choose a valid id.`,
          -1,
        ];
      } else if (isDuplicateTitle) {
        return [
          `Title "${newNote.title}" already exists. Please choose another title.`,
          -1,
        ];
      }
    }
  } catch (err) {
    return err;
  }
}

// Control
if (args[0].endsWith("node.exe") && args[1].endsWith("app.js")) {
  switch (args[2]) {
    case "add":
      if (args[3] == undefined || args[4] == undefined) {
        throw err;
      } else {
        addNote(new Note(args[3], args[4]))
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }

    case "delete":
      if (args[3] == undefined) {
        console.log("arguement[3] does not exist.");
        break;
      } else {
        let indexToDelete = Number(args[3]);

        deleteNote(indexToDelete)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      break;

    case "search":
      if (args[3] == undefined) {
        console.log("arguement[3] does not exist.");
        break;
      } else {
        searchNotes(args[3])
          .then((searchResult) => {
            console.log(searchResult);
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      }

    case "list":
      notesList()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      break;

    case "update":
      updateNoteById(args[3], new Note(args[4], args[5]))
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }
}

module.exports = {
  updateNoteById,
  addNote,
  notesList,
  deleteNote,
  searchNotes,
  Note,
};
