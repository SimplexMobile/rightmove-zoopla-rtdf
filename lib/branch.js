var request = require('request');
var fs = require('fs');

var Branch = function(branch_details, portal, key, cert, test) {
    this.details = {};
    this.portal = portal;
    this.key = key;
    this.cert = cert;
    this.urlRoot = test ? "https://realtime-listings-api.webservices.zpg.co.uk/sandbox/v1/" : "https://realtime-listings-api.webservices.zpg.co.uk/live/v1/";
    if (portal === "zoopla") this.zoopla = true;
    if (portal === "rightmove") this.rightmove = true;
    if (this.zoopla) {
        var fail;
        if (branch_details.branchID) {
            this.details.branch_reference = branch_details.branchID;
        } else {
            fail = "branchID";
        }
        if (branch_details.branchName) {
            this.details.branch_name = branch_details.branchName;
        } else {
            fail = "branchName";
        }
        if (branch_details.location) {
            this.details.location = branch_details.location;
        } else {
            fail = "location";
        }
        if (branch_details.telephone) this.details.telephone = branch_details.telephone;
        if (branch_details.email) this.details.email = branch_details.email;
        if (branch_details.website) this.details.website = branch_details.website;
        if (fail) {
            return {
                error: "Mandatory field have not completed: " + fail
            };
        } else {
            return this
        }
    } else if (this.rightmove) {
        return this
    }
};

Branch.prototype.sendDetails = function(callback) {
    if (this.zoopla) {
        this.secureRequest("branch/update", this.details, function(res, error) {
            return callback(res, error);
        });
    } else {
        return callback(null, {
            error: "This action is not supported"
        });
    }
};

Branch.prototype.secureRequest = function(url, payload, callback) {
    request({
        method: "POST",
        uri: this.urlRoot + url,
        headers: {
            "Content-Type": "application/json; profile=https://realtime-listings.webservices.zpg.co.uk/docs/v1.1/schemas/" + url + ".json"
        },
        body: JSON.stringify(payload),
        agentOptions: {
            key: fs.readFileSync(this.key),
            cert: fs.readFileSync(this.cert)
        }
    }, function(error, httpResponse, body) {
        callback(body, error)
    });
};

module.exports = Branch;
