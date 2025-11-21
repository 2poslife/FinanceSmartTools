# Next.js App Router Migration Plan

## Current Status
- ✅ API routes are in `app/api/` with proper structure
- ✅ Pages are in `app/` directory 
- ✅ Utils moved to `lib/utils.js`
- ✅ Data files moved to `lib/data/`
- ⚠️ Components still in `src/components/` and imported via `../src/`
- ⚠️ Styles still in `src/styles/`
- ⚠️ Assets still in `src/assets/`
- ⚠️ React Router still present in `src/App.jsx` (not used by Next.js)

## Migration Steps Needed

### 1. Fix Import Paths
All imports using `../src/` need to be updated to proper Next.js paths.

### 2. Component Organization
Components in `src/components/` are being used by Next.js pages in `app/`. They need to either:
- Stay in `src/components/` with updated imports, OR
- Be moved to `app/components/` for better Next.js structure

### 3. Style Organization
Styles in `src/styles/` need to be accessible to Next.js. Options:
- Keep in `src/styles/` and import correctly
- Move to `app/styles/` or alongside components

### 4. Asset Organization
- Assets already in `public/` are good
- CloudFront URLs in `lib/utils.js` are good
- Local assets in `src/assets/` should move to `public/` if needed

### 5. Remove React Router
- `src/App.jsx` - Remove or rename (not used by Next.js)
- `src/main.jsx` - Remove or rename (not used by Next.js)
- All `react-router-dom` imports should be `next/navigation`

## Critical Fixes Applied

1. ✅ Created `lib/utils.js` from `src/utils/index.jsx`
2. ✅ Moved data files to `lib/data/` and fixed imports
3. ✅ All API routes have `runtime = 'nodejs'` and relative imports
4. ✅ Next.js config updated with proper settings

## Remaining Work

The project structure is partially migrated. The main issues are:
- Import paths need updating throughout
- Components/styles organization needs finalizing
- React Router remnants need cleanup

This is a WORKING Next.js app, just needs import path fixes!
