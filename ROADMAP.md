# Roadmap - Inspired by skool-cli

## Features to Implement

### Phase 1: Telegram Monitoring (High Priority) 🔔

Based on `skool-cli watch-members` and `skool watch-pending`

**New Operations:**
1. `WatchJoinRequests` - monitor pending join requests with Telegram alerts
2. `WatchNewMembers` - monitor new members with optional welcome DM
3. `ConfigureTelegram` - setup Telegram bot token and chat ID

**Benefits:**
- Real-time notifications without n8n polling
- Lower API usage (event-based vs polling)
- Better user experience (instant alerts)

**Implementation:**
- Add Telegram bot configuration to credentials
- Create background monitoring service
- Support optional welcome messages with #NAME# placeholder

### Phase 2: Content Management (Medium Priority) 📚

Based on skool-cli courses, lessons, events, posts

**New Operations:**
1. `CreateCourse` - create course with cover image and privacy
2. `EditCourse` - edit course title, description, cover
3. `ListCourses` - list all courses in group
4. `CreateLesson` - create lesson with markdown, video, resources
5. `EditLesson` - edit lesson content, video, resources
6. `CreateEvent` - create calendar event with recurrence
7. `EditEvent` - edit event with recurrence support
8. `CreatePost` - create community post
9. `EditPost` - edit post content
10. `DeletePost` - delete post

**Benefits:**
- Full content lifecycle management
- Course and lesson automation
- Event scheduling
- Community engagement automation

### Phase 3: Analytics & Insights (Medium Priority) 📊

Based on skool-cli analytics and leaderboard

**New Operations:**
1. `GetAnalytics` - get group analytics (members, visitors, signups, MRR)
2. `GetLeaderboard` - get member leaderboard with filtering
3. `GetMembers` - search and list members
4. `GetCategories` - list post categories

**Benefits:**
- Data-driven decisions
- Community growth tracking
- Member engagement insights

### Phase 4: MCP Server (Low Priority) 🤖

Based on skool-cli MCP server integration

**New Package:**
- Create `@zaharenok/skool-mcp` as separate package
- Expose all n8n operations as MCP tools
- Support Claude, ChatGPT, and other AI agents

**Benefits:**
- AI agent integration
- Broader community reach
- Developer-friendly API

### Phase 5: Programmatic API (Low Priority) 💻

Based on skool-cli programmatic API

**New Feature:**
- Export core client as TypeScript library
- Support direct usage without n8n
- Compatible with existing n8n node

**Benefits:**
- Flexible usage patterns
- Beyond n8n workflows
- Developer adoption

## Internal API Investigation

**Key Question:** How does skool-cli access Skool's internal API?

**Investigation Areas:**
1. Network inspection of skool-cli operations
2. API endpoint discovery
3. Authentication mechanism (beyond JWT)
4. Rate limiting behavior
5. Data structures and responses

**Action Items:**
- [ ] Test skool-cli with network monitoring
- [ ] Document discovered API endpoints
- [ ] Reverse-engineer auth flow
- [ ] Compare with current JWT-based approach
- [ ] Evaluate migration strategy

## Competitive Advantages

**Our strengths vs skool-cli:**
1. ✅ **JWT-based auth** (no email/password required)
2. ✅ **PostgreSQL-backed quota tracking** (usage-based pricing)
3. ✅ **Rate limiting** (production-ready infrastructure)
4. ✅ **n8n integration** (workflow automation)
5. ✅ **Multiple operations** (extensible architecture)

**Skool-cli strengths:**
1. ❌ **More operations** (37 vs 5)
2. ❌ **Telegram monitoring** (event-based alerts)
3. ❌ **MCP server** (AI agent integration)
4. ❌ **Programmatic API** (TypeScript library)
5. ❌ **Internal API access** (direct Skool integration)

## Implementation Priority

1. **Telegram Monitoring** (high value, low effort)
2. **Content Management** (high value, medium effort)
3. **Analytics** (medium value, low effort)
4. **Internal API Investigation** (high value, high effort)
5. **MCP Server** (medium value, medium effort)
6. **Programmatic API** (low value, medium effort)

## Next Steps

1. ✅ Research skool-cli implementation
2. ✅ Document feature gaps
3. ⏳ Set up Telegram monitoring prototype
4. ⏳ Reverse-engineer internal API access
5. ⏳ Implement content management operations
6. ⏳ Create MCP server package
7. ⏳ Launch analytics features

---

**Inspired by:** https://www.npmjs.com/package/skool-cli  
**Repository:** https://github.com/unikprompt/skool-cli  
**License:** MIT (same as our package)
