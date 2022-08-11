pragma solidity ^0.8.0;

import {RealitioInterface} from "../dependencies/RealitioInterface.sol";
import {RealitioHomeArbitrationProxy} from "../RealitioHomeArbitrationProxy.sol";

import {MockForeignArbitrationProxyWithAppeals} from "./MockForeignArbitratorProxyWithAppeals.sol";

/**
 * @title Arbitration proxy for Realitio on Ethereum side (A.K.A. the Foreign Chain).
 * @dev This contract is meant to be deployed to the Ethereum chains where Kleros is deployed.
 */
contract MockHomeArbitrationProxy is RealitioHomeArbitrationProxy {
    MockForeignArbitrationProxyWithAppeals foreignProxy;

    constructor(
        address _fxChild,
        address _foreignProxy,
        RealitioInterface _realitio
    ) RealitioHomeArbitrationProxy(_fxChild, _realitio) {
        foreignProxy = MockForeignArbitrationProxyWithAppeals(_foreignProxy);
    }

    // Overridden to directly call the foreignProxy under test
    // instead of emitting an event
    function _sendMessageToRoot(bytes memory message) internal override {
        foreignProxy.processMessageFromChild(message);
    }
}
