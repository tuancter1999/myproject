const bn = require('bignumber.js')
const { BigNumber } = require('ethers')

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })

module.exports = {
  encodePriceSqrt(reserve1, reserve0) {
    return BigNumber.from(
      new bn(reserve1.toString())
        .div(reserve0.toString())
        .sqrt()
        .multipliedBy(new bn(2).pow(96))
        .integerValue(3)
        .toString()
    )
  }
}