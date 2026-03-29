# Career Re-Entry Hub

An AI-powered web platform designed to help professionals return to the workforce after a career break by analyzing their resume, identifying skill gaps, and providing personalized learning and job recommendations.

## 🚀 Features

### 🔐 Authentication
- Email & Password login
- Google OAuth integration
- Secure user session management

### 📝 Multi-Step Onboarding
- Personal information collection
- Career history and break details
- Skills and certifications management
- Resume upload and parsing
- Career goals and preferences

### 🤖 AI-Powered Analysis
- Resume text extraction and analysis
- Skill gap identification
- Career readiness scoring (0-100)
- Personalized recommendations
- Job matching algorithm

### 📊 Comprehensive Dashboard
- Career readiness score visualization
- Daily streak and XP tracking
- Skill gap analysis with progress
- Recommended skills and certifications
- Tailored job opportunities
- Learning progress charts

### 🎯 Progress Tracking
- Gamification with XP and levels
- Achievement badges and rewards
- Daily learning streaks
- Detailed analytics and insights

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ShadCN UI** - Component library
- **Lucide React** - Icons

### Backend
- **Next.js API Routes** - Server-side logic
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database

### AI & External Services
- **OpenAI API** - Resume analysis and recommendations
- **Google OAuth** - Authentication
- **PDF Parse** - Resume text extraction

## 📁 Project Structure

```
career-reentry-hub/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── users/         # User management
│   │   │   ├── jobs/          # Job recommendations
│   │   │   └── ai-analysis/   # AI analysis endpoints
│   │   ├── auth/              # Authentication pages
│   │   ├── onboarding/        # Onboarding flow
│   │   ├── dashboard/         # Main dashboard
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   └── ui/               # Reusable UI components
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   └── types/                 # TypeScript type definitions
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── .env.example              # Environment variables template
└── README.md                # Project documentation
```

## 🗄️ Database Schema

The platform uses PostgreSQL with the following main entities:

- **Users** - User profiles and progress tracking
- **Skills** - Available skills and user skill levels
- **Certifications** - Professional certifications
- **Jobs** - Job opportunities and requirements
- **UserProgress** - Daily progress tracking
- **ResumeData** - Resume file storage and parsed data
- **Achievements** - Gamification badges and rewards

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd career-reentry-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 User Flow

1. **Registration/Login** - Create account or sign in
2. **Onboarding** - Complete 4-step profile setup
3. **Resume Upload** - Upload resume for AI analysis
4. **Dashboard** - View personalized recommendations
5. **Skill Development** - Follow learning paths
6. **Job Applications** - Apply to matched opportunities
7. **Progress Tracking** - Monitor career readiness

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/career_reentry_hub"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# File Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE="10485760" # 10MB
```

## 🤖 AI Features

### Resume Analysis
- Text extraction from PDF/DOC files
- Skill identification and categorization
- Experience level assessment
- Career gap impact analysis

### Skill Gap Analysis
- Comparison with job market requirements
- Priority-based skill recommendations
- Difficulty and time estimates
- Learning path suggestions

### Job Matching
- Profile-to-job compatibility scoring
- Missing skill identification
- Salary and location preferences
- Application tracking

## 📊 Analytics & Tracking

### User Metrics
- Career readiness score progression
- Daily learning streaks
- XP and level advancement
- Skill completion rates
- Job application success

### Visualizations
- Progress charts and graphs
- Skill development timelines
- Achievement displays
- Performance analytics

## 🎨 UI/UX Features

### Design System
- Modern, clean interface
- Responsive design for all devices
- Accessible components
- Dark/light theme support

### User Experience
- Smooth onboarding flow
- Real-time progress updates
- Interactive dashboards
- Gamification elements

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Secure file upload handling
- API rate limiting
- Input validation and sanitization

## 📱 Mobile Responsiveness

The platform is fully responsive and optimized for:
- Desktop (1920x1080+)
- Tablet (768x1024)
- Mobile (375x667+)

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
- Production PostgreSQL database
- Environment variables configuration
- SSL certificate setup
- Domain configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the FAQ section

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Basic authentication
- ✅ Onboarding flow
- ✅ Dashboard with mock data
- ✅ API structure

### Phase 2 (Upcoming)
- 🔄 Real database integration
- 🔄 OpenAI API integration
- 🔄 Resume parsing
- 🔄 Progress tracking

### Phase 3 (Future)
- 📋 AI chatbot assistant
- 📋 Advanced analytics
- 📋 Mobile app
- 📋 Integration with job boards

---

**Built with ❤️ for career re-entrants worldwide**
"# career-re-entry-hub" 
