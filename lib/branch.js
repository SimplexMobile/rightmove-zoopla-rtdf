var request = require('request');

var Branch = function(branch_details, portal, cert) {
    this.details = {};
    this.portal = portal;
    this.cert = cert;
    if (portal === "zoopla") this.zoopla = true;
    if (portal === "rightmove") this.rightmove = true;
    if (this.zoopla) {
        if (branch_details.branchID) this.details.branch_reference = branch_details.branchID;
        if (branch_details.branchName) this.details.branch_name = branch_details.branchName;
        if (branch_details.location) this.details.location = branch_details.location;
        if (branch_details.telephone) this.details.telephone = branch_details.telephone;
        if (branch_details.email) this.details.email = branch_details.email;
        if (branch_details.website) this.details.website = branch_details.website;
        return this;
    } else if (this.rightmove) {
        return this;
    }
};

Branch.prototype.sendDetails = function(callback) {
    if (this.zoopla) {
        return callback(true, null);
    } else {
        return callback(true, {
            error: "This action is not supported"
        });
    }
};

Branch.prototype.secureRequest = function(type, url, callback) {
    if (type == "GET") {
        request({
            method: type,
            uri: url,
            agentOptions: {
                ca: fs.readFileSync(this.cert)
            }
        }, function(error, httpResponse, body) {
            callback(body, error)
        });
    } else {
        //POST or PUT
        request({
            method: type,
            uri: url,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "someEntry"
            }),
            agentOptions: {
                ca: fs.readFileSync(this.cert)
            }
        }, function(error, httpResponse, body) {
            callback(body, error)
        });
    }
};

module.exports = Branch;