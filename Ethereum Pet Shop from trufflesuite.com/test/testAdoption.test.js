const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {

    let adoption;
    let expectedAdopter;

    before(async () => {
        adoption = await Adoption.deployed();
    })

    describe("adopting a pet and get retrieving addresses", async () => {

        before("adopt a pet using account[0]", async () => {
            await adoption.adopt(8, { from : accounts[0]});
            expectedAdopter = accounts[0];  
        })
        
        it("get the address of pet owner by pet id", async () => {
            const adopter = await adoption.adopters(8);
            assert.equal(adopter, expectedAdopter, "adopter ist address of first account");
        })

        it("get the address of owner from Array with pet id", async () => {
            const adoptions = await adoption.getAdopters();
            assert.equal(adoptions[8], expectedAdopter, "expected Adopter is in adoptions")
        })
    })
})