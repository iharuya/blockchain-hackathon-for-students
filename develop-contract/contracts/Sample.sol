// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Sample {
    string public message;

    constructor(string memory message_) {
        setMessage(message_);
    }

    function setMessage(string memory message_) public {
        message = message_;
    }
}
