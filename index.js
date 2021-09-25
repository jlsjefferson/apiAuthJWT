var express = require("express")
var app = express()
const LocalizacaoRoutes = require('./Localizacao/Localizacao-routes');
 
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json())

app.use('/api', [
    LocalizacaoRoutes,   
  ]);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
