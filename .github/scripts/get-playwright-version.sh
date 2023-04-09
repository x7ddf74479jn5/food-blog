#!/bin/bash

cat pnpm-lock.yaml | grep "@playwright/test@" | head -n 1 | tr -d ' :' | tr -d '@playwright/test@'
