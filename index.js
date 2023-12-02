const ConfigurationManager = require('./ts-built/ConfigurationManager.js');
const PingWrapper = require('./ts-built/PingWrapper.js');

let configuratinonManager = new ConfigurationManager.ConfigurationManager();
let pingWrapper = new PingWrapper.PingWrapper();

async function main() {

    let res = configuratinonManager.updateStatusByAreaName([], "area1");

    // Get result of executing ping command.
    // let pingResult = [];
    // for (let index in hosts){
    //     res = await pingWrapper.executePing(hosts[index]);
    //     pingResult.push(res);        
    // }
    // for (let index in pingResult) {
    //     configuratinonManager.updateStatus(pingResult[index]);    
    //     configuratinonManager.showAreaList();
    // }
    }
main()
// pingWrapper.testPing(hosts);d


// let hosts = configuratinonManager.getHosts();
// pingWrapper.executePing(hosts);

/* MEMO
WRONG : module.export = {}
CORRECT : module.exports = {}
*/ 