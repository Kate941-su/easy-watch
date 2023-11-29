const ping = require("ping");

// This declearation is not allowed. Because class type and module name is dupricated.
// const ConfigurationManager = require("./ConfigurationManager.js");
const ConfigurationManagerPingWrapper = require("./ConfigurationManager.js");

class PingWrapper {
  milsec: number = 1000;
  configurationManager: ConfigurationManager;
  constructor() {
    this.configurationManager =
      new ConfigurationManagerPingWrapper.ConfigurationManager();
  }
  async testPing() {
    for (let i = 0; i < 1; i++) {
      let hosts = [
        "nzigen-sb.aa0.netvolante.jp",
        "192.168.1.31",
        "192.168.1.26",
      ];
      hosts.forEach((host) => {
        ping.promise.probe(host).then((res) => {
          console.log(res);
        });
      });
      await this.delay(this.milsec)
        .then(() => console.log(`sleep ${(this.milsec * 1) / 1000}`))
        .catch((error) => {});
    }
  }

  async executePing(hosts: string[]): Promise<any> {
    let result: any = [];
    for (let host of hosts) {
      console.log(host);
      try {
        let res = await ping.promise.probe(host);
        console.log(res);
        result.push(res);
      } catch (error) {
        console.log(`EXEPING ERROR : ${error}`);
        return [];
      }
    }
    return result;
  }

  delay(milSeconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milSeconds));
  }
}

module.exports = {
  PingWrapper,
};
