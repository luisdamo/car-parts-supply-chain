var shift = true;
var capslock = false;
var $write;
var onlyNumeric = false;
var direccionDIS = '0x98f64CD4D3Dd97E4A2042C28348258952dBb3B92';
var AddressCPCContract = '0x4B49C99d0Bd4E23B62Eb2230eacB58fE64bcbA69';
var CPCContract;
var AddressCPCTokenContract = '0xd6bb7ff854873a96efA10F255219b3Fa47D6051d';
var CPCTokenContract;
var partDetails;
var partSelected;
var partSelectedPrice =0;
var partSelectedState = 0;
var blockini = 14939487;
var blockfin = 14939487 + 5000;
var blocknum = 0;
var partStates = ['0-Creada por fabricante',   // 0
    '1-Puesta a la venta por fabricante',   // 1
    '2-Comprada por distribuidor',  // 2
    '3-Enviada por fabricante',   // 3
    '4-Recibida por distribuidor',   // 4
    '5-Procesada por distribuidor',  // 5
    '6-Empaquetada por distribuidor',    // 6
    '7-Puesta la venta por distribuidor',    // 7
    '8-Comprada por almacén',     // 8
    '9-Enviada por distribuidor',    // 9
    '10-Recibida por almacén',      // 10
    '11-Puesta a la venta por almacén',       // 11
    '12-Comprada por cliente'];    // 12];
abiCPC = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addConsumer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addDistributor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addManufacturer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addRetailer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "CPCtoken",
                "type": "address"
            }
        ],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "ForSaleByDistributor",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "ForSaleByManufacturer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "ForSaleByRetailer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "PackagedByDistributor",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "packageItemByDistributor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "ProcessedByDistributor",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "processedItemByDistributor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "ProduceByManufacturer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_productType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_productNotes",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "produceItemByManufacturer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "PurchasedByConsumer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "PurchasedByDistributor",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "PurchasedByRetailer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "purchaseItemByConsumer",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "purchaseItemByDistributor",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "purchaseItemByRetailer",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "ReceivedByDistributor",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "ReceivedByRetailer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "receivedItemByDistributor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "receivedItemByRetailer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceConsumer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceDistributor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceManufacturer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceRetailer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "sellItemByDistributor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "sellItemByManufacturer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "sellItemByRetailer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "ShippedByDistributor",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "upc",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "ShippedByManufacturer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "shippedItemByDistributor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "shippedItemByManufacturer",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "CONSUMER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DISTRIBUTOR_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "fetchItem",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "itemSKU",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "itemUPC",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "productID",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "productType",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "productPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "productDate",
                "type": "uint256"
            },
            {
                "internalType": "enum SupplyChain.State",
                "name": "itemState",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "ownerID",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "originManufacturerID",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "distributorID",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "retailerID",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "consumerID",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_upc",
                "type": "uint256"
            }
        ],
        "name": "fetchitemHistory",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "blockManufacturerToDistributor",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "blockDistributorToRetailer",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "blockRetailerToConsumer",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MANUFACTURER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "RETAILER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
abiCPCToken = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

var t_prod = $('#tabla_piezas').DataTable({
    "paging": true,
    "ordering": false,
    "info": true,
    "searching": false,
    "columns": [
        { "width": "20%" },
        { "width": "80%" }      
    ]
});

var btnComprar = document.getElementById("btnComprarPieza");
var btnRecibir = document.getElementById("btnRecibir");
var btnProcesar = document.getElementById("btnProcesar");
var btnEmpaquetar = document.getElementById("btnEmpaquetar");
var btnVender = document.getElementById("btnEnVenta");
var btnEnviar = document.getElementById("btnEnviar");

