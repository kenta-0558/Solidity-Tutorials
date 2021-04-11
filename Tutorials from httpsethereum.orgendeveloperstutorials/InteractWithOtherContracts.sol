//https://ethereum.org/en/developers/tutorials/interact-with-other-contracts-from-solidity/

//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Counter {
    
    // uint256 private count;
    // address private owner;
    // address private factory;
    
    uint256 public count;
    address public owner;
    address public factory;
    
    modifier onlyOwner(address _owner) {
        require(owner == _owner, "you are not the owner of the contract!");
        _;
    }
    
    modifier onlyFactory() {
        require(factory == msg.sender, "you need to use the factory");
        _;
    }
    
    constructor(address _owner) {
        owner = _owner;
        factory = msg.sender;
    }
    
    function getCount() public view returns (uint256) {
        return count;
    }
    
    function increaseCount(address _caller) public onlyFactory onlyOwner(_caller) {
        count++;
    }
}


contract CounterFactory {
    
    mapping(address => Counter) counters;
        
    function createCounter() public {
        // require(counters[msg.sender] == Counter(0));
        counters[msg.sender] = new Counter(msg.sender);
    }    
    
    function getCounter() public view returns (uint256) {
        return counters[msg.sender].getCount();
    }
    
    function increaseCount() public {
        counters[msg.sender].increaseCount(msg.sender);
    }           
}