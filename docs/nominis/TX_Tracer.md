---
title: TX Tracer
sidebar_label: TX Tracer
description: Transaction tracing API — trace the source or destination of funds
---

# Transaction Trace API Documentation

import FirstVisitModal from '@site/src/components/FirstVisitModal';

<FirstVisitModal>
To get access to the tracer api, please speak to your account manager at Nominis
</FirstVisitModal>

## Overview
The Transaction Trace API allows users to trace cryptocurrency transactions to determine the source of funds or their destination. Users can track transactions forward or backward, with an optional `depth` parameter to adjust the level of tracing.

---

## Endpoint
- **URL:** `https://authapi0.nominis.io:8443/v2/transaction/trace`
- **Method:** `POST`
- **Content-Type:** `application/json`

---

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `chain`   | string | Yes | The blockchain network of the transaction (e.g., `eth`). |
| `tx_hash` | string | Yes | The transaction hash to be traced. |
| `direction` | string | Yes | The direction of tracing (`backward` or `forward`). |
| `depth`   | int | No | Optional depth parameter to adjust tracing depth. Default: `20`. |
| `api_key` | string | Yes | The API key provided to the client. |

---

## Example Request

```python
import requests

data = {
    'chain': 'eth',
    'tx_hash': '0x1b2c1641b4b02ba3b11fe7c4219f3708b1a37f79045c65376c1d4e4864468722',
    'direction': 'backward',
    'depth': 10,
    'api_key': 'x_11111111-1111111-1111-1111'
}

response = requests.post('https://authapi0.nominis.io:8443/v2/transaction/trace', json=data)

print(response.json())
```

---

## Response

### Initial Response

The initial response contains a unique request ID that should be used to check the tracing status.

```json
{
    "time": 1743667966.522422,
    "status": "ok",
    "error": "",
    "request_type": "trace_tx",
    "chain": "eth",
    "tx_hash": "0x1b2c1641b4b02ba3b11fe7c4219f3708b1a37f79045c65376c1d4e4864468722",
    "data": "59879f81-0926-4ee3-aacb-28c42df30a12"
}
```

---

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `time` | epoch | The time of the request. |
| `status` | string | Indicates whether the request was successful (`ok`) or failed (`fail`). |
| `error` | string | The error message if the request failed. |
| `request_type` | string | The type of request, always `trace_tx`. |
| `chain` | string | The blockchain network specified in the request. |
| `tx_hash` | string | The transaction hash specified in the request. |
| `data` | string | A unique request ID to query the tracing results. |

---

## Fetching Tracing Results

After receiving the request ID, query the following endpoint every ~5 seconds until the status is `done`.

- **Endpoint:** `GET https://authapi0.nominis.io:8443/v2/transaction/trace/{request_id}`
- **Method:** `GET`
- **Content-Type:** `application/json`

### Example Response (Completed Trace)

```json
{
    "time": 1743668065.7019856,
    "status": "ok",
    "error": "",
    "request_type": "trace_tx",
    "req_id": "59879f81-0926-4ee3-aacb-28c42df30a12",
    "data": {
        "status": "done",
        "result": [
            {
                "unique_id": "633a6fef38",
                "created_at": 1743622451,
                "tx_hash": "0x1b2c1641b4b02ba3b11fe7c4219f3708b1a37f79045c65376c1d4e4864468722",
                "sender": "0x8cf949552b846ce3d9cb99f648c23c124023d366",
                "sender_name": "",
                "sender_classification": [],
                "sender_risk_factors": [],
                "sender_risk_score": "low",
                "receiver": "0x02edb25bc6bab80d6bfc8496dab6743af1407b8c",
                "receiver_name": "",
                "receiver_classification": [],
                "receiver_risk_factors": [],
                "receiver_risk_score": "low",
                "coin": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                "coin_name": "Native",
                "amount": 0.0078,
                "adj_amount": 0.0078,
                "proximity": 0
            }
        ]
    }
}
```

---

## Result Fields

| Field | Type | Description |
|-------|------|-------------|
| `time` | epoch | The time of the request. |
| `status` | string | The request status (`ok` or `fail`). |
| `error` | string | The error message if applicable. |
| `request_type` | string | The type of request (`trace_tx`). |
| `req_id` | string | The request ID received from the initial request. |
| `data.status` | string | Indicates if tracing is `pending` or `done`. |
| `data.result` | array | An array of traced transactions. |
| `unique_id` | string | The unique ID of the traced transaction. |
| `created_at` | epoch | Timestamp of transaction creation. |
| `tx_hash` | string | The transaction hash. |
| `sender` | string | The sender's address. |
| `sender_name` | string | The name of the sender (if available). |
| `sender_classification` | array | Classification labels for the sender. |
| `sender_risk_factors` | array | Risk factors associated with the sender. |
| `sender_risk_score` | string | The risk level of the sender (`low`, `medium`, `high`, `critical`). |
| `receiver` | string | The receiver's address. |
| `receiver_name` | string | The name of the receiver (if available). |
| `receiver_classification` | array | Classification labels for the receiver. |
| `receiver_risk_factors` | array | Risk factors associated with the receiver. |
| `receiver_risk_score` | string | The risk level of the receiver (`low`, `medium`, `high`, `critical`). |
| `coin` | string | The coin address (or `0xeeee...` for native tokens). |
| `coin_name` | string | The name of the token (e.g., `Native`). |
| `amount` | float | The amount transferred. |
| `adj_amount` | float | Adjusted amount based on the initial amount of the tx hash. |
| `proximity` | int | The transaction's proximity level in the trace. |

---

## Notes

- The `depth` parameter controls how many levels deep the tracing should go.
- API users should check the results endpoint every ~5 seconds until the trace status is `done`.
- For error handling, check the `status` and `error` fields in the response.
- For support, contact the [Nominis API team](/intro#support)
