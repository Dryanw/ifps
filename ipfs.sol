// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Ifps {
    bytes ifpsHash;

    function setHash(bytes memory hash) public {
        ifpsHash = hash;
    }

    function retrieveHash() public view returns (bytes memory) {
        return ifpsHash;
    }
}