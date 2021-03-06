const fs=require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");
const titleOptions = {
  describe: "Title of note",
  demand: true,
  alias: 't'
}
const bodyOptions = {
  describe: "Content of the note",
  demand: true,
  alias: "b"
}
const argv = yargs
        .command('add','Add a new note', {
          title: titleOptions,
          body: bodyOptions
        })
        .command('list','Lists all the notes')
        .command('read', 'Reads a particular note', {
          title: titleOptions
        })
        .command('remove','Delete a particular note', {
          title: titleOptions
        })
        .help()
        .argv;

const command = argv._[0];


if (command === "add") {
  var note=notes.addNote(argv.title,argv.body); 
  if (note) {
    console.log("Your note was created: ");
    notes.logNote(note);
  } else {
    console.log("Your note couldn't be created");
  }
} else if (command === "list") {
    notes.getAll();
} else if (command === "read") {
  const foundNote=notes.getNote(argv.title);
  if (foundNote) {
    console.log("Note found: ");
    notes.logNote(foundNote);
  } else {
    console.log("Didn't find any note with given title");
    
  }
} else if (command === "remove") {
  let res=notes.removeNote(argv.title);

  let message=res ? "Successfully removed the note" : "The provided title doesn't match with any existing note's title";
  console.log(message);
  
} else {
  console.log("Command not recognized");
}


