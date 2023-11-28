/* MEMO
WRONG : module.export = {}
CORRECT : module.exports = {}
*/ 


const ConfigurationManager = require('./ConfigurationManager.js');
const PingWrapper = require('./PingWrapper.js');

let configuratinonManager = new ConfigurationManager.ConfigurationManager();
let pingWrapper = new PingWrapper.PingWrapper();

configuratinonManager.showConfig();
let hosts = configuratinonManager.getHosts();

pingWrapper.executePing(hosts);