#!/bin/bash
# Replaces ink variables in :root with lighter colors
sed -i 's/--ink: #100608;/--ink: var(--background);/' src/app/globals.css
sed -i 's/--ink-2: #180a0d;/--ink-2: oklch(0.95 0.01 25);/' src/app/globals.css
sed -i 's/--ink-3: #211014;/--ink-3: oklch(0.92 0.015 25);/' src/app/globals.css
sed -i 's/--ink-line: #2e161b;/--ink-line: var(--border);/' src/app/globals.css
sed -i 's/--ink-hi: #3b1d24;/--ink-hi: oklch(0.85 0.02 25);/' src/app/globals.css
