#!/bin/bash

# Portfolio Deployment Script for GitHub Pages
# This script builds the project and prepares it for deployment

echo "🚀 Starting portfolio deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Error: Build failed. 'out' directory not found."
    exit 1
fi

# Create .nojekyll file for GitHub Pages
echo "📝 Creating .nojekyll file..."
touch out/.nojekyll

# Show build results
echo "✅ Build completed successfully!"
echo "📁 Output directory: out/"
echo "📊 Build size: $(du -sh out | cut -f1)"

# Optional: Open the output directory
if command -v open >/dev/null 2>&1; then
    echo "🔍 Opening output directory..."
    open out
elif command -v xdg-open >/dev/null 2>&1; then
    echo "🔍 Opening output directory..."
    xdg-open out
fi

echo ""
echo "🎉 Ready for deployment!"
echo "📋 Next steps:"
echo "   1. Commit and push your changes to GitHub"
echo "   2. The GitHub Action will automatically deploy to GitHub Pages"
echo "   3. Or manually upload the 'out/' directory contents to your hosting provider"
echo ""
echo "🔗 GitHub Pages will be available at: https://yourusername.github.io/portfolio"