$(document).ready(function () {
    // Getting URL var by its name (jquery.geturlvars.js)
    $('.toast').toast({ autohide: true });
    $('.toast').toast({ delay: 2000 });
    $('.toast').toast('hide');

    $('#txtDistribuidor').val(direccionDIS);
   
    $('#txtPRECIO').focus(function () {
        $write = $('#txtPRECIO');
        onlyNumeric = true;
    });

    $('#btnComprarPieza').click(comprarPiezaDistribuidor);
    $('#btnRecibir').click(recibirPieza);
    $('#btnProcesar').click(procesarPieza);
    $('#btnEmpaquetar').click(empaquetarPieza);
    $('#btnEnVenta').click(venderPiezaDistribuidor);
    $('#btnEnviar').click(enviarPieza);
    

    $('#tabla_piezas tbody').on('click', 'tr td', function () {
        var tr = $(this).closest('tr');
        var row = t_prod.row(tr);
        $(this).toggleClass('selected');
        window.col1 = tr.find("td:eq(0)").text(); // get current row 1st TD value
        
        //Obtener detalles de la pieza con upc = windoww.col1
        detallesPieza(window.col1);
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
            partSelected = 0;
            partSelectedPrice = 0;
            partSelectedState = 0;
            $('#txtUPC').val(partSelected);
            $('#txtPRECIO').val(partSelectedPrice);
            btnComprar.disabled = true;
            btnRecibir.disabled = true;
            btnProcesar.disabled = true;
            btnEmpaquetar.disabled = true;
            btnVender.disabled = true;
            btnEnviar.disabled = true;
        }
        else {
            if(partDetails["itemUPC"] == window.col1) {
               // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
            partSelected = window.col1;
            partSelectedPrice = partDetails["productPrice"];
            partSelectedState = partDetails["itemState"];
            $('#txtUPC').val(partSelected);
            $('#txtPRECIO').val(partSelectedPrice);
            if (partSelectedState == 1 ){
                btnComprar.disabled = false;
            }
            if (partSelectedState == 3 ){
                btnRecibir.disabled = false;
            }
            if (partSelectedState == 4 ){
                btnProcesar.disabled = false;
            }
            if (partSelectedState == 5 ){
                btnEmpaquetar.disabled = false;
            }
            if (partSelectedState == 6 ){
                btnVender.disabled = false;
            }
            if (partSelectedState == 8 ){
                btnEnviar.disabled = false;
            }
            }
            
        }
       
    });
    
    Keyboard1();
    NumKeyboard();
    initWeb3();
    obtenerHistoricoEventosTodos('ForSaleByManufacturer',t_prod);
    subscribirEventoForSaleByManufacturer(t_prod);
});

/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    var val_date = new Date(partDetails["productDate"]*1000).toLocaleString();
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Identificador UPC:</td>'+
            '<td>'+ partDetails["itemUPC"] +'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Numero de unidad:</td>'+
            '<td>'+partDetails["itemSKU"]+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Hash ID:</td>'+
            '<td>'+partDetails["productID"]+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Tipo de pieza:</td>'+
        '<td>'+partDetails["productType"]+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Precio:</td>'+
        '<td>'+partDetails["productPrice"]+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Fecha de producción:</td>'+
        '<td>'+val_date+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Estado de la pieza:</td>'+
        '<td>'+partStates[partDetails["itemState"]]+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Direccion Propietario:</td>'+
        '<td>'+partDetails["ownerID"]+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Direccion Fabricante:</td>'+
        '<td>'+partDetails["originManufacturerID"]+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Direccion Distribuidor:</td>'+
        '<td>'+partDetails["distributorID"]+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Direccion Comercializador:</td>'+
        '<td>'+partDetails["retailerID"]+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Direccion Cliente final:</td>'+
        '<td>'+partDetails["consumerID"]+'</td>'+
        '</tr>'+
    '</table>';
}

