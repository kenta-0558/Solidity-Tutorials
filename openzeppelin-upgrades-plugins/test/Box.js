const { expect } = require('chai');
const { ethers } = require('hardhat');

let Box;
let box;

describe('Box', () => {
    beforeEach(async () => {
        Box = await ethers.getContractFactory('Box');
        box = await Box.deploy();
        await box.deployed();
    });

    it('should return a stored value', async () => {
        await box.store(42);

        expect((await box.retrieve()).toString()).to.equal('42');
    });
});