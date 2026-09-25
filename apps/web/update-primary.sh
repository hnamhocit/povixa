#!/bin/bash
# Change primary to red magic red and add cyan accents
sed -i 's/--primary: oklch(0.54 0.24 25);/--primary: oklch(0.6 0.25 25);/' src/app/globals.css
sed -i 's/--primary: oklch(0.7 0.2 25);/--primary: oklch(0.6 0.25 25);/' src/app/globals.css
sed -i 's/--glow-2: oklch(0.72 0.14 200);/--glow-2: oklch(0.85 0.15 220);/' src/app/globals.css
sed -i 's/--glow-2: oklch(0.8 0.13 200);/--glow-2: oklch(0.85 0.15 220);/' src/app/globals.css
sed -i 's/--glow-1: oklch(0.62 0.22 25);/--glow-1: oklch(0.6 0.25 25);/' src/app/globals.css
sed -i 's/--glow-1: oklch(0.7 0.21 25);/--glow-1: oklch(0.6 0.25 25);/' src/app/globals.css
