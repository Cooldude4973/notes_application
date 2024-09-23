const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const notesModel = require('./public/Models/notes')


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , 'public'))); // we can also do the samething by this == _dirname + 'public' but we use path.join()because it is a safer option
app.set('view engine' , 'ejs'); // render ejs pages 



app.get('/' , async function(req , res){

    var files = await notesModel.find();
    let fileName = [];
    files.forEach(function(file){
        fileName.push(file.name);
    });
    
    res.render('index' , {files : fileName});
})



app.post('/create' , async function(req , res){
    var fileName = req.body.title;
    var fileText = req.body.details;
    await notesModel.create({
        name : fileName,
        text : fileText
    });

    res.redirect('/');
})


app.get('/file/:fileName' ,async function(req , res){
    let currFile = req.params.fileName;
    let file = await notesModel.findOne({name : currFile});
    let fileData = file.text;
    console.log(currFile , fileData);
    res.render('showtask' , {fileName : currFile , fileData : fileData});

})

app.get('/edit/:fileName' , function(req , res){
    // console.log(req.params.fileName);
    var currFileName = req.params.fileName;
    res.render('editTaskName' , {fileName : currFileName});
})


app.post('/edit' ,async function(req , res){
    await notesModel.findOneAndUpdate({name : req.body.prevName} , {name : req.body.newName});

    res.redirect('/');
})

app.get('/delete/:fileName' , async function (req , res) {
    let fileName = req.params.fileName;
    await notesModel.findOneAndDelete({name : fileName});
    res.redirect('/');
})

app.listen(3000);

// console.log(__dirname);