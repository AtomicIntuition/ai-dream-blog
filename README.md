# Dream Insights Blog

AI-powered dream analysis blog with automated content generation.

## Features

- **AI-Generated Dream Stories**: Fictional dreams with full psychological analysis
- **Educational Content**: Dream science, sleep tips, and symbolism guides
- **Automated Publishing**: Scheduled content generation via Supabase Edge Functions
- **Beautiful UI**: Aurora-themed design with glass morphism effects

## Setup

### Prerequisites

- Node.js 18+
- Supabase account
- Backend API running (see main project)

### Installation

```bash
cd blog
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

The blog will be available at `http://localhost:3000`.

## Database Setup

Run the SQL schema in your Supabase project:

```bash
# In project root
cat backend/supabase-blog-schema.sql
# Copy and paste into Supabase SQL Editor
```

## Project Structure

```
blog/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── post/[slug]/        # Post detail page
│   │   ├── category/[category] # Category pages
│   │   └── search/             # Search page
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── posts/              # PostCard, PostContent
│   │   └── ui/                 # UI components
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   └── utils.ts            # Utilities
│   └── styles/
│       └── globals.css         # Global styles
├── package.json
├── tailwind.config.ts
└── next.config.js
```

## API Endpoints

The blog uses the following backend endpoints:

| Endpoint | Description |
|----------|-------------|
| `GET /api/blog/posts` | List published posts |
| `GET /api/blog/posts/:slug` | Get single post |
| `GET /api/blog/posts/category/:cat` | Posts by category |
| `GET /api/blog/categories` | List categories |
| `POST /api/blog/admin/generate/dream` | Generate dream post |
| `POST /api/blog/admin/generate/educational` | Generate educational post |

## Content Generation

### Manual Generation

```bash
# Generate a dream story
curl -X POST http://localhost:3001/api/blog/admin/generate/dream \
  -H "X-Admin-Key: your-admin-key"

# Generate educational content
curl -X POST http://localhost:3001/api/blog/admin/generate/educational \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: your-admin-key" \
  -d '{"category": "dream-science"}'
```

### Automated Generation

See `supabase/setup-automation.sql` for pg_cron scheduling setup.

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel
```

### Environment Variables for Production

- `NEXT_PUBLIC_API_URL`: Your production API URL
- `NEXT_PUBLIC_SITE_URL`: Your blog's domain

## License

MIT
