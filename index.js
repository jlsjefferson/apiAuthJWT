var express = require("express")
var app = express()
const UserRoutes = require('./User/User-routes');
 
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json())

app.use('/', [
  UserRoutes,   
  ]);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
