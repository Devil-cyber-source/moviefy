# 📁 Project Structure Explained

## 🎯 Current Structure

```
moviefy/
├── src/                    # Frontend source code (React)
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── context/          # React context
│   ├── utils/            # Utility functions
│   └── data/             # Static data
│
├── public/               # Frontend static files
│   └── *.html           # Public HTML files
│
├── backend/             # Backend API (Node.js)
│   ├── routes/         # API routes
│   ├── models/         # Database models
│   ├── config/         # Configuration
│   ├── middleware/     # Express middleware
│   └── server.js       # Main server file
│
├── docs/               # All documentation
│   ├── RUN_THIS.md                # Quick deployment
│   ├── GOOGLE_OAUTH_QUICK_FIX.md  # OAuth fix
│   ├── WHICH_FILE_TO_USE.md       # Doc guide
│   └── ... (50+ other guides)
│
├── scripts/            # Deployment scripts
│   ├── deploy-all.ps1         # Automated deployment
│   ├── deploy-backend.sh      # Backend deployment
│   └── deploy-frontend.sh     # Frontend deployment
│
├── tests/              # Test files
│   ├── test-google-oauth.html
│   └── test-login.html
│
├── .env                # Frontend environment variables
├── .gitignore         # Git ignore rules
├── index.html         # Frontend entry point
├── package.json       # Frontend dependencies
├── vite.config.js     # Vite configuration
└── README.md          # Main documentation
```

## 🎯 Understanding the Structure

### Frontend (Root Level)
The root folder IS your frontend:
- `src/` - React source code
- `public/` - Static files
- `index.html` - Entry point
- `package.json` - Frontend dependencies
- `vite.config.js` - Build configuration

### Backend (backend/ folder)
Separate Node.js API:
- `backend/server.js` - Main server
- `backend/routes/` - API endpoints
- `backend/models/` - Database schemas
- `backend/package.json` - Backend dependencies

### Documentation (docs/ folder)
All .md guide files:
- 50+ documentation files
- Deployment guides
- Setup instructions
- Troubleshooting

### Scripts (scripts/ folder)
Automation scripts:
- PowerShell deployment scripts
- Shell scripts for deployment
- Utility scripts

### Tests (tests/ folder)
Testing tools:
- HTML test pages
- OAuth diagnostic tools

## 🚀 Why This Structure?

### Advantages:
✅ Clean root directory
✅ Easy to find documentation
✅ Separate frontend/backend
✅ Scripts organized
✅ Tests isolated

### How to Navigate:
- **Working on frontend?** → Edit files in `src/`
- **Working on backend?** → Edit files in `backend/`
- **Need help?** → Check `docs/`
- **Want to deploy?** → Run scripts in `scripts/`

## 📝 Key Files

### Root Level:
- `README.md` - Main project documentation
- `.env` - Frontend environment variables
- `package.json` - Frontend dependencies
- `vite.config.js` - Build configuration

### Backend:
- `backend/server.js` - Main server file
- `backend/.env` - Backend environment variables
- `backend/package.json` - Backend dependencies

### Documentation:
- `docs/RUN_THIS.md` - Quick deployment
- `docs/WHICH_FILE_TO_USE.md` - Doc navigation
- `docs/GOOGLE_OAUTH_QUICK_FIX.md` - OAuth fix

## 🎯 Common Tasks

### Start Development:
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

### Deploy:
```bash
# Run automated deployment
powershell -ExecutionPolicy Bypass -File scripts/deploy-all.ps1
```

### Read Documentation:
```bash
# Open docs folder
cd docs
# Read any .md file
```

### Run Tests:
```bash
# Open tests folder
cd tests
# Open any .html file in browser
```

## 🔄 Alternative Structure (Not Implemented)

Some projects use this structure:
```
moviefy/
├── frontend/          # All frontend files
│   ├── src/
│   ├── public/
│   └── package.json
│
└── backend/           # All backend files
    ├── routes/
    └── package.json
```

**We didn't use this because:**
- Current structure is simpler
- Frontend is the main app
- Backend is a supporting service
- Easier to deploy separately

## 📚 File Count

- **Frontend files:** ~50 files in `src/`
- **Backend files:** ~15 files in `backend/`
- **Documentation:** ~60 files in `docs/`
- **Scripts:** ~5 files in `scripts/`
- **Tests:** ~5 files in `tests/`

**Total:** ~135 files (excluding node_modules)

## 🎯 What's Where?

### Need to edit UI?
→ `src/components/` or `src/pages/`

### Need to edit API?
→ `backend/routes/`

### Need to change database?
→ `backend/models/`

### Need deployment help?
→ `docs/RUN_THIS.md`

### Need to fix OAuth?
→ `docs/GOOGLE_OAUTH_QUICK_FIX.md`

### Need to run deployment?
→ `scripts/deploy-all.ps1`

---

**Your project is now organized and clean!** 🎉
