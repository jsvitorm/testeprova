const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path'); // Importe o módulo 'path' para lidar com caminhos de arquivos.



const port = 8080;
const app = express();




const db = mysql.createConnection({
    host: 'dbtestepreprova.cbsni0sjuhqw.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'testepreprova',
    database: 'alunos',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão bem-sucedida ao banco de dados');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.get("/alunos", (req,res) => {
    const sql = "SELECT * FROM aluno"

    db.query(sql, (err,result)=>{
        if (err) {
            console.log(err)
        } else {
            let htmlContent = "<html><body><h1>ALUNOS</h1><ul>";
            console.log(result)
            result.forEach(result => {
                htmlContent += `<li>Aluno ${result.nome} possui ${result.idade} e estuda ${result.curso}</li>`
            });
            htmlContent += '<button><a href="/">Voltar ao formulario</a></button>'

            htmlContent += "</ul></body></html>";

            res.send(htmlContent)
        }
    })
})

app.post("/inserir", (req,res) => {
    const nome = req.body.nome;
    const idade = req.body.idade;
    const curso = req.body.curso;

    const sql = "INSERT INTO aluno (nome, idade, curso) VALUES (?,?,?)"

    db.query(sql, [nome,idade,curso], (err,result) => {
        if (err) {
            console.error("ERRO:", err)
        } else {
            res.redirect("/alunos")
        }
    })


})

app.listen(8080);