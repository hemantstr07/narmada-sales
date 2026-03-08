#!/bin/bash

# Membership Feature Verification Script
# Run this to check if everything is properly configured

echo "🔍 Narmada Sales - Membership Feature Verification"
echo "=================================================="
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Install it first:"
    echo "   npm install -g wrangler"
    exit 1
fi
echo "✅ Wrangler CLI found"

# Check if wrangler.toml exists
if [ ! -f "wrangler.toml" ]; then
    echo "❌ wrangler.toml not found"
    echo "   Create it with D1 database binding"
    exit 1
fi
echo "✅ wrangler.toml exists"

# List D1 databases
echo ""
echo "📊 Your D1 Databases:"
wrangler d1 list

echo ""
echo "🔑 Next Steps:"
echo "1. Copy the database UUID from above"
echo "2. Update wrangler.toml with: database_id = \"YOUR_UUID\""
echo "3. Run migration: wrangler d1 execute narmadasales-db --file=schema-update-membership.sql"
echo "4. Verify: wrangler d1 execute narmadasales-db --command=\"SELECT * FROM membership_plans\""
echo "5. Deploy: git push origin main"
echo ""
echo "📖 Full guide: See ERROR_FIX_GUIDE.md"
