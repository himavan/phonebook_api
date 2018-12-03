import app from "./app";

const PORT = process.env.PORT || 3000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type','x-auth-token');

    next();
}

app.use(allowCrossDomain);  

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})