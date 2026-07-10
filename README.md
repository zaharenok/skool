# Skool API (Skapi.pro) — n8n Node

<div align="center">

**Automate your Skool community with n8n.** Manage join requests, monitor messages and notifications — all in your workflow.

[![npm version](https://badge.fury.io/js/n8n-nodes-skool.svg)](https://www.npmjs.com/package/n8n-nodes-skool)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n](https://img.shields.io/badge/n8n-compatible-green.svg)](https://n8n.io)

> Website: **[skapi.pro](https://skapi.pro)** · Chrome Extension: **[Skapi.pro](https://chromewebstore.google.com/detail/skapipro/nibelkfckbgkoohibdbmalmkmhbfblaf)** · Community: **[skool.com/ai-pays-my-bills-7018](https://www.skool.com/ai-pays-my-bills-7018/about)**

</div>

---

## What this node does

The **Skool API** node connects n8n to [SkAPI.pro](https://skapi.pro) — an API service that lets you automate management of your Skool.com communities. With this node you can:

- See who's waiting to join your group
- Approve or decline join requests automatically
- Read new messages in your groups
- Pull your Skool notifications into any workflow

Perfect for community managers who want to automate repetitive moderation work.

---

## Installation

### Via n8n UI (recommended)

1. Open n8n → **Settings** → **Community Nodes**
2. Click **Install** and enter: `n8n-nodes-skool`
3. Click **Install**, then restart n8n

### Via npm (self-hosted)

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-skool
```

Restart n8n after installing.

---

## Get your JWT token

The node authenticates with a JWT token from SkAPI.pro. To get one:

1. Sign up at **[skapi.pro](https://skapi.pro)**
2. Install the **Skapi.pro Chrome Extension** from [Chrome Web Store](https://chromewebstore.google.com/detail/skapipro/nibelkfckbgkoohibdbmalmkmhbfblaf)
3. Open the extension popup and copy your **JWT token**

Then in n8n: add a **Skool API** node → **Create New Credential** → **Skapi.pro API** → paste the token → Save.

---

## Operations

The node has three resources: **Join Request**, **Message**, and **Notification**. Each resource has one or more operations.

### 1. Join Request

#### Check Join Requests

Returns the list of members waiting to be approved into a group.

| Parameter | Required | Description |
|-----------|----------|-------------|
| Group URL or ID | yes | Skool group slug (e.g. `ai-pays-my-bills-7018`) or full URL |
| Limit | no | Max number of results (default 20) |

**Output** — an array of join request objects, each containing the applicant's name, profile URL, spam risk score and request date. Use this to review who wants to join.

#### Process Join Request

Approves or declines a specific join request.

| Parameter | Required | Description |
|-----------|----------|-------------|
| Group URL or ID | yes | Skool group slug or URL |
| Action | yes | `Approve` or `Decline` |
| Search By | yes | How to find the request: `Name`, `Email`, or `Profile URL` |
| Search Value | yes | The value to search for (e.g. `John Doe`) |

**Output** — the result of the approve/decline action with the member's details.

> Tip: chain this after **Check Join Requests** to process applicants automatically.

#### Send Welcome Message *(coming soon)*

Sends a welcome message to a newly approved member. This operation returns a placeholder for now — the API endpoint is under development.

---

### 2. Message

#### Check Messages

Returns new/unread messages across the authenticated account for a given group.

| Parameter | Required | Description |
|-----------|----------|-------------|
| Group URL or ID | yes | Skool group slug or URL |
| Limit | no | Max number of results (default 20) |

**Output** — an array of message objects with sender, content, timestamp and read status.

---

### 3. Notification

#### Check Notifications

Returns recent Skool notifications (mentions, replies, follows, etc.) for the authenticated account.

| Parameter | Required | Description |
|-----------|----------|-------------|
| *(no parameters)* | | Uses the JWT token from credentials |

**Output** — an array of notification objects with type, text, link and timestamp.

---

## Example workflows

### Auto-approve join requests

Run every 5 minutes, check for pending requests, approve them, and log to Google Sheets.

```
Schedule Trigger (every 5 min)
  → Skool API: Check Join Requests
  → Split In Batches (loop over each request)
  → Skool API: Process Join Request (Approve, Search By = Name)
  → Google Sheets: Append row
```

### Notify on new messages in Slack

```
Schedule Trigger (every 10 min)
  → Skool API: Check Messages
  → Filter (only unread)
  → Slack: Send message
```

### Daily digest of notifications

```
Schedule Trigger (daily 9am)
  → Skool API: Check Notifications
  → Summarize / Format
  → Email: Send digest
```

---

## Credentials

The node uses a single credential type: **Skapi.pro API**.

| Field | Required | Description |
|-------|----------|-------------|
| JWT Token | yes | Your Skapi.pro JWT token |
| Client ID | no | Optional tracking ID |

---

## Rate limits

SkAPI.pro applies rate limits based on your plan:

| Plan | Requests / month | Requests / minute |
|------|------------------|-------------------|
| Free | 100 | 10 |
| Pro | 1,000 | 20 |
| VIP | 2,000 | 50 |

If you exceed the limit the API returns a 429 error and the node will surface it in the workflow. Upgrade at **[skapi.pro](https://skapi.pro)**.

---

## API endpoints used

The node calls the SkAPI.pro API at `https://api.skapi.pro`:

| Operation | Method & path |
|-----------|---------------|
| Check Join Requests | `POST /check-join-requests` |
| Process Join Request | `POST /process-join-request` |
| Check Messages | `POST /check-messages` |
| Check Notifications | `POST /check-notifications` |

Full API docs: **[skapi.pro/docs](https://skapi.pro/docs)**

---

## Troubleshooting

**Node doesn't appear after install** — restart n8n. Community nodes only register on startup.

**"The specified package could not be loaded"** — a known n8n loader bug. Remove the package, clear `~/.n8n/nodes/node_modules/n8n-nodes-skool` and `~/.n8n/nodes/package.json`, restart n8n and reinstall.

**Authentication error** — your JWT token may have expired. Generate a fresh one in the Skapi.pro extension.

**Rate limit (429)** — you've hit your plan's quota. Wait for the window to reset or upgrade your plan.

---

## Support

- Docs: **[skapi.pro/docs](https://skapi.pro/docs)**
- Email: **support@skapi.pro**
- Community: **[skool.com/ai-pays-my-bills-7018](https://www.skool.com/ai-pays-my-bills-7018/about)**

---

## License

MIT
