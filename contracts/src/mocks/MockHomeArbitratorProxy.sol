pragma solidity ^0.7.2;

import {RealitioInterface} from "../dependencies/RealitioInterface.sol";
import {RealitioHomeArbitrationProxy} from "../RealitioHomeArbitrationProxy.sol";

import {MockForeignArbitrationProxy} from "./MockForeignArbitratorProxy.sol";

/**
 * @title Arbitration proxy for Realitio on Ethereum side (A.K.A. the Foreign Chain).
 * @dev This contract is meant to be deployed to the Ethereum chains where Kleros is deployed.
 */
contract MockHomeArbitrationProxy is RealitioHomeArbitrationProxy {
    MockForeignArbitrationProxy foreignProxy;

    constructor(
        address _fxChild,
        address _foreignProxy,
        RealitioInterface _realitio
    ) RealitioHomeArbitrationProxy(_fxChild, _foreignProxy, _realitio) {
        foreignProxy = MockForeignArbitrationProxy(_foreignProxy);
    }

    // Helper method to test _processMessageFromChild directly without having to call internal
    // _validateAndExtractMessage
    function _sendMessageToRoot(bytes memory message) internal override {
        foreignProxy.processMessageFromChild(message);
    }
}
