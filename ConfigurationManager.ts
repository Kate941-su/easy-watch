const dev_config = require("./dev_config.json");

// Load json configuration file
// dev_config.area.map((it) => console.log(it));

class ConfigurationManager {
  /*
  [
    area : [{device_name, ip_address, status},{device_name, ip_address, status},...], 
    area :  [{device_name, ip_address, status},{device_name, ip_address, status},...]
  ...
  ]
  */
  areaAllList: Array<Record<any, any>> = [];

  /* Is this declerations are non-sence ? 
    [
      {area: area},
      {area: area},
      ...
    ]
  */
  areaNamesList: Array<Record<string, string>> = [];

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

  constructor() {
    this.init();
  }
  init() {
    for (let index in dev_config) {
      let object = dev_config[index];
      const areaListMap = new Map();
      areaListMap.set(index, object);
      this.areaAllList.push(Object.fromEntries(areaListMap));
      let areaNameMap = new Map();
      areaNameMap.set(index, index);
      this.areaNamesList.push(Object.fromEntries(areaNameMap));
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

  getAreaNamesList() {}
  getHostsList() {}
  getAreaDeviceNames() {}

  getAreaNames() {
    return this.areaNamesList;
  }

  getHostsByAreaName() {
    return this.areaHostsList;
  }

  getDeviceNamesByAreaName() {
    return this.areaDeviceNamesList;
  }

  getAreaListByAreaName(areaName: string): Array<Record<any, any>> {
    for (let areaRecord of this.areaAllList) {
      for (let key in areaRecord) {
        if (key == areaName) {
          return areaRecord[key];
        }
      }
    }
  }

  updateStatusByAreaName(resList: Array<any>, areaName: string) {
    let areaList = this.getAreaListByAreaName(areaName);
    for (let res of resList) {
      var count = 0;
      for (let element of areaList) {
        if (element.host == res.host) {
          console.log();
          if (res.alive) {
            this.areaAllList[count].status = "alive";
          } else {
            this.areaAllList[count].status = "dead";
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
