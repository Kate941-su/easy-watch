const { ConfigurationManager } = require('./ts-built/ConfigurationManager.js');
const { PingWrapper } = require('./ts-built/PingWrapper.js');
const express = require("express");
const path = require("path")

const app = express();
const port  = 9000;

let configuratinonManager = new ConfigurationManager();
let pingWrapper = new PingWrapper();

let areaNamesList = configuratinonManager.getAreaNamesList();

/**
 * Update Status Methods
 */
async function updateAllStatus() {
  // Get result of executing ping command.
  let pingResultByArea = [];
  for (const areaName of areaNamesList) {
      const hosts = configuratinonManager.getHostsByAreaName(areaName);
      let pingResult = await pingWrapper.executePing(hosts);
      let pingResultMap = new Map();
      pingResultMap.set(areaName, pingResult);
      pingResultByArea.push(Object.fromEntries(pingResultMap));
    }

    // Update status
    for (const pingResult of pingResultByArea) {
      for (const key in pingResult) {
          // Update all area.
          configuratinonManager.updateStatusByAreaName(pingResult[key], key);            
      }
    }
  }


/*
 * API Methods
 */

/*
  For example, if you define the path like below,
  you have to set path of css ,html... and so on to '/css/XXX.css'
  This comment means root directory of this system is your project root diretory.
*/
app.use(express.static(path.join(__dirname, "/")));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

app.get('/ping-result', (req, res) => {
    res.json(configuratinonManager.areaAllList);
    console.log(`Get request come from ${req.headers}`);
});

app.get('/', (req, res) => {
    console.log(`Get request come from ${req.headers}`);
    res.sendFile(path.join(__dirname, "html", "index.html"));
});

// initialize status
updateAllStatus()

// Execte updateAllStatus() by 10 seconds.
setInterval(updateAllStatus, 10000)

/* MEMO
WRONG : module.export = {}
CORRECT : module.exports = {}
*/ 