var assert = require('assert');
var Branch = require('../lib/branch');

describe('Branch Manipluation', function() {
    var branchDetails = {
        branchID: 1,
        branchName: "London Picadilly",
        location: {},
        telephone: "02071282129",
        email: "londonpicadilly@agent.com",
        website: "http://www.agent.com/"
    };
    describe('Creating a new branch', function() {
        it('should convert object types correctly for zoopla', function() {
            var myBranch = new Branch(branchDetails, 'zoopla');
            assert.equal(myBranch.details.branch_reference, branchDetails.branchID)
            assert.equal(myBranch.details.branch_name, branchDetails.branchName)
        });
        it('should show no error when creating Zoopla branch', function() {
            var myBranch = new Branch(branchDetails, 'zoopla');
            myBranch.sendDetails(function(res, err) {
                assert.equal(err,null);
            });
        });
        it('should prevent branch creation for Rightmove', function() {
            var myBranch = new Branch(branchDetails, 'rightmove');
            myBranch.sendDetails(function(res, err) {
                assert.notEqual(err, null);
            });
        });
    });
});