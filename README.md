# AIRAVAT Security Service - Next.js Application

A production-ready Next.js 15 application for AIRAVAT Security Service, featuring a comprehensive admin panel, inquiry management, and SEO optimization.

## Features

### 🎯 Core Features
- **Admin Authentication System**: Secure admin login with bcrypt password hashing
- **Protected Admin Routes**: Middleware-based route protection
- **Project Management**: Create, edit, delete, and manage security service projects
- **Inquiry Management**: Track and manage customer inquiries with status updates
- **SEO Optimization**: Full metadata, structured data (JSON-LD), sitemap, and robots.txt
- **Toast Notifications**: Beautiful toast notifications for user feedback
- **Error Handling**: Custom 404 and 500 error pages
- **Responsive Design**: Mobile-first responsive design

### 🔐 Admin Features
- Secure login system
- Dashboard with analytics (total projects, inquiries, status breakdowns)
- Project management with auto-slug generation
- Inquiry management with filtering (by type and status)
- Status updates for inquiries (pending → reviewed → completed)
- Logout functionality

### 📊 Analytics & Insights
- Total projects count
- Total inquiries count
- Pending/reviewed/completed inquiry counts
- Career vs Service inquiry breakdown

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom session-based auth with bcrypt
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Validation**: Zod
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Airavat-Security-Service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/airavat_db"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   ```

5. **Create an admin user**
   ```bash
   npm run create-admin
   ```
   Follow the prompts to create your first admin account.

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── login/          # Admin login
│   │   ├── projects/       # Project management
│   │   └── inquiries/      # Inquiry management
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── projects/       # Project CRUD
│   │   └── inquiries/      # Inquiry CRUD
│   ├── projects/           # Public project pages
│   ├── inquiry/            # Inquiry confirmation pages
│   └── components/         # Shared components
├── lib/
│   ├── auth.ts             # Authentication utilities
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Helper functions
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                 # Static assets
└── middleware.ts           # Route protection middleware
```

## Admin Routes

- `/admin/login` - Admin login page
- `/admin` - Admin dashboard
- `/admin/projects` - Project management
- `/admin/projects/new` - Create new project
- `/admin/projects/edit/[id]` - Edit project
- `/admin/inquiries` - Inquiry management
- `/admin/inquiries/[id]` - View inquiry details

## API Routes

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Projects
- `GET /api/projects/list` - List all projects
- `GET /api/projects/[id]` - Get project by ID
- `GET /api/projects/slug/[slug]` - Get project by slug
- `POST /api/projects/create` - Create project (admin only)
- `PATCH /api/projects/update` - Update project (admin only)
- `DELETE /api/projects/[id]/delete` - Delete project (admin only)

### Inquiries
- `GET /api/inquiries/list` - List all inquiries (admin only)
- `GET /api/inquiries/[id]` - Get inquiry details
- `POST /api/inquiries/create` - Create inquiry
- `PATCH /api/inquiries/[id]` - Update inquiry status (admin only)

## Database Schema

### Admin
- `id` (String, Primary Key)
- `email` (String, Unique)
- `password` (String, Hashed)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Project
- `id` (String, Primary Key)
- `title` (String)
- `slug` (String, Unique)
- `date` (String)
- `achievement` (String)
- `blogContent` (String)
- `thumbnail` (String)
- `number` (Int)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Inquiry
- `id` (String, Primary Key)
- `type` (String) - "career" or "service"
- `name` (String)
- `email` (String)
- `phone` (String)
- `message` (String)
- `status` (String) - "pending", "reviewed", "completed"
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## SEO Features

- ✅ Dynamic metadata generation
- ✅ Open Graph tags
- ✅ Twitter Card support
- ✅ Structured data (JSON-LD)
- ✅ Automatic sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt configuration
- ✅ Canonical URLs
- ✅ Semantic HTML

## Security Features

- ✅ Password hashing with bcrypt
- ✅ Session-based authentication
- ✅ Protected admin routes via middleware
- ✅ API route authentication
- ✅ Secure cookie handling

## Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Database Migrations
```bash
# Create a new migration
npm run db:migrate

# Apply migrations
npm run db:push
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL for the application | No (defaults to localhost) |

## Notes

- Admin routes are protected by middleware
- All admin API routes require authentication
- Project slugs are auto-generated from titles
- Inquiry status can be updated by admins
- Forms use toast notifications for user feedback
- Images are optimized using Next.js Image component

## License

Private - AIRAVAT Security Service

## Support

For issues or questions, please contact the development team.

