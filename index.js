const express = require("express")
const app = express();  // Compliant
app.disable("x-powered-by");



const UserRoutes = require('./src/modules/User/User-routes');
 
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
