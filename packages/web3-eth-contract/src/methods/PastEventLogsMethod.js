/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file PastEventLogsMethod.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2018
 */

import {GetPastLogsMethod} from 'web3-core-method';

export default class PastEventLogsMethod extends GetPastLogsMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {EventLogDecoder} eventLogDecoder
     * @param {AbiItemModel} abiItemModel
     *
     * @constructor
     */
    constructor(utils, formatters, eventLogDecoder, abiItemModel) {
        super(utils, formatters);
        this.abiItemModel = abiItemModel;
        this.eventLogDecoder = eventLogDecoder;
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Array} response
     *
     * @returns {Array}
     */
    afterExecution(response) {
        const formattedLogs = super.afterExecution(response);

        return formattedLogs.map((logItem) => {
            return this.eventLogDecoder.decode(this.abiItemModel, logItem);
        });
    }
}