function initWeb3() {
    if (typeof window.ethereum !== 'undefined') {

      try {
        window.ethereum.autoRefreshOnNetworkChange = false;
      } catch (error) {
        // User denied account access
        console.log('User denied web3 access');
        return;
      }
      web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
    else if (window.web3) {
      // Deprecated web3 provider
      web3 = new Web3(web3.currentProvider);
      // no need to ask for permission
    }
    else {
      console.log('No web3 provider detected');
      return;
    }
    initcontract();
    initcontractToken();
  }

function initcontract() {
	CPCContract = new web3.eth.Contract(abiCPC, AddressCPCContract);
	console.log('SC iniciaContrato  OK');
    web3.eth.getBlockNumber().then(getBlock);
        //console.log(miSmartContract);
}
function initcontractToken() {
	CPCTokenContract = new web3.eth.Contract(abiCPCToken, AddressCPCTokenContract);
	console.log('SC iniciaContrato Token  OK');
        //console.log(miSmartContract);
}
function getBlock(val){
    blocknum = val;
    console.log('blocknum; ' + blocknum);
}
function comprarPiezaDistribuidor() {
    var serial = $('#txtUPC').val();
    var part_type = $('#selTipo').val();
    var price = $('#txtPRECIO').val();
    var notes = $('#txtNotas').val();
    
    //Create part and send information to blockchain
    if(partSelectedState != 1) {
        showtoast("Comprar pieza ", "Verifique el estado actual de la pieza, no es posible comprar la pieza");
    } else{
    miAddress = web3.eth.accounts.currentProvider.selectedAddress;
    console.log(miAddress);
    CPCTokenContract.methods.approve(AddressCPCContract,price).send({ from: miAddress, gas: 1000000 }, function (error, result) {
        console.log("Smart Contract Transaction sent");
        console.log(result);   
       });
    CPCContract.methods.purchaseItemByDistributor(serial).send({ from: miAddress, gas: 1000000 }, function (error, result) {
    console.log("Smart Contract Transaction sent");
    console.log(result);   
   });
   }
}
function recibirPieza() {
    var serial = $('#txtUPC').val();
    
    //Create part and send information to blockchain
    if(partSelectedState != 3) {
        showtoast("Recibir pieza ", "Verifique el estado actual de la pieza, no es posible recibir la pieza");
    } else{
    miAddress = web3.eth.accounts.currentProvider.selectedAddress;
    console.log(miAddress);
    CPCContract.methods.receivedItemByDistributor(serial).send({ from: miAddress, gas: 1000000 }, function (error, result) {
    console.log("Smart Contract Transaction sent");
    console.log(result);   
   
   });
    }
}
function procesarPieza() {
    var serial = $('#txtUPC').val();
    
    //Create part and send information to blockchain
    if(partSelectedState != 4) {
        showtoast("Procesar pieza ", "Verifique el estado actual de la pieza, no es posible procesar la pieza");
    } else{
    miAddress = web3.eth.accounts.currentProvider.selectedAddress;
    console.log(miAddress);
    CPCContract.methods.processedItemByDistributor(serial).send({ from: miAddress, gas: 1000000 }, function (error, result) {
    console.log("Smart Contract Transaction sent");
    console.log(result);   
   
   });
    }
}
function empaquetarPieza() {
    var serial = $('#txtUPC').val();
    
    //Create part and send information to blockchain
    if(partSelectedState != 5) {
        showtoast("Empaquetar pieza ", "Verifique el estado actual de la pieza, no es posible empaquetar la pieza");
    } else{
    miAddress = web3.eth.accounts.currentProvider.selectedAddress;
    console.log(miAddress);
    CPCContract.methods.packageItemByDistributor(serial).send({ from: miAddress, gas: 1000000 }, function (error, result) {
    console.log("Smart Contract Transaction sent");
    console.log(result);   
   
   });
    }
}
function venderPiezaDistribuidor() {
    var serial = $('#txtUPC').val();
    var price = $('#txtPRECIO').val();

    //Create part and send information to blockchain
    if(partSelectedState != 6) {
        showtoast("Vender pieza ", "Verifique el estado actual de la pieza, no es posible vender la pieza");
    } else{
    miAddress = web3.eth.accounts.currentProvider.selectedAddress;
    console.log(miAddress);
    CPCContract.methods.sellItemByDistributor(serial, price).send({ from: miAddress, gas: 1000000 }, function (error, result) {
    console.log("Smart Contract Transaction sent");
    console.log(result);   
   
   });
    }
}
function enviarPieza() {
    var serial = $('#txtUPC').val();
    
    //Create part and send information to blockchain
    if(partSelectedState != 8) {
        showtoast("Enviar pieza ", "Verifique el estado actual de la pieza, no es posible enviar la pieza");
    } else{
    miAddress = web3.eth.accounts.currentProvider.selectedAddress;
    console.log(miAddress);
    CPCContract.methods.shippedItemByDistributor(serial).send({ from: miAddress, gas: 1000000 }, function (error, result) {
    console.log("Smart Contract Transaction sent");
    console.log(result);   
   
   });
    }
}

function detallesPieza(_upc) {
    console.log("Populate details, get info from chain");
    //Query blockchain for data to fill element
    miAddress = web3.eth.accounts.currentProvider.selectedAddress;
    console.log(miAddress);
    CPCContract.methods.fetchItem(_upc).call({ from: miAddress }, function (error, part_info) {
        if (error)
            console.log(error);
        else {
            console.log("Part info");
        }
        partDetails = part_info;
    });

}

async function obtenerHistoricoEventos(addr, event, table) {
    CPCContract.getPastEvents(event,{
        filter: { account: addr },// 
        fromBlock: blockini, toBlock: blockfin}, function(error, events){ console.log(events); })
    .then(function(events){
            for (var i = 0; i < events.length; i++) {
                table.row.add([events[i].returnValues.upc, events[i].returnValues.account, "<button class='btn btn-light btn-lg' ><i class='bi bi-bag-plus'></button>"]).draw(false);
                
            }
            console.log('bloque ini:' + blockini);
            console.log('bloque fin:' + blockfin);
            console.log('blocknum' + blocknum);
            if ((blockfin < blocknum - 5000)) {
            blockini = blockfin;
            blockfin = blockini + 5000;
            obtenerHistoricoEventos(addr, event, table);
        }
    });
}
async function obtenerHistoricoEventosTodos(event, table) {
    CPCContract.getPastEvents(event,{ 
        fromBlock: blockini, toBlock: blockfin}, function(error, events){ console.log(events); })
    .then(function(events){
            for (var i = 0; i < events.length; i++) {
                table.row.add([events[i].returnValues.upc, events[i].returnValues.account, "<button class='btn btn-light btn-lg' ><i class='bi bi-bag-plus'></button>"]).draw(false);
            }
            if ((blockfin < blocknum)) {
                blockini = blockfin;
                blockfin = blockini + 5000;
            obtenerHistoricoEventosTodos(event, table);
            }
    });
}


async function subscribirEventoProduceByManufacturer(addr, table) {
    CPCContract.events.ProduceByManufacturer({
        filter: {account: addr} //
    }, function(error, event){ console.log(event); })
    .on("connected", function(subscriptionId){
        console.log(subscriptionId);
    })
    .on('data', function(event){
        console.log(event); // same results as the optional callback above
        table.row.add([event.returnValues.upc, event.returnValues.account, "<button class='btn btn-light btn-lg' ><i class='bi bi-bag-plus'></button>"]).draw(false);
    })
    .on('changed', function(event){
        // remove event from local database
    })
    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.

    });
}

