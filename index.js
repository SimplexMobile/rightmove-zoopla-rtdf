var property = require('./lib/property');
var branch = require('./lib/branch');

var Main = {
    property: property,
    branch: branch
};

module.exports = Main;

var branchDetails = {
    branchID: "London1",
    branchName: "London Fulham",
    location: {
      street_name: "Peterborough Road",
      town_or_city: "London",
      postal_code: "SW6 3BT",
      country_code: "GB"
    },
    telephone: "02071282129",
    email: "londonpicadilly@agent.com",
    website: "http://www.agent.com/"
};

var myBranch = new branch(branchDetails, "zoopla", "./certificates/private.pem", "./certificates/zpg_realtime_listings_1451477743845557_20151230-20251227.crt", true);
myBranch.sendDetails(function(res, err) {
    console.log(res);
    console.error(err);
});
