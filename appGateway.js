'use strict'
const { Gateway } = require('fabric-network');
const utils = require("./utils.js")
const orgId = 'Org1' 

module.exports = async function (){
   const CCP =utils.buildCCPOrg(Org1);
   console.log(CCP);

   const wallet = await utils.buildWallet();

}

console.log(module.exports())