async function subscribirEventoForSaleByManufacturer(table) {
    CPCContract.events.ForSaleByManufacturer({
    }, function(error, event){ console.log(event); })
    .on("connected", function(subscriptionId){
        console.log(subscriptionId);
    })
    .on('data', function(event){
        console.log(event); // same results as the optional callback above
        table.row.add([event.returnValues.upc, event.returnValues.account, "<button class='btn btn-light btn-lg' ><i class='bi bi-bag-plus'></button>"]).draw(false);
    })
    .on('changed', function(event){
        // remove event from local database
    })
    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.

    });
}

function Keyboard1() {
    
    $('#txtNotas').keyboard({
        layout: 'custom',
        customLayout: {
            'default': [
                '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                '{tab} Q W E R T Y U I O P [ ] \\',
                'A S D F G H J K L ; \' ',
                'Z X C V B N M , . /',
                '{accept} {space} {left} {right}'
            ]
        },
        maxLength: 70,
        restrictInput: true, // Prevent keys not in the displayed keyboard from being typed in
        useCombos: false // don't want A+E to become a ligature
    });
    
}
function NumKeyboard() {
   
    $('#txtPRECIO').keyboard({
        layout: 'custom',
        customLayout: {
            'default': [
                '7 8 9',
                '4 5 6',
                '1 2 3',
                '0 . ',
                '{bksp} {accept} {cancel}'
            ]
        },
        maxLength: 18,
        restrictInput: true, // Prevent keys not in the displayed keyboard from being typed in
        useCombos: false, // don't want A+E to become a ligature
        openOn: 'touchstart'
    });
}

function showtoast(msgheader,msgtext) {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show());
    document.getElementById("toastHeader").innerHTML = msgheader;
    document.getElementById("toastBody").innerHTML = msgtext;
}

    String.prototype.trimEnd = function ( c ) {
        c = c ? c : ' ';
        var i = this.length - 1;
        for ( ; i >= 0 && this.charAt( i ) == c; i-- );
        return this.substring( 0, i + 1 );
    }