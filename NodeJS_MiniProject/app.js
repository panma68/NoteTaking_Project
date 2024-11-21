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
            
            // Add content to json object
            noteObj.table.push({id: Date.now(), title: noteToAdd.title,body: noteToAdd.body});

            let json = JSON.stringify(noteObj);
            
            // Write the json object back to the .json file.
            fs.writeFile(notesJsonPath,json,(err)=>{
                if(err) throw err;
                console.log("Saved to notes.json!");
            })

        }
        
    });    
}


// Add funcs
// var note = new Note(1,"ADADWDWA","133444444444444444444444444.");
// addNote(note);


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
                        console.log("Saved to notes.json!");
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
                
        case "list":
            notesList();
            break;
        }

            
    }

