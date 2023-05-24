//const validator = require('validator')
const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')
//customize yargs version, check with node app.js add --version
yargs.version('1.1.0')
//Create add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true, //false by default, required: --title
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})
//Create remove command
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})
//Create list command
yargs.command({
    command:'list',
    describe:'List notes',
    handler(){
       notes.listNote()
    }
})
//Create read command
yargs.command({
    command:'read',
    describe:'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})
yargs.parse()//console.log(yargs.argv)



