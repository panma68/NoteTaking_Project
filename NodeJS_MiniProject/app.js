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
    idCounter:0,
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

            console.log("ID_COUNTER: "+noteObj.idCounter);
            // Add content to json object
            noteObj.table.push({id: noteObj.idCounter, title: noteToAdd.title,body: noteToAdd.body});
            
            noteObj.idCounter++;

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


function deleteNote(noteID){
    fs.readFile(notesJsonPath,"utf-8", (err,data) => {
        if (err){
            throw err;
        }
        
        else{

            let noteObj = JSON.parse(data);
            let foundID = false;

            console.log("Start search..");

            for(let i = 0; i < noteObj.table.length; i++){

                console.log(noteObj.table[i])

                if(noteObj.table[i]["id"] == noteID){
                    // noteObj.table.splice
                    foundID = true;
                    break;
                }
            }

            if(foundID){
                console.log("Found id: " + noteID+".");
            }
            else{
                console.log("noteID not found.");
            }
            // noteObj.table["id"]
            // console.log(noteObj.table["id"] == noteID)
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
            
            console.log("noteObj: "+noteObj);
            console.log(noteObj);
        }
    });   
}

// Argv Control
console.log("num of args: " + args.length);

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
    

deleteNote(3);
