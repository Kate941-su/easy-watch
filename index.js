const ConfigurationManager = require('./ts-built/ConfigurationManager.js');
const PingWrapper = require('./ts-built/PingWrapper.js');

let configuratinonManager = new ConfigurationManager.ConfigurationManager();
let pingWrapper = new PingWrapper.PingWrapper();

let areaNamesList = configuratinonManager.getAreaNamesList();

async function main() {
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
            configuratinonManager.updateStatusByAreaName(pingResult[key], key);            
            console.log("area here");
        }
      }


    }
main()
// pingWrapper.testPing(hosts);d


// let hosts = configuratinonManager.getHosts();
// pingWrapper.executePing(hosts);

/* MEMO
WRONG : module.export = {}
CORRECT : module.exports = {}
*/ 