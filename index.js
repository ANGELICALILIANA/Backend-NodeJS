const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Cors
const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Hola Mundo')
    console.log('Bienvenido al backend');
})

//Conexión a base de datos
const mysql = require('mysql');

//Parámetros de conexión
const db = mysql.createConnection({
    host: 'localhost:3306', //Puerto de mysql
    user: 'root', //Depende de la cuenta
    password: '1234',
    database: 'ejemplo',
    port: '3306',
    multipleStatements: true,    //Multiples revisiones
});

db.connect(function(error){
    if(error)
    console.log()
    else
    console.log('Base de datos conectada');
});

//Rutas
app.route('/user')
    .get((req, res) => {
        //Conexión con bases de datos
        const query = db.query('select * from personas',(error,resultado) =>{
            try{
                if(error)
                    throw error;
                    else{
                        console.log();
                        res.json(resultado);
                    }
            }catch(error){
res.json({error: error.mensaje})
            }
        });
        console.log('Get de usuarios');
        res.json({hola: 1});
    });

//Parámetro
app.route('/user:id')
    .get((req, res) => {
        const idUser = req.params.id;
        console.log(idUser);
        //Respuests
        res.json({usuario: idUser}) 
});

app.route('/user')
    .post((req, res) => {
        console.log('Post de usuarios');
});

app.listen(port, () => {
    console.log(`Example app listen at http://localhost:${port}`);
})