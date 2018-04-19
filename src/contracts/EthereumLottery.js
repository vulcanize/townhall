/*
 * Copyright 2018 Vulcanize, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import web3 from 'web3_override';
import TruffleContract from 'truffle-contract';
import LotteryContract from 'truffle_artifacts/contracts/Lottery.json';

class EthereumLottery {
  constructor() {
    this.lotteryContract = null;
    this.resolveContract();
  }

  epoch = async () => {
    await this.resolveContract();
    let current = await this.lotteryContract.epochCurrent.call();
    return parseInt(current.toString(), 0);
  }

  votes = async (offset) => {
    let count = await this.lotteryContract.votes.call(offset);
    return parseInt(count.toString(), 0);
  }

  upvote = async (offset) => {
    return web3.eth.getAccounts().then(async (accounts) => {
      let account = accounts[0];

      return this.lotteryContract.upvote(offset, {from: account})
    })
  }

  downvote = async (offset) => {
    return web3.eth.getAccounts().then(async (accounts) => {
      let account = accounts[0];

      return this.lotteryContract.downvote(offset, {from: account});
    })
  }

  payoutAccounts = async () => {
    let promises = [0,1,2,3,4].map(async i =>
      this.lotteryContract.payouts.call(i)
        .then(r => r.toString())
    )

    return Promise.all(promises)
  }

  rewards = async () => {
    let promises = [0,1,2,3,4].map(i =>
      this.lotteryContract.reward.call(i)
        .then(r => r.toString())
    )

    return Promise.all(promises)
  }

  claim = async (payoutIndex) => {
    return web3.eth.getAccounts().then(async (accounts) => {
      let account = accounts[0];

      return this.lotteryContract.claim(payoutIndex, {from: account});
    })
  }

  resolveContract = async () => {
    let Lottery = TruffleContract(LotteryContract);
    Lottery.setProvider(web3.currentProvider);

    if (!process.env.REACT_APP_ENV) {
      this.lotteryContract = await Lottery.deployed();
    } else {
      this.lotteryContract = await Lottery.at(process.env.REACT_APP_TOWNHALL_ADDRESS);
      // ## throw error on start if not defined
    }
  }
}

export default EthereumLottery;
