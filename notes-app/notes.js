const fs = require('fs')
const chalk = require('chalk')
const getNotes = () => {
    return 'Your notes ...'
}

const addNote = (title, body) => {
    const notes= loadNotes()
    //const duplicateNotes = notes.filter((notes)=> notes.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    debugger
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const noteRemained = notes.filter((notes) => notes.title !== title)
    if (noteRemained.length === notes.length) {
        console.log(chalk.red.inverse('No note found!'))
    } else {
        console.log(chalk.green.inverse('Note removed!'))
    }
    saveNote(noteRemained)
}
const listNote = ()=> {
    console.log(chalk.inverse('Your notes'))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(!note){
        console.log(chalk.red.inverse('No note found!'))
    }else{
        console.log(chalk.inverse.bold.grey(note.title))
        console.log(note.body)
    }
}

const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)   
    }catch(e){//if no file exist yet, will create an empty one
        return []    
    }
}

module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNote: listNote,
    readNote: readNote
}