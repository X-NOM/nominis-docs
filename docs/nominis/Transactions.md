# Transactions API Documentation

## Overview
The Transaction API provides in-depth transaction data for a specified wallet. Provide an optional sender or receiver address to analyze all transactions between two wallets, or leave them both blank to receive all transaction information for a wallet.

---

## Endpoint
- **URL:** `https://authapi0.xplorisk.com:8443/v2/transactions`  
- **Method:** `GET`  
- **Content-Type:** `application/json`

---

## Request Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `chain`   | string | Yes      | Blockchain network of the transaction (e.g., `eth`, `ltc`) |
| `address` | string | Yes      | Wallet address to assess |
| `sender`  | string | No       | Sender wallet address to assess (for incoming transactions) |
| `receiver` | string | No      | Receiver wallet address to assess (for outgoing transactions) |
| `api_key` | string | Yes      | The API key provided to the client |

---

## Example Requests

### All Transactions for a Wallet
```python
import requests

response = requests.get(
    "https://authapi0.xplorisk.com:8443/v2/transactions?"
    "chain=ltc&"
    "address=ltc1qyrrmwf3zl7e2h8u2pjkxc4pwym8r0vu26yczn9&"
    "api_key=x_11111111_1111111_11111_11111"
)

print(response.json())
```

### Incoming Transactions from Specific Sender
```python
import requests

response = requests.get(
    "https://authapi0.xplorisk.com:8443/v2/transactions?"
    "chain=ltc&"
    "address=ltc1qyrrmwf3zl7e2h8u2pjkxc4pwym8r0vu26yczn9&"
    "sender=ltc1qy2aabbccddee3344ff5566gg7788hh99iijjkkll&"
    "api_key=x_11111111_1111111_11111_11111"
)

print(response.json())
```

### Outgoing Transactions to Specific Receiver
```python
import requests

response = requests.get(
    "https://authapi0.xplorisk.com:8443/v2/transactions?"
    "chain=ltc&"
    "address=ltc1qyrrmwf3zl7e2h8u2pjkxc4pwym8r0vu26yczn9&"
    "receiver=ltc1qz9xxyyzz8899aa0011bb2233cc4455dd6677eeff&"
    "api_key=x_11111111_1111111_11111_11111"
)

print(response.json())
```

---

## Response

```json
{
  "time": 1770729866.1977196,
  "status": "ok",
  "error": "",
  "request_type": "get_transactions_v2",
  "data": [
    {
      "unique_id": "217a694ba9",
      "chain": "ltc",
      "created_at": 1617925569,
      "tx_hash": "0f9a321a0c39d0902baf89a831ee9854d81498ed6934a4246cc963e94a36fa7b",
      "address": "ltc1qyrrmwf3zl7e2h8u2pjkxc4pwym8r0vu26yczn9",
      "direction": "in",
      "counterparty": "ltc1qyrrmwf3zl7e2h8u2pjkxc4pwym8r0vu26yczn9",
      "name": "Crypto.com",
      "classification": [
        "cex"
      ],
      "coin": "",
      "coin_name": "Native",
      "amount": 0.20861488,
      "usd_value": 14.39
    },
    {
      "unique_id": "5b5dd228b0",
      "chain": "ltc",
      "created_at": 1615892119,
      "tx_hash": "7ed1fbc90f90265c9ad1721ecd8fd7f7aa9f6b4763a134b41de79e20d842ae38",
      "address": "ltc1qyrrmwf3zl7e2h8u2pjkxc4pwym8r0vu26yczn9",
      "direction": "out",
      "counterparty": "ltc1qz9xxyyzz8899aa0011bb2233cc4455dd6677eeff",
      "name": "Binance",
      "classification": [
        "cex"
      ],
      "coin": "",
      "coin_name": "Native",
      "amount": 1.5,
      "usd_value": 103.25
    }
  ]
}
```

---

## Response Fields

| Field          | Type   | Description |
|----------------|--------|-------------|
| `time`         | epoch  | Time of the request |
| `status`       | string | `ok` if successful, `fail` if not |
| `error`        | string | Error message if the request failed |
| `request_type` | string | Always `get_transactions_v2` |
| `data`         | array  | Array of transaction objects |

### Transaction Object Fields

| Field            | Type    | Description |
|------------------|---------|-------------|
| `unique_id`      | string  | Unique identifier for the transaction |
| `chain`          | string  | Blockchain network |
| `created_at`     | epoch   | Transaction creation timestamp |
| `tx_hash`        | string  | Transaction hash |
| `address`        | string  | The queried wallet address |
| `direction`      | string  | Direction of transaction (`in` for incoming, `out` for outgoing) |
| `counterparty`   | string  | The other party's wallet address |
| `name`           | string  | Name of the counterparty (if available) |
| `classification` | array   | Classification labels for the counterparty |
| `coin`           | string  | Coin identifier (empty for native coin) |
| `coin_name`      | string  | Name of the coin (`Native` for blockchain's native coin) |
| `amount`         | decimal | Transaction amount |
| `usd_value`      | decimal | USD value of the transaction at the time |

---

## Notes

- For error handling, check the `status` and `error` fields in the response.  
- Use `sender` parameter to filter for incoming transactions from a specific address.
- Use `receiver` parameter to filter for outgoing transactions to a specific address.
- Omit both `sender` and `receiver` to retrieve all transactions for the wallet.
- For support, contact the [Nominis API team](/intro#support)
