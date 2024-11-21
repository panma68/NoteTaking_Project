// Imports
const fs = require("fs");
const process = require("process");

const args = process.argv;

const notesJsonPath = __dirname + "\\notes.json";

// To read json file size.
const textEncoder = new TextEncoder();

function Note(title,body){
    this.id = 0
    this.title = title
    this.body = body
    this.info = function(){
        return this.id + ", " + this.title + ", " + this.body;
    }
}

var noteObject = {
    table: []
};

// Add note to js
function addNote(noteToAdd){

    fs.readFile(notesJsonPath,"utf-8", (err,data) => {
        if (err){
            throw err;
        }
        
        else{

            let noteObj = JSON.parse(data);
            
            // Calculate json size (to make another if it needs creation)
            console.log(textEncoder.encode(data).length);
            
            for(let i = 0; i < noteObj.table.length; i++){
                if(noteToAdd.title == noteObj.table[i].title){
                    console.log(`Dublicate title: "${noteObj.table[i].title}"\nNote ID: "${noteObj.table[i].id}"`);
                    return;
                }
            }

            // Add content to json object
            noteObj.table.push({id: Date.now(), title: noteToAdd.title,body: noteToAdd.body});

            let json = JSON.stringify(noteObj);
            
            // Write the json object back to the .json file.
            fs.writeFile(notesJsonPath,json,(err)=>{
                if(err) throw err;
                console.log("note saved..");
            })

        }
        
    });    
}

function deleteNote(noteIdToDelete){
    fs.readFile(notesJsonPath,"utf-8", (err,data) => {
        if (err){
            throw err;
        }
        
        else{

            let noteObj = JSON.parse(data);
        
            for(let i = 0; i < noteObj.table.length; i++){

                // Match found.
                if(noteObj.table[i]["id"] == noteIdToDelete){

                    const newArray = noteObj.table.splice(i,1);

                    let json = JSON.stringify(noteObj);
            
                    // Write the json object back to the .json file.
                    fs.writeFile(notesJsonPath,json,(err)=>{
                        if(err) throw err;
                        console.log("note deleted...");
                    })

                    return;
                }
            }

            // No match found.
            console.log("noteID not found.");

        }
    });   
}

function notesList(){
    fs.readFile(notesJsonPath,"utf-8", (err,data) => {
        if (err){
            throw err;
        }
        else{
            let noteObj = JSON.parse(data);
            console.log(noteObj);

        }
    });   
}

function searchNotes(noteTitle){
    fs.readFile(notesJsonPath,"utf-8", (err,data) => {
        if (err){
            throw err;
        }
        
        else{

            let noteObj = JSON.parse(data);
            let searchArr = [];

            for(let i = 0; i < noteObj.table.length; i++){

                // Match found.
                if(noteObj.table[i].title.match(noteTitle)){
                    searchArr.push(noteObj.table[i]);
                }
            }

            if(searchArr.length > 0){
                console.log(searchArr);
            }
            else{
            // No match found.
            console.log("Note Title not found.");
            }   
        }
    });
}

// Control
if(args[0].endsWith("node.exe") && args[1].endsWith("app.js")){
        
    switch(args[2]){

        case "add":
            if( (args[3] == undefined) || args[4] == undefined)
            {
                throw err;
            }
            else
            {
                addNote(new Note(args[3],args[4]));
                break;
            }
        
        case "delete":
            if(args[3] == undefined){
                console.log("arguement[3] does not exist.");
                break;
            }
            else
            {    
                let indexToDelete = Number(args[3]);

                if(isNaN(indexToDelete)){
                    console.log("Please provide an integer, provided arg: " + args[3]);
                    break;
                }
                else{
                    deleteNote(indexToDelete)
                    break;
                }
                
            }

        case "search":
            if(args[3] == undefined){
                console.log("arguement[3] does not exist.");
                break;
            }
            else
            {   
                searchNotes(args[3]);
                break;
            }
                
        case "list":
            notesList();
            break;
        }   
    }

