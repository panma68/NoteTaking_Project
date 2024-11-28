// Imports
const { json } = require("express");
const fs = require("fs").promises;
const process = require("process");
const { callbackify } = require("util");

const args = process.argv;

const notesJsonPath = __dirname + "\\notes.json";

// To read json file size.
const textEncoder = new TextEncoder();

function Note(title, body) {
    this.id = 0
    this.title = title
    this.body = body
    this.info = function () {
        return this.id + ", " + this.title + ", " + this.body;
    }
}

var noteObject = {
    table: []
};


// returns a list[0] for true,false and undefined result. list[1] for result message.
// list[0] == true for found duplicate.
// list[0] == false for no duplicate title.
// list[0] == undefined for problem with reading file.

async function findTitleDuplicate(noteTitle){
    try{

        const data = await fs.readFile(notesJsonPath, "utf-8");
        const noteObj = JSON.parse(data);
    
        for (let i = 0; i < noteObj.table.length; i++) {
            if (noteTitle == noteObj.table[i].title) {
                return [true,`Cannot save due to existing title in notes file.\nDublicate title: "${noteObj.table[i].title}"\nNote ID: "${noteObj.table[i].id}"`];
            }
        }

        return [false,"No duplicate title found"];
    }

    catch(error){
            console.error("Error reading file in findTitleDuplicate",error);
            return [undefined,"Error reading file in findTitleDuplicate"];
        }

    }


// addNote(new Note("SomeTitle","sometect"))
// .then(res=>{console.log(res);})
// .catch(err=>{console.log(err,12);})

// Add note to js
async function addNote(noteToAdd) {
    
    try{
        const data = await fs.readFile(notesJsonPath,"utf-8");
        let noteObj = JSON.parse(data);
        const [isDuplicate,message] = await findTitleDuplicate(noteToAdd.title);

        if(isDuplicate == false){
            // Set Note ID.
            newNoteID = Date.now();
            noteToAdd.id = newNoteID;
   
            // Add content to json object
            noteObj.table.push({ id: noteToAdd.id, title: noteToAdd.title, body: noteToAdd.body });
   
            // noteObj to write to file, null and 2 to prettify.
            let json = JSON.stringify(noteObj, null, 2);
            
            // Write the json object back to the .json file.
            await fs.writeFile(notesJsonPath, json);

            return "note saved!";
        }

        else{
            // Error relating to findTitleDublicate().
            return message;
        }

    }
    catch(err){
        console.error("Error while reading file in addNote",err);
        return "Error while reading file in addNote";
    }    
}


function deleteNote(noteIdToDelete) {

    return fs.readFile(notesJsonPath, "utf-8")
        .then(data => {

            let noteObj = JSON.parse(data);

            for (let i = 0; i < noteObj.table.length; i++) {

                // Match found.
                if (noteObj.table[i]["id"] == noteIdToDelete) {

                    // const newArray = noteObj.table.splice(i, 1);
                    noteObj.table.splice(i, 1);
                    let json = JSON.stringify(noteObj);

                    // Write the json object back to the .json file.
                    return fs.writeFile(notesJsonPath, json)
                        .then(() => {
                            return "note deleted..";
                        })
                        .catch(() => {
                            return "(note id found..) error writing json to file..";
                        })
                }
            }
            return "note id not found..";
        })
        .catch(() => {
            return "wrongly passed args";
        });

}

function notesList() {

    return fs.readFile(notesJsonPath)

        .then(data => {
            let noteObj = JSON.parse(data);
            return noteObj;
        })
        .catch(err => {
            return err;
        })
}

function searchNotes(noteTitle) {

    noteTitle = noteTitle.toLowerCase();

    return fs.readFile(notesJsonPath, "utf-8")
        .then(data => {

            let noteObj = JSON.parse(data);
            let searchArr = [];

            for (let i = 0; i < noteObj.table.length; i++) {

                // Match found.
                if (noteObj.table[i].title.toLowerCase().match(noteTitle)) {
                    searchArr.push(noteObj.table[i]);
                }
            }

            if (searchArr.length > 0) {

                return searchArr;
            }
            else {
                // No match found.
                return "Note Title not found.";
            }

        })
        .catch(err => {
            return err;
        })
}

function updateNoteById(noteID,newNote){

    return fs.readFile(notesJsonPath, "utf-8")
    .then(data=>{

        let noteObj = JSON.parse(data);

        for (let i = 0; i < noteObj.table.length; i++) {

            // Match found.
            if (noteObj.table[i]["id"] == noteID){
                
                // Change Title and Body of Note.
                noteObj.table[i].title = newNote.title;
                noteObj.table[i].body = newNote.body;
                // Update new Note id to old note's id.
                newNote.id = noteObj.table[i].id;

                let json = JSON.stringify(noteObj);

                return fs.writeFile(notesJsonPath,json)
                .then(()=>{
                    return "note updated!"
                })
                .catch(()=>{
                    return "problem when writing to file"
                })
            }
        }

    })
    .catch(()=>{
        return "problem when reading file";
    })

    
}


// Control
if (args[0].endsWith("node.exe") && args[1].endsWith("app.js")) {

    switch (args[2]) {

        case "add":
            if ((args[3] == undefined) || args[4] == undefined) {
                throw err;
            }
            else {
                addNote(new Note(args[3], args[4]))
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                break;
            }

        case "delete":
            if (args[3] == undefined) {
                console.log("arguement[3] does not exist.");
                break;
            }
            else {
                let indexToDelete = Number(args[3]);

                deleteNote(indexToDelete)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            break;

        case "search":
            if (args[3] == undefined) {
                console.log("arguement[3] does not exist.");
                break;
            }
            else {

                searchNotes(args[3])
                    .then(searchResult => {
                        console.log(searchResult);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                break;
            }

        case "list":
            notesList()
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
            break;
    }
}

module.exports = { addNote, notesList, deleteNote, searchNotes, Note };
