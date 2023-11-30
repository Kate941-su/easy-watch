const dev_config = require("./dev_config.json");

// Load json configuration file
// dev_config.area.map((it) => console.log(it));

class ConfigurationManager {
  areaList: any[] = [];
  areas: string[] = [];
  hosts: Array<string[]> = [];
  deviceNames: Array<string[]> = [];
  statuses: Array<string[]> = [];

  constructor() {
    this.init();
  }
  init() {
    for (let index in dev_config) {
      let object = dev_config[index];
      this.areaList.push(object);
      this.areas.push(index);
      let tempHosts = [];
      let tempDeviceNames = [];
      for (let key in object) {
        tempHosts.push(object[key].host);
        tempDeviceNames.push(object[key].device_name);
      }
      this.hosts.push(tempHosts);
      this.deviceNames.push(tempDeviceNames);
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
    for (let index in this.areaList) {
      console.log(`${this.areas[index]}`);
      console.log(`Device Name : ${this.areaList[index].device_name}`);
      console.log(`Host : ${this.areaList[index].host}`);
      console.log(`Status : ${this.areaList[index].status}`);
      console.log("=====================");
      console.log("\n");
    }
  }

  /*TEST TOOL END */
}

module.exports = {
  ConfigurationManager,
};
