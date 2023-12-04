const path = require("path");
const express = require("express");
const app = express();
const port  = 8000;

/*
  For example, if you define the path like below,
  you have to set path of css ,html... and so on to '/css/XXX.css'
  This comment means root directory of this system is your project root diretory.
*/
app.use(express.static(path.join(__dirname, "/")));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

app.get('/', (req, res) => {
    console.log(`Get request come from ${req.headers}`);
    res.sendFile(path.join(__dirname, "html", "index.html"));
});