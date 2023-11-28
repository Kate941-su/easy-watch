const ping = require('ping');

class PingWrapper {
    milsec = 1000;
    constructor(){}
    async testPing() {
        for (let i = 0; i < 1; i++) {
            let hosts = ['nzigen-sb.aa0.netvolante.jp']
            hosts.forEach((host) => {
               ping.promise.probe(host).then((res) => {
                    console.log(res);
                });
            });
           await delay(milsec).then((_) => console.log(`sleep ${milsec * 1/1000}`));
        } 
    }

    async executePing(hosts) {
        for (let i = 0; i < 10; i++) {
            hosts.forEach((host) => {
               ping.promise.probe(host).then((res) => {
                    console.log(res);
                });
            });
           await this.delay(this.milsec).then((_) => console.log(`sleep ${this.milsec * 1/1000}`));
        } 
    }

    delay(milSeconds) {
        return new Promise(resolve => setTimeout(resolve, milSeconds));
    }
}


module.exports = {
    PingWrapper
}