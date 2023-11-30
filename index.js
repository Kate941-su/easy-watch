const ConfigurationManager = require('./ts-built/ConfigurationManager.js');
const PingWrapper = require('./ts-built/PingWrapper.js');

let configuratinonManager = new ConfigurationManager.ConfigurationManager();
let pingWrapper = new PingWrapper.PingWrapper();

const hosts = configuratinonManager.getHosts();
async function main() {

    // let pingResult = await pingWrapper.executePing(hosts);
    
    // configuratinonManager.updateStatus(pingResult);
    
    // configuratinonManager.showAreaList();

}

main()
// pingWrapper.testPing(hosts);


// let hosts = configuratinonManager.getHosts();
// pingWrapper.executePing(hosts);

/* MEMO
WRONG : module.export = {}
CORRECT : module.exports = {}
*/ 