// Basics refresh

const myObject = {
    property: 'Value',
    otherProperty: 77,
    "obnoxious property": function() {
      console.log(12)
    }
  };
console.log(myObject)


// dot notation
myObject.property; // 'Value'
console.log(myObject.property)

// bracket notation
myObject["obnoxious property"]; // [Function]
console.log(myObject.property)



// Object Constructor (or class?)
function Player(name, marker) {
    this.name = name;
    this.marker = marker;

    this.sayName = function(){
        console.log(this.name)
    }
  }
  
player1 = new Player("Bob", "X")

console.log(player1.marker)
player1.sayName()


function Book(title,pages,readStatus){
    this.title = title
    this.pages = pages + " pages"
    this.readStatus = readStatus
    this.info = function(){
        return this.title + ", " + this.pages + ", " + this.readStatus;
    }
}

theHobbit = new Book("The Hobbit by J.R.R. Tolkien",295,"not read yet")
console.log(theHobbit.info())

// Get object prototype (or class name)
let classTypeIsPlayer = Object.getPrototypeOf(player1) === Player.prototype; // returns true
console.log(classTypeIsPlayer)

// valueOf is a function defined on Object class, used to enumerate a class variables.
console.log(player1.valueOf())

// Check if a function exists in a class (for example, valueOf function in player1)
console.log(player1.hasOwnProperty('sayName')); // true
console.log(Object.prototype.hasOwnProperty('valueOf')); // true



//--------------------------------------------////--------------------------------------------//
// We can also make Object functions like this: (outside of the declared function(class) scope )
function Person(name) {
    this.name = name;
  }
  
  Person.prototype.sayName = function() {
    console.log(`Hello, I'm ${this.name}!`);
  };
  
  function Player(name, marker) {
    this.name = name;
    this.marker = marker;
  }
  
  Player.prototype.getMarker = function() {
    console.log(`My marker is '${this.marker}'`);
  };
  
  Object.getPrototypeOf(Player.prototype); // returns Object.prototype
  
  // Now make `Player` objects inherit from `Person`
  Object.setPrototypeOf(Player.prototype, Person.prototype);
  Object.getPrototypeOf(Player.prototype); // returns Person.prototype
  
  const player1 = new Player('steve', 'X');
  const player2 = new Player('also steve', 'O');
  
  player1.sayName(); // Hello, I'm steve!
  player2.sayName(); // Hello, I'm also steve!
  
  player1.getMarker(); // My marker is 'X'
  player2.getMarker(); // My marker is 'O'
  