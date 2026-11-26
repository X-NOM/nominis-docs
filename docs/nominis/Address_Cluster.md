# Address Cluster API Documentation

## Overview

The Address Cluster API returns wallet addresses associated with a requested address and blockchain cluster. Use it to identify additional addresses that may belong to the same ownership or activity cluster.

---

## Endpoint

- **URL:** `https://authapi0.nominis.io:8443/v2/address/cluster`
- **Method:** `GET`
- **Content-Type:** `application/json`

---

## Request Parameters

| Parameter | Type   | Required | Description                                               |
|-----------|--------|----------|-----------------------------------------------------------|
| `address` | string | Yes      | Wallet address to investigate                             |
| `chain`   | string | Yes      | Blockchain identifier, such as `eth`, `bsc`, or `polygon` |
| `api_key` | string | Yes      | The API key provided to the client                        |

---

## Example Request

```python
import requests

response = requests.get(
    "https://authapi0.nominis.io:8443/v2/address/cluster",
    params={
        "address": "0x03fea254cfa7434004e8d495725bcbb7ccc40454",
        "chain": "bsc",
        "api_key": "x_111111_1111111_11111_11111",
    },
)

print(response.json())
```

---

## Response

```json
{
  "time": 1767862800.220614,
  "status": "ok",
  "error": "",
  "request_type": "get_cluster",
  "chain": "bsc",
  "address": "0x03fea254cfa7434004e8d495725bcbb7ccc40454",
  "data": {
    "addresses": [
      "0x64d76d4031ba283b00740bf332048b44485c9590",
      "0x822ccc9783e4ab297d9747a1a9d9afe32ba17912",
      "0xa3fd4f213b352b99e5fae955d9d8f3a4b4777b23"
    ],
    "total_count": 19074
  }
}
```

The `addresses` array may contain more entries than shown in this abbreviated example.

---

## Response Fields

| Field          | Type   | Description                         |
|----------------|--------|-------------------------------------|
| `time`         | epoch  | Time of the request                 |
| `status`       | string | `ok` if successful, `fail` if not   |
| `error`        | string | Error message if the request failed |
| `request_type` | string | Always `get_cluster`                |
| `chain`        | string | Blockchain queried                  |
| `address`      | string | Address submitted in the request    |
| `data`         | object | Cluster results                     |

### Cluster Data Fields

| Field         | Type    | Description                              |
|---------------|---------|------------------------------------------|
| `addresses`   | array   | Addresses associated with the cluster    |
| `total_count` | integer | Total number of addresses in the cluster |

---

## Notes

- Supply the same blockchain identifier used for the address being checked.
- Cluster results are specific to the selected blockchain.
- For error handling, check the `status` and `error` fields in the response.
- For support, contact the [Nominis API team](/intro#support)
