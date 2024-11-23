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

// Add note to js
function addNote(noteToAdd) {

    return fs.readFile(notesJsonPath, "utf-8")
    .then(data=>{
        
        let noteObj = JSON.parse(data);

        // Calculate json size (to make another if it needs creation)
        // console.log(textEncoder.encode(data).length);

        for (let i = 0; i < noteObj.table.length; i++) {
            if (noteToAdd.title == noteObj.table[i].title) {
                return `Cannot save due to existing title in notes file.\nDublicate title: "${noteObj.table[i].title}"\nNote ID: "${noteObj.table[i].id}"`;
            }
        }

        // Add content to json object
        noteObj.table.push({ id: Date.now(), title: noteToAdd.title, body: noteToAdd.body });

        let json = JSON.stringify(noteObj);

        // Write the json object back to the .json file.
        return fs.writeFile(notesJsonPath, json)
        .then(()=>{
            return "note saved";
        })
        .catch(()=>{
            return "problem during saving the file to the json.";
        })
            
    })
    .catch(()=>{
        return "error upon accessing the file";
    })
}

function deleteNote(noteIdToDelete) {
    
    return fs.readFile(notesJsonPath, "utf-8")
    .then(data => {

        let noteObj = JSON.parse(data);

            for (let i = 0; i < noteObj.table.length; i++) {

                // Match found.
                if (noteObj.table[i]["id"] == noteIdToDelete) {

                    const newArray = noteObj.table.splice(i, 1);

                    let json = JSON.stringify(noteObj);

                    // Write the json object back to the .json file.
                    return fs.writeFile(notesJsonPath, json)
                    .then(()=>{
                        return "note deleted..";
                    })
                    .catch(()=>{
                        return "(note id found..) error writing json to file..";
                    })   
            }
        }
        return "note id not found..";
    })
    .catch(()=>{
        return "wrongly passed args";
    });

}

function notesList() {
    
    return fs.readFile(notesJsonPath)

    .then(data=>{
        let noteObj = JSON.parse(data);
        return noteObj;
    })
    .catch(err =>{
        return err;
    })
}

function searchNotes(noteTitle) {

    noteTitle = noteTitle.toLowerCase();

    return fs.readFile(notesJsonPath, "utf-8")
        .then(data =>{

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
        .catch(err =>{
            return err;
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
                .then(res=>{
                    console.log(res);
                })
                .catch(err=>{
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

                if (isNaN(indexToDelete)) {
                    console.log("Please provide an integer, provided arg: " + args[3]);
                    break;
                }
                else {
                    deleteNote(indexToDelete)
                    .then(res=>{
                        console.log(res);
                    })
                    .catch(err=>{
                        console.log(err);
                    });
                    break;
                }

            }

        case "search":
            if (args[3] == undefined) {
                console.log("arguement[3] does not exist.");
                break;
            }
            else {

                searchNotes(args[3])
                .then(searchResult =>{
                    console.log(searchResult);
                })
                .catch(err =>{
                    console.log(err);
                });

                break;
            }

        case "list":
            notesList()
            .then(data => {
                console.log(data);
            })
            .catch(err =>{
                console.log(err);
            })
            break;
    }
}

module.exports = { addNote, notesList, deleteNote, searchNotes };