const { expect } = require('chai');
const { ethers, upgrades } = require('hardhat');

let Box;
let box;

describe('Box Proxy', () => {
    beforeEach(async () => {
        Box = await ethers.getContractFactory('Box');
        box = await upgrades.deployProxy(Box, [42], { initializer: 'store'});
    });

    it("should return a stored value by initializing", async () => {
        expect((await box.retrieve()).toString()).to.equal('42');
    });
})