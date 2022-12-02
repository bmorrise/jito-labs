# Solana API

## Fetch the current SOL price

### _GET_ /sol/price

Fetches the current SOL price

#### Resource URL

`https://api.fakecompany.com/v1/sol/price`
|Name|required|description|default value
|-|-|-|-|
|currency|optional|currency for the return value|USD|

#### Example Request

`https://api.fakecompany.com/v1/sol/price?currency=USD`

#### Example Response

```
{
	timestamp: 1669951150
	currency: "USD"
	value: 13.51
}
```

# Fetch historical SOL price

### _GET_ /sol/history

Fetches historical price

#### Resource URL

`https://api.fakecompany.com/v1/sol/history`
|Name|required|description|default value
|-|-|-|-|
|from|optional|the from timestamp|start of current week|
|to|optional|the to timestamp|current day|
|interval|optional|the time buckets for the result (HOUR, DAY, WEEK)|DAY|

#### Example Request

`https://api.fakecompany.com/v1/sol/history?from=1669364350&to=1669951150&interval=DAY`

#### Example Response

```
{
	timestamp: 1669951150
	from: 1669364350
	to: 1669450750
	interval: "DAY",
	values: [
		{
			timestamp: 1669364350,
			value: 14.02,
			volume: 384465606
		},
		{
			timestamp: 1669450750,
			value: 14.24,
			volume: 2783778478
		},
		{
			timestamp: 1669450750,
			value: 13.13,
			volume: 2212737328
		},
		{
			timestamp: 1669450750,
			value: 13.39,
			volume: 3073341834
		},
	]
}
```

# Fetch a recipient’s SOL balance

### _GET_ /sol/wallet/[address]/balance

Fetches the current SOL balance in a wallet

#### Resource URL

`https://api.fakecompany.com/v1/sol/wallet/[address]/balance`

#### Example Request

`https://api.fakecompany.com/v1/sol/wallet/DW6rvgciBpeNTZnpqSMNzhFzpHNNymhzb86G64bV8JsC/balance`

#### Example Response

```
{
	timestamp: 1669951150
	address: "DW6rvgciBpeNTZnpqSMNzhFzpHNNymhzb86G64bV8JsC"
	balance: 21200212
}
```
