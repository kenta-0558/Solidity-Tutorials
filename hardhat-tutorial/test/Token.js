const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Token contract", function() {
//     it("Deployment should assign the total supply of tokens to the owner", async function() {
//         const [owner] = await ethers.getSigners();
        
//         const Token = await ethers.getContractFactory("Token");
        
//         const hardhatToken = await Token.deploy();

//         const ownerBalance = await hardhatToken.balanceOf(owner.address);
        
//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//     });
// });

describe("Token contract", function() {
    let Token;
    let hardhatToken;
    let owner;
    let address1;
    let address2;
    let addrs;

    beforeEach(async function() {
        Token = await ethers.getContractFactory("Token");
        [owner, address1, address2, ...addrs] = await ethers.getSigners();

        hardhatToken = await Token.deploy();
    });

    describe("Deployment", function() {
        it("Should set the right owner", async function() {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });    
    });

    
});