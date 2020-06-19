  /** Libs */
require('dotenv').config({path: 'src/.env'}); 
const express = require('express');
const path = require('path');
 

  /** Init */
const app = express();

  /** Settings */
app.set('port',process.env.PORT); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

  /** Static files */
app.use('/public', express.static(path.join(__dirname, '../public')));

  /** Routes */
app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/cam', (req, res)=>{
    res.render('cam');
});

app.get('/imagenes', (req, res)=>{
    res.render('image');
});

  /** Start Server */
app.listen(app.get('port'), () =>{        
    console.log(app.get('port'));  
});

