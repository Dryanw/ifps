export const IPFS_ADDRESS = '0x86072CbFF48dA3C1F01824a6761A03F105BCC697';

export const IPFS_ABI = [
                        	{
                        		"inputs": [
                        			{
                        				"internalType": "bytes",
                        				"name": "hash",
                        				"type": "bytes"
                        			}
                        		],
                        		"name": "setHash",
                        		"outputs": [],
                        		"stateMutability": "nonpayable",
                        		"type": "function"
                        	},
                        	{
                        		"inputs": [],
                        		"name": "retrieveHash",
                        		"outputs": [
                        			{
                        				"internalType": "bytes",
                        				"name": "",
                        				"type": "bytes"
                        			}
                        		],
                        		"stateMutability": "view",
                        		"type": "function"
                        	}
                        ]