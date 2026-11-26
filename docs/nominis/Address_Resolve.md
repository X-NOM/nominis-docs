# Address Resolve API Documentation

## Overview

The Address Resolve API identifies the blockchains that support a wallet address and recommends a default blockchain to use.

Use this endpoint when the chain is not already known—for example, before sending an address to an endpoint that requires a `chain` parameter.

---

## Endpoint

- **URL:** `https://authapi0.nominis.io:8443/v1/resolve_address`
- **Method:** `GET`
- **Content-Type:** `application/json`

---

## Request Parameters

| Parameter | Type   | Required | Description                 |
|-----------|--------|----------|-----------------------------|
| `address` | string | Yes      | Wallet address to resolve   |
| `api_key` | string | Yes      | The API key provided to the client |

---

## Example Request

```python
import requests

response = requests.get(
    "https://authapi0.nominis.io:8443/v1/resolve_address",
    params={
        "address": "0x400F643Ae9ae6532f974Eb51F284F80170063f4B",
        "api_key": "x_111111_1111111_11111_11111",
    },
)

print(response.json())
```

---

## Response

A successful response includes the compatible blockchains and a recommended default chain.

```json
{
  "time": 1727373216.2551696,
  "status": "ok",
  "error": "",
  "request_type": "resolve_address",
  "address": "0x400F643Ae9ae6532f974Eb51F284F80170063f4B",
  "data": {
    "chains": ["arbitrum", "bsc", "eth", "polygon", "optimism"],
    "default": "eth"
  }
}
```

The `chains` array may contain additional compatible blockchains.

---

## Response Fields

| Field          | Type   | Description                         |
|----------------|--------|-------------------------------------|
| `time`         | epoch  | Time of the request                 |
| `status`       | string | `ok` if successful, `fail` if not   |
| `error`        | string | Error message if the request failed |
| `request_type` | string | Always `resolve_address`            |
| `address`      | string | Address submitted in the request    |
| `data`         | object | Resolved blockchain information     |

### Resolved Address Data Fields

| Field     | Type   | Description                                          |
|-----------|--------|------------------------------------------------------|
| `chains`  | array  | Blockchains on which the address format is supported |
| `default` | string | Recommended default blockchain for the address       |

---

## Notes

- Resolving an address helps determine where to send subsequent chain-specific requests.
- The returned `default` chain is a recommendation and may need to be overridden when the intended blockchain is known.
- For chain-specific endpoints, continue to pass the selected blockchain explicitly when required.
- For error handling, check the `status` and `error` fields in the response.
- For support, contact the [Nominis API team](/intro#support)
