const dev_config = require("./dev_config.json");

// Load json configuration file
// dev_config.area.map((it) => console.log(it));

class ConfigurationManager {
  /*　This field is as a status
  [
    area : [{device_name, ip_address, status},{device_name, ip_address, status},...], 
    area :  [{device_name, ip_address, status},{device_name, ip_address, status},...]
  ...
  ]
  */
  areaAllList: Array<Record<any, any>> = [];

  /* Is this declerations are non-sence ? 
    [
      area,
      area,
      ...
    ]
  */
  areaNamesList: Array<string> = [];

  /*
    [
      {area : [ip_address, ip_address, ...]},
      {area : [ip_address, ip_address, ...]},
      ...
    ]
  */
  areaHostsList: Array<Record<string, Array<string>>> = [];

  /*
    [
      {area : [device_name, device_name, ...]},
      {area : [device_name, device_name, ...]},
      ...
    ]
  */

  areaDeviceNamesList: Array<Record<string, Array<string>>> = [];

  /*
    [
      {area : [status, status, ...]},
      {area : [status, status, ...]},
      ...
    ]
  */
  areaStatusesList: Array<Record<string, Array<string>>> = [];

  isProxy: Boolean;

  constructor() {
    this.init();
  }
  init() {
    for (let index in dev_config) {
      let object = dev_config[index];
      this.isProxy = dev_config.is_proxy;
      const areaListMap = new Map();
      areaListMap.set(index, object);
      this.areaAllList.push(Object.fromEntries(areaListMap));
      this.areaNamesList.push(index);
      let tempHosts: string[] = [];
      let tempDeviceNames: string[] = [];
      for (let key in object) {
        tempHosts.push(object[key].host);
        tempDeviceNames.push(object[key].device_name);
      }
      const hostMap = new Map();
      const deviceNameMap = new Map();
      hostMap.set(index, tempHosts);
      deviceNameMap.set(index, tempDeviceNames);
      this.areaHostsList.push(Object.fromEntries(hostMap));
      this.areaDeviceNamesList.push(Object.fromEntries(deviceNameMap));
    }
  }

  getAreaNamesList() {
    return this.areaNamesList;
  }

  getAreaHostsList() {
    return this.areaHostsList;
  }

  getAreaDeviceNamesList() {
    return this.areaDeviceNamesList;
  }

  getHostsByAreaName(areaName: string) {
    for (const hosts of this.areaHostsList) {
      for (const key in hosts) {
        if (key == areaName) {
          return hosts[key];
        }
      }
    }
  }

  getDeviceNamesByAreaName(areaName: string) {
    for (const areaDeviceNames of this.areaDeviceNamesList) {
      for (const key in areaDeviceNames) {
        if (key == areaName) {
          return areaDeviceNames[key];
        }
      }
    }
  }

  getAreaListByAreaName(areaName: string): Array<Record<any, any>> {
    for (let areaList of this.areaAllList) {
      for (let key in areaList) {
        if (key == areaName) {
          return areaList[key];
        }
      }
    }
  }

  updateStatusByAreaName(resList: Array<any>, areaName: string) {
    // Get area list you want to update.
    var areaList = this.getAreaListByAreaName(areaName);
    for (let res of resList) {
      var count = 0;
      for (let key in areaList) {
        if (areaList[key].host == res.host) {
          console.log();
          if (res.alive) {
            areaList[key].status = "alive";
          } else {
            areaList[count].status = "dead";
          }
          break;
        }
        count++;
      }
    }
    for (let index in this.areaAllList) {
      for (let key in this.areaAllList[index]) {
        if (key == areaName) {
          this.areaAllList[index] = areaList;
        }
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
    for (let index in this.areaAllList) {
      console.log(`${this.areaNamesList[index]}`);
      // console.log(`Device Name : ${this.areaAllList[index].device_name}`);
      // console.log(`Host : ${this.areaAllList[index].host}`);
      // console.log(`Status : ${this.areaAllList[index].status}`);
      console.log("=====================");
      console.log("\n");
    }
  }

  /*TEST TOOL END */
}

module.exports = {
  ConfigurationManager,
};
