import { PublicKey } from "@solana/web3.js"

export async function getTokenAddress(owner: String, mint: String) {
	const data = {
		"jsonrpc": "2.0",
		"id": 1,
		"method": "getTokenAccountsByOwner",
		"params": [
			owner,
			{
				"mint": mint,
			},
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
		.then((data) => {
			try {
				console.log(data.result.value)
				return data.result.value[0].pubkey
			} catch (e) {
				return null
			}
		}
		)
}