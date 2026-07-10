# Installation Guide

## Package name

The npm package is **`n8n-nodes-skool`** (the node itself is branded "SkAPI.pro").

---

## Method 1: Install via n8n UI (Community Nodes)

1. In n8n, go to **Settings** → **Community Nodes**
2. Click **Install a community node**
3. Enter: `n8n-nodes-skool`
4. Click **Install**

After installation, restart n8n if the node doesn't appear immediately.

---

## Method 2: Self-hosted n8n (manual npm install)

```bash
cd ~/.n8n
npm install n8n-nodes-skool
```

Then restart n8n:

```bash
# if running via npm
n8n stop
n8n start

# if running via pm2
pm2 restart n8n

# if running via Docker
docker compose restart n8n
```

---

## Method 3: Install from local `.tgz` (for testing before publishing)

```bash
cd ~/.n8n
npm install /absolute/path/to/n8n-nodes-skool-1.1.0.tgz
```

Then restart n8n.

---

## Getting Started

### 1. Get Your JWT Token

1. Install the [SkAPI.pro Chrome Extension](https://skapi.pro)
2. Open the extension popup
3. Copy your JWT token

### 2. Create Credentials in n8n

1. Create a new workflow in n8n
2. Add a **SkAPI.pro** node
3. Click **Create New Credential** → **SkAPI.pro API**
4. Paste your JWT token
5. Optionally add a Client ID
6. Click **Save**

### 3. Use the Node

- **Check Join Requests**: Get pending join requests
- **Process Join Request**: Approve or decline a request
- **Send Welcome Message**: Send a welcome message to a new member
- **Check Messages**: Get new messages in a group
- **Check Notifications**: Get Skool notifications

---

## Troubleshooting

### "Node not showing up" after install

1. Restart n8n (the node won't register until restart).
2. Verify the package installed without errors: `ls ~/.n8n/node_modules/n8n-nodes-skool/dist/nodes/SkapiPro.node.js`
3. Check n8n logs — the most common cause is a missing or malformed `skapi.svg` icon or a build error in the node file.

### Authentication errors

1. Verify your JWT token is valid (not expired).
2. Check that your SkAPI.pro subscription is active.
3. Ensure you're not exceeding rate limits.

### Rate limit errors

- Free: 100 requests/month
- Pro: 1000 requests/month
- Enterprise: Unlimited

Upgrade at [SkAPI.pro](https://skapi.pro).

## Support

- Documentation: [SkAPI.pro Docs](https://skapi.pro/docs)
- Email: support@skapi.pro
