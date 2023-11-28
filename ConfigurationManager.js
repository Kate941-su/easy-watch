const dev_config = require('./dev_config.json');

// Load json configuration file
// dev_config.area.map((it) => console.log(it));

class ConfigurationManager {
    areas = [];
    hosts = [];
    deviceNames = [];
    statuses = [];

    constructor(){
        this.init();
    }
  
    showConfig() {
        for (let index in dev_config.area) {
            // console.log(dev_config.area[index].key);
            let object = dev_config.area[index];
            for (let key in object) {
                console.log(`===${key}===`);
                console.log(object[key].device_name); 
                console.log(object[key].host); 
                console.log(`============`);
                console.log('\n');
            }
        }
    }
  
    init() {
        for (let index in dev_config.area) {
            let object = (dev_config.area[index]);
            for (let key in object) {
                this.areas.push(key);
                this.hosts.push(object[key].host);
                this.deviceNames.push(object[key].device_name);
            }
        }
    }

    getAreas() {
        return this.areas;
    }

    getHosts() {
        return this.hosts;
    }

    getDeviceNames() {
        return this.deviceNames;
    }

}



module.exports = {
    ConfigurationManager
}

