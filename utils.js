const fs = require('fs');
const path = require('path');
const {Wallets} = require('fabric-network');

exports.getWalletPath = function(){
    return path.resolve(__dirname, "wallet");
}

exports.buildCCPOrg = (orgName) => {
	// load the common connection configuration file
	const ccpPath = path.resolve(__dirname, 'connections', `connection-${orgName.toLowerCase()}.json`);
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

exports.buildWallet = async (walletPath) => {
	// Create a new  wallet : Note that wallet is for managing identities.
	let wallet;
    var walletPath = module.exports.getWalletPath();

	if (fs.existsSync(walletPath)) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Built a file system wallet at ${walletPath}`);
	} else {
		wallet = await Wallets.newInMemoryWallet();
		console.log('Built an in memory wallet');
	}

	return wallet;
};

exports.prettyJSONString = (inputString) => {
	if (inputString) {
		 return JSON.stringify(JSON.parse(inputString), null, 2);
	}
	else {
		 return inputString;
	}
}

exports.getMSPId = function (orgId) {
	return  `${orgId}MSP`;
}
//module.exports.buildWallet().then(console.log)