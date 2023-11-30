const dev_config = require("./dev_config.json");

// Load json configuration file
// dev_config.area.map((it) => console.log(it));

class ConfigurationManager {
  areaList: any[] = [];
  areas: string[] = [];
  hosts: string[] = [];
  deviceNames: string[] = [];
  statuses: string[] = [];

  constructor() {
    this.init();
  }
  init() {
    for (let index in dev_config.area) {
      let object = dev_config.area[index];
      for (let key in object) {
        this.areas.push(key);
        this.areaList.push(object[key]);
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

  updateStatus(resList: Array<any>) {
    for (let res of resList) {
      var count = 0;
      for (let element of this.areaList) {
        if (element.host == res.host) {
          console.log();
          if (res.alive) {
            this.areaList[count].status = "alive";
          } else {
            this.areaList[count].status = "dead";
          }
          break;
        }
        count++;
      }
    }
  }

  /* TEST TOOLS  */
  showDevConfig() {
    for (let index in dev_config.area) {
      // console.log(dev_config.area[index].key);
      let object = dev_config.area[index];
      for (let key in object) {
        console.log(`===${key}===`);
        console.log(`Area List : ${object[key]}`);
        console.log(`Device name : ${object[key].device_name}`);
        console.log(`Host : ${object[key].host}`);
        console.log(`Status : ${object[key].status}`);
        console.log(`============`);
        console.log("\n");
      }
    }
  }

  showAreaList() {
    for (let element of this.areaList) {
      console.log("===== Area List =====");
      console.log(`Device Name : ${element.device_name}`);
      console.log(`Host : ${element.host}`);
      console.log(`Status : ${element.status}`);
      console.log("=====================");
    }
  }

  /*TEST TOOL END */
}

module.exports = {
  ConfigurationManager,
};
