const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
// const { title } = require("process");
// const { console } = require("inspector");


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , 'public'))); // we can also do the samething by this == _dirname + 'public' but we use path.join()because it is a safer option
app.set('view engine' , 'ejs'); // render ejs pages 

app.get('/' , function(req , res){
    fs.readdir(`./files` , function(err , files){
        // console.log(files);
        res.render('index' , {files : files});
    })
})

app.post('/create' , function(req , res){
    var fileName = req.body.title.split(' ').join('');
    // console.log(fileName);
    var fileLocation = './files/' + fileName + '.txt'; 
    // console.log(fileLocation);
    fs.writeFile(fileLocation , req.body.details , 'utf8' ,  function(err){
        console.log(err);    
    })
    res.redirect('/');
})


app.get('/file/:fileName' , function(req , res){
    var currFile = req.params.fileName;
    console.log(currFile);
    var fileLocation = './files/' + currFile; 
    console.log(fileLocation);
    fs.readFile(fileLocation ,'utf8' , function(err , data){
        // console.log(data);
        res.render('showtask' , {fileName : currFile , fileData : data});
    })

})

app.get('/edit/:fileName' , function(req , res){
    // console.log(req.params.fileName);
    var currFileName = req.params.fileName;
    res.render('editTaskName' , {fileName : currFileName});
})

app.post('/edit' , function(req , res){
    console.log(req.body.prevName);
    console.log(req.body.newName);
    var oldPath = './files/' + req.body.prevName;
    var newPath = './files/' + req.body.newName;
    fs.rename(oldPath , newPath , function(err){
        console.log(err);
        if(err) console.log(err.message);
    });
    res.redirect('/');
})

app.listen(3000);

// console.log(__dirname);