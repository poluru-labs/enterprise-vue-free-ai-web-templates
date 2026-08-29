# AI Admin Dashboard

Vue 3 admin dashboard for managing organizations, team members, feature flags, and workspace settings. Built with Vite, Bootstrap, Vue Router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

## Features

✨ **Multi-page dashboard** with Vue Router navigation
- 📊 **Overview** - Key metrics and quick actions
- 🏢 **Tenants** - Manage organizations with full CRUD operations
- 👥 **Members** - Team member management with role-based access
- 🚀 **Flags** - Feature flag management with rollout tracking
- ⚙️ **Settings** - Workspace configuration and security settings

🎯 **Key Capabilities**
- Full CRUD operations (Create, Read, Update, Delete)
- Search and filtering across all data tables
- Modal dialogs for record creation and editing
- Role-based member management (Admin, Editor, Viewer)
- Feature flag status tracking (Development, Beta, Rollout, Stable)
- Gradual rollout percentage control
- Real-time state management with sample data
- Responsive sidebar navigation with user profile
- Status badges and visual indicators
- Data persistence within session
- Toast notifications for user feedback

## Setup

Requires Node.js 20+.

### Installation

```bash
cd ai-admin-dashboard
npm install
npm run dev
```

Default dev server: **http://localhost:5190**

### Build for Production

```bash
npm run build
npm run preview
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite development server (port 5190) |
| `npm run build` | Create production build (ES2022 target) |
| `npm run preview` | Preview production build locally (port 4190) |

## Project Structure

```
src/
├── App.vue              # Main layout with sidebar navigation
├── main.js              # App initialization with router
├── router.js            # Vue Router configuration
├── store.js             # Reactive state management
├── style.css            # Global styles
└── pages/
    ├── Overview.vue     # Dashboard with metrics
    ├── Tenants.vue      # Organization management
    ├── Members.vue      # Team member management
    ├── Flags.vue        # Feature flag management
    └── Settings.vue     # Workspace settings
```

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Fast build tool and dev server
- **Vue Router 4** - Client-side routing
- **Bootstrap 5** - Responsive CSS framework
- **Bootstrap Icons** - Icon library
- **@poluru-labs/enterprise-design-system-vue** - Enterprise UI components

## Usage

### Navigation

Use the sidebar to navigate between sections:
- **Overview** - Dashboard with key metrics
- **Tenants** - Manage organizations
- **Members** - Manage team members
- **Flags** - Manage feature flags
- **Settings** - Configure workspace

### Managing Data

All sections support:
- **View** - Display data in tables
- **Create** - Add new records via modal dialog (+ button)
- **Update** - Edit records by clicking the pencil icon
- **Delete** - Remove records by clicking the trash icon
- **Search** - Filter records by name/email/description
- **Advanced Filters** - Filter by role, status, or flag status

### Organizations (Tenants)

Manage your organizations with:
- Organization name
- Pricing plans (Starter, Professional, Enterprise)
- Team member count
- Active/Inactive status

### Team Members

Manage team members with:
- Full name and email
- Role assignment (Admin, Editor, Viewer)
- Organization assignment
- Member status (Active/Inactive)
- Join date tracking

### Feature Flags

Control feature rollouts with:
- Flag name and description
- Status tracking (Development, Beta, Rollout, Stable)
- Gradual rollout percentage (0-100%)
- Visual progress bars
- Creation date

### Settings

Configure workspace with:
- API endpoint configuration
- Webhook URL setup
- Rate limiting
- Email notifications toggle
- Two-factor authentication settings

## Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add route to `src/router.js`
3. Add navigation link to `navLinks` in `App.vue`

### Adding Data Fields

Edit `src/store.js` to:
- Add fields to sample data
- Create new getter/computed properties
- Add new action methods

### Styling

- Global styles in `src/style.css`
- Component scoped styles using `<style scoped>`
- CSS variables: `--ink`, `--muted`, `--paper`, `--rule`

## Development Tips

- Use `npm run dev` for hot module replacement
- Check browser console for component errors
- Sample data resets on page reload (session storage only)
- Modify `store.js` data objects to test different scenarios

## Browser Support

Modern browsers with ES2022 support:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## License

MIT

## Next Steps

Consider enhancing this dashboard with:
- Backend API integration
- Database persistence
- Authentication/authorization
- Export functionality
- Advanced analytics and charts
- Audit logging
- Webhook testing UI
