require('dotenv-safe').config();

const { json, urlencoded } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

let app = express();
let rotaPacotes = require('./routes/routePacotes');
let rotaUsuarios = require('./routes/routeUsuarios');
let rotaTipos = require('./routes/routeTipos');
let rotaCategorias = require('./routes/routeCategorias');

mongoose.connect('mongodb://localhost/api_store', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("###################");
    console.log("# BD Conectado! ");
    console.log("###################");
}).catch((erro) => {
    console.error("##################################");
    console.error("# Ocorreu um erro ao conectar: ");
    console.error(`# ${erro}`);
    console.error("##################################");
});

mongoose.Promise = global.Promise;

app.use(json());
app.use(urlencoded());
app.use(cookieParser(process.env.SECRET));
app.use((req, res, next) => {
    let data = new Date();
    console.warn();
    console.warn("#############################");
    console.warn(`Hora da requisição : ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()} - ${data.getDate()}/${data.getMonth}/${data.getFullYear()}`);
    console.warn(`(Método) Url: (${req.method}) ${req.url}`);
    console.warn(`Body: ${Object.entries(req.body)}`);
    console.warn(`Cookies sem segurança: ${req.cookies}`);
    console.warn(`Cookies com segurança: ${req.signedCookies}`);
    console.warn("#############################");
    console.warn();
    next();
});
app.use(cors({
    origin: `http://localhost:${process.env.PORT}/`,
    credentials: true
}));
app.use('/static', express.static(__dirname+'/public'));
app.use('/api/usuarios', rotaUsuarios);
app.use('/api/pacotes', rotaPacotes);
app.use('/api/categorias', rotaCategorias);
app.use('/api/tipos', rotaTipos);

app.listen(process.env.PORT, () => {
    console.log(`Api localizada em: http://localhost:${process.env.PORT}/api/`);
});