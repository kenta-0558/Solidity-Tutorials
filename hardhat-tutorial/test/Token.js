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
        
        it("Should assign the total supply of tokens to the owner", async function() {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function() {
        it("Should transfer tokens between accounts", async function() {
            await hardhatToken.transfer(address1.address, 50);
            const address1Account = await hardhatToken.balanceOf(address1.address);
            expect(address1Account).to.equal(50);

            await hardhatToken.connect(address1).transfer(address2.address, 50);
            const address2Account = await hardhatToken.balanceOf(address2.address);
            expect(address2Account).to.equal(50);
        });

        it("Should fail if sender does not have enough tokens", async function() {
            const ownerBalanceBeforeTransaction = await hardhatToken.balanceOf(owner.address); 
            await expect(hardhatToken.connect(address1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens");
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(ownerBalanceBeforeTransaction);
        });
    });


    
});