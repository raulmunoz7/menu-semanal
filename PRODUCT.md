# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step, hosted free on GitHub Pages. Menu and recipe content lives in one data file (`data.js`) that Claude updates and pushes when the user sends new material. Shared shopping-list state syncs between the two phones through a free hosted realtime key-value store (Firebase Realtime Database over its REST/streaming API, no SDK); without that configured the app falls back to per-device storage.

## Users

A couple cooking at home on a weekly plan set by their nutritionist. Both use it from their phones: in the supermarket aisle (one hand, glancing, ticking items), and in the kitchen (phone propped on the counter, following a recipe step by step).

## Product Purpose

Turn the nutritionist's weekly menu and recipes (sent as PDF/photos) into something usable on a phone: what to buy this week, what to eat today, and how to cook it. Success is that neither of them needs to open the PDF again during the week.

## Positioning

A private household tool, not a product for others. Its only edge is that it holds exactly their plan, kept current by Claude each week.

## Operating Context

- Each week the nutritionist sends a menu and some recipes as PDF or photos. The user forwards them to Claude; Claude transcribes them into `data.js`, derives the shopping list by summing the week's ingredients, and publishes.
- Shopping: usually one person shops, sometimes both split up; the other may need to see what is already in the trolley. Items get ticked off; extras not on the plan get added by hand.
- Cooking: the recipe is read on a phone at arm's length, often with dirty hands.

## Capabilities and Constraints

- Views: Today (meals due today), Week (full menu), Shopping list (tickable, shared, add extras, reset for a new week), Recipes (list + detail with ingredients and steps).
- No accounts, no backend of their own, no cost. Spanish only.
- The shopping list is derived by Claude from recipe ingredients; quantities are summed where units match.
- The current plan has five meals a day (desayuno, media mañana, almuerzo, media tarde, cena); the data model allows any number.

## Evidence on Hand

The content is the nutritionist's real "Alimentación 1" plan (7-day menu, 10 recipes, general guidelines), with every quantity doubled for two people. The shopping list is derived from it by Claude. No source PDF or personal names are stored in the public site.

## Product Principles

1. Glanceable first: the answer to "what do we eat today / what's left to buy" is visible without tapping.
2. One-hand, in-motion use: big targets, nothing that needs precision.
3. The plan is the authority: the app shows the nutritionist's plan faithfully, never invents nutrition advice.
4. Zero maintenance for them: updating content is Claude's job, not theirs.

## Accessibility & Inclusion

Readable at arm's length in a kitchen; high contrast in a bright supermarket.
