
export async function get_owner(tokenAddress: string) {
	try {
		const dataHolders = {
			"jsonrpc": "2.0",
			"id": 1,
			"method": "getProgramAccounts",
			"params": [
				"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
				{
					"filters": [
						{
							"dataSize": 165
						},
						{
							"memcmp": {
								"offset": 0,
								"bytes": tokenAddress
							}
						}
					]
				}
			]
		}
		let holders = await fetch("https://api.mainnet-beta.solana.com", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataHolders),
		}).then(res => res.json())
			.then((data) =>
				data
			)
		let tk 
		for(var i =0;i<holders.result.length;i++){
			if (await getBalance(holders.result[i].pubkey.toString()) > 0) {
				tk = holders.result[i].pubkey.toString()
				break
			}
		}
		return await getOwnerFromTokenAccount(tk)
	} catch (e) {
		console.log("something went wrong")
	}
}

async function getBalance(pubkey: string) {
	try {
		const data = {
			"jsonrpc": "2.0",
			"id": 1,
			"method": "getTokenAccountBalance",
			"params": [
				pubkey,
			]
		}
		return await fetch("https://api.mainnet-beta.solana.com", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		}).then(res => res.json())
			.then((data) =>
				data.result.value.amount
			)
	} catch (e) {
		console.log("something went wrong, redoing current user")
	}
}

async function getOwnerFromTokenAccount(pubkey: string) {
	try {
		const data = {
			"jsonrpc": "2.0",
			"id": 1,
			"method": "getAccountInfo",
			"params": [
				pubkey,
				{
					"encoding": "jsonParsed"
				}
			]
		}
		return await fetch("https://api.mainnet-beta.solana.com", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		}).then(res => res.json())
			.then((data) => data.result.value.data.parsed.info.owner)

	} catch (err) {
		console.error(err)
		console.log("something went wrong, redoing current user")
	}
}


