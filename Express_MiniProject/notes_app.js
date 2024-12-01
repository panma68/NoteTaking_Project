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


// General search matching of elements in notes.json 
// HARDCODED ELEMENTS.
const noteStructureElements = ["id","title","body"];
async function findDuplicateInNoteStructure(elementToSearch,noteElement){
    
    // Search element in notes
    let elementExists = false;
    for(let i = 0; i < noteStructureElements.length; i++){
        if(elementToSearch == noteStructureElements[i]){
            elementExists = true;
            break;
        }
    }

    // If element in noteStructure not found.
    if(!elementExists){
        return [undefined,-2,"search element not in note structure on findDuplicateInNoteStructure."];
    }

    try{

        const data = await fs.readFile(notesJsonPath, "utf-8");
        const noteObj = JSON.parse(data);
    

        for (let i = 0; i < noteObj.table.length; i++) {
            
            if (noteElement == noteObj.table[i][elementToSearch]) {
                return [true,i,`Dublicate ${elementToSearch}: "${noteObj.table[i][elementToSearch]}"`];
            }
        }

        return [false,-1,`No duplicate ${elementToSearch} found`];
    }

    catch(error){
            console.error("Error reading file in findDuplicateInNoteStructure",error);
            return [undefined,-2,"Error reading file in findDuplicateInNoteStructure"];
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
        const [isDuplicate,index,message] = await findDuplicateInNoteStructure("title",noteToAdd.title);

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


async function deleteNote(noteIdToDelete) {
try{

    const data = await fs.readFile(notesJsonPath,"utf-8");
    let noteObj = JSON.parse(data);

    const [isDuplicate,index,message] = await findDuplicateInNoteStructure("id",noteIdToDelete);

    if(isDuplicate){

        console.log(index);
        noteObj.table.splice(index, 1);
        let json = JSON.stringify(noteObj);

        // Write the json object back to the .json file.
        await fs.writeFile(notesJsonPath, json)

        // Success
        return message;
    }
    else{
        return message;
    }
}
    catch(err){
        console.error("Error while reading file in deleteNote ",err);
        return "Error while reading file in deleteNote";
    }
}


async function notesList() {

    try{
        const data = await fs.readFile(notesJsonPath);
        const noteObject = JSON.parse(data);
        return noteObject;
    }
    catch(err){
        console.error("");
        return `Error while reading notes.js on notesList(), ${err}`;
    }
}

async function searchNotes(noteTitle) {

    noteTitle = noteTitle.toLowerCase();

    try{
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
        }
        else {
            // No match found.
            return "Note Title not found.";
        }

    }
    catch(err){
        console.error("Error while reading notes.js in searchNotes()",err);
        return `Error while reading notes.js in searchNotes(), ${err}`;
    }
}

async function updateNoteById(noteID,newNote){

    try{
    
        const data = await fs.readFile(notesJsonPath, "utf-8");
    
    }

    catch(err){
        return err;
    }
}
//     .then(data=>{

//         let noteObj = JSON.parse(data);

//         for (let i = 0; i < noteObj.table.length; i++) {

//             // Match found.
//             if (noteObj.table[i]["id"] == noteID){
                
//                 // Change Title and Body of Note.
//                 noteObj.table[i].title = newNote.title;
//                 noteObj.table[i].body = newNote.body;
//                 // Update new Note id to old note's id.
//                 newNote.id = noteObj.table[i].id;

//                 let json = JSON.stringify(noteObj);

//                 return fs.writeFile(notesJsonPath,json)
//                 .then(()=>{
//                     return "note updated!"
//                 })
//                 .catch(()=>{
//                     return "problem when writing to file"
//                 })
//             }
//         }

//     })
//     .catch(()=>{
//         return "problem when reading file";
//     })

    
// }


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
