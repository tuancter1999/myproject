import { Contract, constants } from 'ethers'
import { waffle, ethers } from 'hardhat'

import { PoolAddressTest } from '../typechain'
import { POOL_BYTECODE_HASH } from './shared/computePoolAddress'
import { expect } from './shared/expect'
import snapshotGasCost from './shared/snapshotGasCost'

describe('PoolAddress', () => {
  let poolAddress: PoolAddressTest

  let poolTest: Contract

  beforeEach('deploy PoolAddressTest', async () => {
    let [owner, user, lp] = await ethers.getSigners()

    const poolAddressTestFactory = await ethers.getContractFactory('PoolAddressTest')
    poolTest = poolAddressTestFactory.attach('0x6186d70E3062635B5f59474119B99fc19363B31f')
  })

  describe('#POOL_INIT_CODE_HASH', () => {
    it('equals the hash of the pool bytecode', async () => {
      expect(await poolTest.POOL_INIT_CODE_HASH()).to.eq(POOL_BYTECODE_HASH)
    })
  })

  describe('#computeAddress', () => {
    it('all arguments equal zero', async () => {
      await expect(poolTest.computeAddress(constants.AddressZero, constants.AddressZero, constants.AddressZero, 0))
        .to.be.reverted
    })

    it('matches example from core repo', async () => {
      expect(
        await poolTest.computeAddress(
          '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          '0x99969825c9c18ba93c9998f95c4bb7f6eb5e2c39',
          '0xf2f00ed60982365877989bc53d123b027388e81e',
          3000
        )
      ).to.matchSnapshot()
    })

    it('token argument order cannot be in reverse', async () => {
      await expect(
        poolTest.computeAddress(
          '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          '0x2000000000000000000000000000000000000000',
          '0x1000000000000000000000000000000000000000',
          3000
        )
      ).to.be.reverted
    })

    it('gas cost', async () => {
      await snapshotGasCost(
        poolAddress.getGasCostOfComputeAddress(
          '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          '0x1000000000000000000000000000000000000000',
          '0x2000000000000000000000000000000000000000',
          3000
        )
      )
    })
  })
})
