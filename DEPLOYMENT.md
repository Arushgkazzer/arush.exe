# Deployment Guide for Render

## Quick Setup for Render

### Option 1: Manual Configuration (Recommended)
1. Go to Render Dashboard
2. Create New → Static Site
3. Connect your GitHub repo: `Arushgkazzer/arush.exe`
4. Use these settings:
   - **Build Command**: `npm install && npm run build:simple`
   - **Publish Directory**: `dist`
   - **Node Version**: `18`

### Option 2: Auto-detection
The project includes `render.yaml` for automatic configuration.

## Troubleshooting

### If build fails:
1. Check Node.js version is 18+
2. Try build command: `npm install && npm run build:simple`
3. Ensure publish directory is set to `dist`

### Common Issues:
- **Missing script errors**: Use `build:simple` instead of `build`
- **Node version**: Ensure Node 18+ is used
- **Dependencies**: Make sure all packages install correctly

### Alternative Commands:
- Simple build: `npm run build:simple`
- Debug build: `npm run build` (includes logging)
- Local preview: `npm run preview`

## Files for Deployment:
- `render.yaml` - Render configuration
- `netlify.toml` - Alternative/fallback configuration  
- `build.sh` - Manual build script
- `public/_redirects` - SPA routing
- `.renderignore` - Deployment optimization
