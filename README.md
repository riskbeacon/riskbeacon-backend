# RiskBeacon — riskbeacon-backend

> Asset and protocol risk attestations with evidence trails.

![RiskBeacon Backend API](banner.png)

## About the project

RiskBeacon is an attestation system for crypto-asset and protocol risk, built on Stellar/Soroban. Analysts and auditors publish signed risk attestations about an asset or protocol, each linked to the evidence behind it, so a reader can see not just *what* rating was given but *why*, and who stood behind it. Like a beacon, the latest attestation is easy to find; unlike an opaque score, every claim keeps an auditable evidence trail.

**Who it is for:** Risk analysts and auditors (attesters), and treasuries, integrators and users who consume risk information.

**How the pieces fit together:**

| Repository | Responsibility |
|---|---|
| `riskbeacon-contracts` | On-chain Soroban state and authorization — the source of truth |
| `riskbeacon-backend` | Off-chain indexing, read models and operational APIs |
| `riskbeacon-app` | User-facing web application |

Typical flow:

1. An attester publishes a risk attestation for an asset or protocol on-chain (authorized by the attester's Stellar account).
2. The backend indexes attestations and their evidence references into a queryable read model.
3. A reader opens the web app, browses an asset's attestation history and follows the evidence trail.

## This repository: Backend API

The **backend** repository is the off-chain service for RiskBeacon. It indexes contract activity, serves read models and exposes operational APIs so the web app stays fast. By design it is *not* the source of truth for anything the contract owns — if the backend and the chain disagree, the chain wins.

### What is included today

- A dependency-light Node.js + TypeScript HTTP server (`node:http`, ESM) that listens on `PORT` (default `8787`).
- `GET /health` → `{"ok":true,"service":"riskbeacon-backend"}` for uptime checks.
- `GET /network` → the Stellar network passphrase the service is configured for (currently Testnet).
- Any other route → `404 {"error":"not_found"}`.
- `@stellar/stellar-sdk` 17.2.1 wired in, ready for RPC calls and contract-event indexing.
- A baseline test (`node --test`) so CI has a harness to grow from.

### Tech stack

Node.js · TypeScript 5.8 · `tsx` · `@stellar/stellar-sdk` 17.2.1

### Getting started

```bash
npm install
cp .env.example .env   # then fill in the values below
npm run dev           # start the API with tsx
npm run build         # type-check and compile with tsc
npm test              # run the test suite
```

Quick check once it is running:

```bash
curl http://localhost:8787/health
```

### Configuration

| Variable | Purpose | Default |
|---|---|---|
| `PORT` | Port the HTTP server listens on | `8787` |
| `STELLAR_RPC_URL` | Soroban RPC endpoint to read chain state from | `https://soroban-testnet.stellar.org` |
| `DATABASE_URL` | Database for indexed data / read models | *(empty — set when persistence is added)* |
| `CONTRACT_ID` | Deployed RiskBeacon contract to index | *(empty — set after deployment)* |

## Roadmap

- Subscribe to RiskBeacon contract events through Stellar RPC and index them.
- Add persistence behind `DATABASE_URL` and domain read endpoints for the app.
- Add structured logging, rate limiting and real tests beyond the baseline.

## Maintainer

`@ollypee22`

## Status

**v0.1.0 development baseline — not audited and not production-ready.**

## Stellar alignment

The project uses Stellar/Soroban where on-chain state is the source of truth or where deterministic settlement is valuable. Off-chain services are kept out of consensus-critical logic.

## License

Apache-2.0
