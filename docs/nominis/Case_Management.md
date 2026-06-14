# Case Management API Documentation

## Overview
The Case Management API allows users to retrieve historical checks of wallets or transactions and update case information.

---

## Get Cases

### Endpoint
- **URL:** `https://authapi0.nominis.io:8443/v2/client/cases`  
- **Method:** `GET`  
- **Content-Type:** `application/json`

### Request Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `start_time` | string | Yes | Filter by case start time in unix time |
| `end_time` | string | Yes | Filter by case end time in unix time |
| `api_key` | string | Yes | The API key provided to the client |

### Example Request

```python
import requests

start_time = 1780272000
end_time = 1781568000

response = requests.get(
    f'https://authapi0.nominis.io:8443/v2/client/cases?'
    f'start_time={start_time}&'
    f'end_time={end_time}&'
    f'api_key=<api_key>'
)

print(response.json())
```

### Response

The response contains a list of cases with their corresponding id.

```json
{
  "time": 1781419459.36069,
  "status": "ok",
  "error": "",
  "request_type": "client_cases",
  "data": [
    {
      "id": "6076bb86-d751-4271-ab40-4a448b7e9293",
      "ref_id": "None",
      "case_time": 1781418885.93377,
      "case_type": "wallet_screening",
      "categories": [
        "high risk exchange",
        "cex",
        "user wallet",
        "unknown cex",
        "otc",
        "hot wallet",
        "gas vault",
        "dex trader",
        "financial service",
        "whale",
        "proxy wallet",
        "phishing",
        "low kyc exchange"
      ],
      "chain": "tron",
      "entity": "TZ3d4tAhiAggswBjM7GKMU6Ax1YhTNGhjx",
      "entity_name": "Unnamed OTC*",
      "total_in": 22352381.82,
      "risk_score": "critical",
      "status": "pending_review",
      "note": null,
      "assignee": ""
    },
    {
      "id": "3ad47204-e1c8-4f66-af77-b79963599bfe",
      "ref_id": "None",
      "case_time": 1781418652.19993,
      "case_type": "wallet_screening",
      "categories": [
        "cex",
        "unknown cex",
        "hot wallet",
        "gambling",
        "high risk exchange",
        "user wallet",
        "dex trader",
        "financial service",
        "sanctioned",
        "otc",
        "blocked",
        "low kyc exchange",
        "terror finance"
      ],
      "chain": "tron",
      "entity": "TBw35fPPTtgC7Xs9Bdh8eRDjg2oXN6WhWc",
      "entity_name": "Stake",
      "total_in": 1059.07,
      "risk_score": "critical",
      "status": "pending_review",
      "note": null,
      "assignee": ""
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `time` | unix | Time of the request |
| `status` | string | `ok` if successful, `fail` if not |
| `error` | string | Error message if the request failed |
| `request_type` | string | Always `client_cases` |
| `data` | array | Array of cases |

### Case Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | uuid | Unique internal identifier for the case |
| `ref_id` | string \| null | External reference ID linking to another system; "None" if not set |
| `case_time` | unix | When the case was created, in seconds since epoch |
| `case_type` | string | Type of investigation, e.g. "wallet_screening" |
| `categories` | array of strings | Risk and behavioral tags describing the wallet and its exposure (cex, gambling, sanctioned, terror finance, etc.) |
| `chain` | string | Blockchain network the wallet belongs to (e.g. tron, eth, btc) |
| `entity` | string | The wallet address / transaction hash being screened |
| `entity_name` | string | Human-readable label or attribution for the wallet (e.g. "Stake") |
| `total_in` | number (float) | Total value received by the wallet, in USD |
| `risk_score` | string | Overall risk rating: low, med, high, critical |
| `status` | string | Workflow state: pending_review, sar_filled, closed, resolved, blocked, dismissed |
| `note` | string | Free-text analyst comments; null if none |
| `assignee` | string | Username of the analyst assigned to the case; empty string if unassigned |

---

## Update a Case

Update information of a specific case.

### Endpoint
- **URL:** `https://authapi0.nominis.io:8443/v2/client/case/update`  
- **Method:** `POST`  
- **Content-Type:** `application/json`

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `api_key` | string | Yes | Authentication key identifying the caller / client making the request |
| `case_type` | string | Yes | Type of case being updated (e.g. "wallet_screening") |
| `id` | uuid | Yes | Unique identifier of the case to update |
| `note` | string \| null | Yes | Analyst comment to attach to the case |
| `status` | string | Yes | New workflow state for the case (pending_review, open, escalated, closed, resolved) |
| `assignee` | string | No | Username of the analyst to assign; defaults to empty string if not provided |

### Example Request

```python
import requests

data = {
    'id': '000111–0211…',
    'case_type': 'wallet_screening',
    'note': 'funds were returned',
    'status': 'blocked',
    'api_key': 'x_11111111-1111111-1111-1111'
}

response = requests.post(
    'https://authapi0.nominis.io:8443/v2/client/case/update',
    json=data
)

print(response.json())
```

---

## Notes

- For error handling, check the `status` and `error` fields in the response.  
- For support, contact the [Nominis API team](/intro#support)
