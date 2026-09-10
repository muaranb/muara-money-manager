/**
 * scripts/sync-brand-tokens.cjs
 * Synchronizes assets/design-tokens.json into assets/design-tokens.css
 */
const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve(__dirname, '../assets/design-tokens.json');
const cssPath = path.resolve(__dirname, '../assets/design-tokens.css');

if (!fs.existsSync(jsonPath)) {
  console.error(`[sync-tokens] Error: ${jsonPath} not found.`);
  process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let cssContent = `/**
 * Muara Money Manager - Design Tokens (Auto-generated from design-tokens.json)
 * Generated at: ${new Date().toISOString()}
 */\n\n:root {\n`;

// Primitives
cssContent += `  /* Layer 1: Primitives */\n`;
if (tokens.primitives?.color) {
  for (const [group, values] of Object.entries(tokens.primitives.color)) {
    if (typeof values === 'object') {
      for (const [shade, hex] of Object.entries(values)) {
        cssContent += `  --color-${group}-${shade}: ${hex};\n`;
      }
    } else {
      cssContent += `  --color-${group}: ${values};\n`;
    }
  }
}

if (tokens.primitives?.typography) {
  for (const [font, value] of Object.entries(tokens.primitives.typography)) {
    const varName = font.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    cssContent += `  --${varName}: ${value};\n`;
  }
}

// Semantics
cssContent += `\n  /* Layer 2: Semantic OKLCH Tokens */\n`;
if (tokens.semantic?.color) {
  for (const [token, value] of Object.entries(tokens.semantic.color)) {
    const varName = token.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    cssContent += `  --${varName}: ${value};\n`;
  }
}

// Slide Component Tokens
cssContent += `\n  /* Layer 3: Slide & Presentation Component Tokens */\n`;
cssContent += `  --slide-bg: #030712;\n`;
cssContent += `  --slide-card-bg: rgba(15, 23, 42, 0.8);\n`;
cssContent += `  --slide-text-heading: #F8FAFC;\n`;
cssContent += `  --slide-text-body: #94A3B8;\n`;
cssContent += `  --slide-accent: #10B981;\n`;

cssContent += `}\n`;

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log(`[sync-tokens] Successfully synchronized tokens to ${cssPath}`);
