pragma solidity ^0.8.0;

import {RealitioInterface} from "../dependencies/RealitioInterface.sol";
import {RealitioHomeArbitrationProxy} from "../RealitioHomeArbitrationProxy.sol";

import {MockForeignArbitrationProxyWithAppeals} from "./MockForeignArbitratorProxyWithAppeals.sol";

/**
 * @title Arbitration proxy for Realitio on Polygon side (A.K.A. the Home Chain).
 * @dev This contract is meant to be deployed on the side of Realitio.
 */
contract MockHomeArbitrationProxy is RealitioHomeArbitrationProxy {
    constructor(address _fxChild, RealitioInterface _realitio) RealitioHomeArbitrationProxy(_fxChild, _realitio) {}

    // Overridden to directly call the foreignProxy under test
    // instead of emitting an event
    function _sendMessageToRoot(bytes memory message) internal override {
        MockForeignArbitrationProxyWithAppeals(fxRootTunnel).processMessageFromChild(message);
    }
}
