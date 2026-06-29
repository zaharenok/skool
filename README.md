# SkAPI.pro n8n Node

<div align="center">

**Automate your Skool community with n8n!** 🚀

[![npm version](https://badge.fury.io/js/%40zaharenok%2Fskool.svg)](https://badge.fury.io/js/%40zaharenok%2Fskool)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n](https://img.shields.io/badge/n8n-compatible-green.svg)](https://n8n.io)

Join our community: **[skool.com/ai-pays-my-bills-7018/about](https://www.skool.com/ai-pays-my-bills-7018/about)**

Learn more: **[skapi.pro](https://skapi.pro?utm_source=n8n&utm_medium=community_node&utm_campaign=skapi_integration)**

</div>

---

## ✨ Features

- ✅ **Check Join Requests** - Monitor pending join requests in real-time
- ✅ **Process Join Requests** - Auto-approve or decline requests
- ✅ **Check Messages** - Get new messages from your Skool groups
- ✅ **Check Notifications** - Monitor Skool notifications
- 🚧 **Send Welcome Messages** - Greet new members automatically (coming soon)
- 🔐 **Secure Authentication** - JWT-based API authentication
- 📊 **Rate Limiting** - Built-in quota management

Perfect for community managers who want to automate their Skool workflows!

---

## 🚧 Roadmap & Feedback

**Some features are still in development:**
- ⏳ Send Welcome Messages - auto-greet new members (API coming soon)
- ⏳ Real-time WebSocket triggers for instant notifications
- ⏳ Post operations and comment management
- ⏳ Group analytics and member management

**Need a feature or found a bug?**
- 🐛 Report bugs: [GitHub Issues](https://github.com/zaharenok/@zaharenok/skool/issues)
- 💡 Request features: [Join our community](https://www.skool.com/ai-pays-my-bills-7018/about) and post in #feature-requests
- 📧 Email support: support@skapi.pro
- 💬 Community chat: Get help from other users

We're actively developing new features! Your feedback helps prioritize what to build next.

---

---

## 📦 Installation

### Option 1: n8n Community Nodes (Recommended)

1. In n8n, go to **Settings** → **Community nodes**
2. Click **Add** and enter: `@zaharenok/skool`
3. Click **Install** and restart n8n

### Option 2: npm Installation

For self-hosted n8n:

```bash
cd ~/.n8n
npm install @zaharenok/skool
n8n restart
```

---

## 🔑 Getting Started

### 1. Get Your API Key

1. Visit [skapi.pro](https://skapi.pro?utm_source=n8n&utm_medium=community_node&utm_campaign=skapi_integration) and sign up
2. Install the [SkAPI.pro Chrome Extension](https://skapi.pro?utm_source=n8n&utm_medium=community_node&utm_campaign=skapi_integration)
3. Copy your JWT token from the extension

### 2. Configure Credentials in n8n

1. Add a **SkAPI.pro** node to your workflow
2. Click **Create New Credential** → **SkAPI.pro API**
3. Paste your JWT token
4. Save credentials

---

## 🎯 Use Cases

### Auto-Approve Join Requests

Never miss a join request again! Automatically approve new members and send them a welcome message.

```
Cron (5 min) → Check Join Requests → Loop → Approve → Welcome Message → Add to CRM
```

### Monitor Important Messages

Get notified when important messages are posted in your community.

```
Cron (10 min) → Check Messages → Filter (Important) → Slack Notification
```

### Track Notifications

Monitor all Skool notifications and act on important ones.

```
Cron (hourly) → Check Notifications → Filter (Mentions) → Email Alert
```

---

## 📖 Examples

### Check Join Requests

```javascript
// Node configuration
Resource: Join Request
Operation: Check Join Requests
Group: ai-pays-my-bills-7018
Limit: 20
```

### Process Join Request

```javascript
// Node configuration
Resource: Join Request
Operation: Process Join Request
Group: ai-pays-my-bills-7018
Action: Approve
Search By: Name
Search Value: John Doe
```

---

## 🔗 API Endpoints

The node connects to these SkAPI.pro endpoints:

- `POST /check-join-requests` - Get pending join requests
- `POST /process-join-request` - Approve/decline requests
- `POST /check-messages` - Get new messages
- `POST /check-notifications` - Get Skool notifications

---

## 📊 Rate Limits

| Plan | Requests/Month | Price |
|------|----------------|-------|
| Free | 100 | $0 |
| Pro | 1,000 | $9/mo |
| Enterprise | Unlimited | $49/mo |

Get your API key at [skapi.pro](https://skapi.pro?utm_source=n8n&utm_medium=community_node&utm_campaign=skapi_integration)

---

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/oleg-zaharenok/@zaharenok/skool.git
cd @zaharenok/skool

# Install dependencies
npm install

# Build the project
npm run build

# Watch mode (for development)
npm run dev
```

---

## 📚 Documentation

- [Installation Guide](INSTALLATION.md)
- [Workflow Examples](EXAMPLES.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

---

## 🤝 Community & Support

- **Join our community**: [skool.com/ai-pays-my-bills-7018/about](https://www.skool.com/ai-pays-my-bills-7018/about)
- **Documentation**: [skapi.pro/docs](https://skapi.pro/docs?utm_source=n8n&utm_medium=community_node&utm_campaign=skapi_integration)
- **GitHub Issues**: [Report a bug](https://github.com/oleg-zaharenok/@zaharenok/skool/issues)
- **Email**: support@skapi.pro

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🌟 Show Your Support

If you find this project useful, please consider:

- ⭐ Starring it on GitHub
- 📢 Sharing it with your community
- 💬 [Joining our Skool community](https://www.skool.com/ai-pays-my-bills-7018/about)
- 💖 [Sponsoring on GitHub](https://github.com/sponsors/oleg-zaharenok)

---

<div align="center">

**Made with ❤️ by [SkAPI.pro](https://skapi.pro?utm_source=n8n&utm_medium=community_node&utm_campaign=skapi_integration)**

[Website](https://skapi.pro?utm_source=n8n&utm_medium=community_node&utm_campaign=skapi_integration) • [Community](https://www.skool.com/ai-pays-my-bills-7018/about) • [Documentation](https://skapi.pro/docs?utm_source=n8n&utm_medium=community_node&utm_campaign=skapi_integration)

</div>
