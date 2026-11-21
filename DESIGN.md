---
name: Nuestro menú
description: The household's weekly nutrition plan, printed like a Valencian orange-crate label.
colors:
  ultramar: "#1d2f6f"
  ultramar-hondo: "#15224f"
  ultramar-claro: "#b9c4ea"
  naranja: "#f07a1a"
  naranja-tinta: "#b4520a"
  verde: "#2e7d3a"
  rojo: "#c8281e"
  papel: "#fbfaf6"
  blanco: "#ffffff"
  tinta: "#1a1c24"
  tinta-2: "#4a4e5c"
  apagado: "#6b6f7a"
  filete: "#dcd9d0"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.12em"
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.12em"
  button:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.08em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "tnum"
  body-small:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  plate: "0px"
  control: "4px"
  bar: "5px"
  pill: "10px"
spacing:
  hairline-row: "9px"
  gap: "12px"
  row: "14px"
  gutter: "16px"
  shell: "20px"
  module: "26px"
  plate: "30px"
components:
  button-primary:
    backgroundColor: "{colors.rojo}"
    textColor: "{colors.blanco}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: "52px"
    width: "100%"
  button-quiet:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.ultramar}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "48px"
  button-danger:
    backgroundColor: "{colors.rojo}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "48px"
  filter-toggle:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.ultramar}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "52px"
  filter-toggle-on:
    backgroundColor: "{colors.ultramar}"
    textColor: "{colors.papel}"
  input-field:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "48px"
  label-plate:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.ultramar}"
    typography: "{typography.headline}"
    rounded: "{rounded.plate}"
    padding: "26px 18px 18px"
  ribbon:
    backgroundColor: "{colors.naranja}"
    padding: "7px 22px 6px"
  module-tab:
    textColor: "{colors.ultramar}"
    typography: "{typography.title}"
    padding: "0 0 6px"
  check-row:
    textColor: "{colors.tinta}"
    typography: "{typography.body}"
    height: "56px"
  check-row-done:
    textColor: "{colors.apagado}"
  shell-header:
    backgroundColor: "{colors.ultramar}"
    textColor: "{colors.papel}"
    typography: "{typography.display}"
    padding: "20px 20px 18px"
  tab-bar:
    backgroundColor: "{colors.ultramar}"
    textColor: "{colors.ultramar-claro}"
    height: "64px"
  day-picker-on:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.ultramar}"
    rounded: "{rounded.control}"
    height: "54px"
---

# Design System: Nuestro menú

## Overview

**Creative North Star: "The Crate Label and the Ledger"**

Two registers share one phone screen. The meal that is due now is printed like a Valencian orange-crate litho label: a white plate in a double ultramarine frame, an orange ribbon carrying the meal name, the dish set in heavy condensed capitals, a crate-red button to the recipe. Everything else is a plain, dense working list: hairline-ruled rows under small ruled tab headers, one text size per list, quantities flush right. The label is the only ornament; the ledger is what you actually use in the aisle.

The frame around both is an ultramarine shell, a solid header at the top and a fixed tab bar at the bottom, with warm near-white paper between them. Density is high and honest: rows are tall enough for a thumb (48 to 56px) but there is no card chrome, no grouped-list grey, no shadows. Rank inside a list comes from weight, case and colour, never from size changes. Motion is limited to 140 to 260ms state changes (ticks, toggles, the progress bar); nothing enters or animates on its own.

The system refuses the grey iOS grouped-list default: no inset rounded cards on a grey ground, no chevron-cell chrome.

**Key Characteristics:**
- Ultramarine shell top and bottom; paper ground between.
- One label plate per screen, on Hoy and recipe detail only.
- Hairline-ruled lists under 3px ultramarine tab rules.
- Barlow Condensed 800 uppercase for every heading, ribbon, button and tab; Barlow for reading text.
- Leaf green means done; crate red means the primary action; orange means "now" and "active".
- Flat: depth comes from frames and rules, never shadows.

## Colors

A printed four-ink palette (ultramarine, orange, leaf green, crate red) on warm paper, used as flat solid inks.

### Primary
- **Crate Ultramarine** (ultramar): the shell. Header, tab bar, day picker strip, every structural rule (plate frame, tab-header underline, input and checkbox strokes), plate headings and module titles. It is the ink everything is printed in.
- **Deep Ultramarine** (ultramar-hondo): the backdrop tint behind the confirm dialog, at 55% opacity. Not used as a surface.
- **Faded Ultramarine** (ultramar-claro): secondary text on the ultramarine shell (header subtitle, progress caption, inactive tabs and day buttons). Measures 7.2:1 on ultramarine.

### Secondary
- **Valencia Orange** (naranja): the ribbon ground, the active tab and its 3px top marker, today's day-picker letter, highlighted words in the header subtitle, the shopping badge, the complete progress bar, the focus ring. It marks "now" and "you are here".
- **Burnt Orange Ink** (naranja-tinta): orange as text on paper, where Valencia Orange is too light: the current meal's label ("· ahora") and recipe step numerals (4.8:1 on paper).

### Tertiary
- **Leaf Green** (verde): done and progress only. Ticked checkboxes, the progress bar fill, a complete ingredient count, and the plate's "Cantidades para los dos" imprint.
- **Crate Red** (rojo): the one primary action. "Ver receta", the destructive confirm button, the arrow glyphs on navigable rows. Pressed state darkens to #a51f17 (see Do's and Don'ts on drift).

### Neutral
- **Warm Paper** (papel): page ground behind all lists.
- **Plate White** (blanco): the label plate interior, inputs, quiet buttons, dialog; also text on ultramarine and red grounds. Lettering on orange is Crate Ultramarine (about 4.5:1), never white.
- **Press Ink** (tinta): primary reading text.
- **Second Ink** (tinta-2): quantities, row details, meal-slot labels, notes, guidelines (7.9:1 on paper).
- **Spent Grey** (apagado): bought items, past meals, remove icons (4.8:1 on paper).
- **Hairline** (filete): the 1px rule under every list row.

### Named Rules
**The Four Inks Rule.** Each saturated ink has one job: ultramarine builds structure, orange marks now and active, green marks done, red marks the primary action. A colour never borrows another's job.

**The Orange-Is-Not-Text Rule.** Valencia Orange is a ground and a marker on paper. Orange words on paper use Burnt Orange Ink.

## Typography

**Display Font:** Barlow Condensed 700/800 (with Arial Narrow, sans-serif), self-hosted woff2
**Body Font:** Barlow 400/600 (with system-ui, sans-serif), self-hosted woff2

**Character:** A tall, narrow grotesque cut heavy and set in capitals, like crate-label lettering and market signage, over a plain, open companion for reading at arm's length. Tabular numerals are on globally so quantities align.

### Hierarchy
- **Display** (800, 2.5rem, 3rem from 700px, line-height 0.95, uppercase, balanced): the screen title in the ultramarine header (day name, "Semana", "Compra").
- **Headline** (800, 2rem, line-height 1, uppercase, centred, ultramarine): the dish or recipe name on the label plate only.
- **Title** (800, 1.0625rem, 0.12em tracking, uppercase, ultramarine): module tab headers ("Resto del día", "Fruta", "Elaboración"). Counts beside them use 700 at 0.9375rem.
- **Button** (800, 1.1875rem, 0.08em tracking, uppercase): the primary red button; quiet and danger buttons use the same face at 1rem.
- **Label** (700, 0.875rem, 0.12em tracking, uppercase): meal-slot names in the left column of meal rows. Tab-bar labels use 700 at 0.8125rem, 0.1em.
- **Body** (400, 17px, line-height 1.4, tabular numerals): everything you read. Item and dish names step up to 600 for rank; same size.
- **Body small** (400, 0.9375rem): row details, notes, header subtitle (at 600), helper copy.

### Named Rules
**The One-Size List Rule.** Inside a list every row uses one text size. Rank by weight (600 name, 400 detail), case and ink, never by a second size.

**The Condensed-Caps-Only Rule.** Barlow Condensed is always uppercase and always 700 or 800. It never sets running text.

## Layout

A single phone column, max 640px centred, on paper. Horizontal gutter is 16px for content and 20px inside the shell header. The ultramarine header bleeds edge to edge and respects the top safe area; the 64px tab bar is fixed to the bottom, respects the bottom safe area, and centres its four equal columns at the same 640px measure on wide screens. The Semana day picker is a seven-column grid on ultramarine that sticks to the top while the day scrolls.

Vertical rhythm: the label plate sits 30px below the header (room for the ribbon that overhangs its top edge by 17px); modules are spaced 26px apart; meal and recipe rows pad 14px top and bottom; food-item rows 9px; inline gaps are 12px. From 700px the plate caps at 560px and centres.

Meal rows are a three-column grid: a 104px slot-label column, the dish and its detail, and a trailing red arrow.

## Elevation & Depth

Flat. There are no box shadows anywhere. Depth is printed: the label plate stands forward through its white interior and double frame against paper; modules are separated by heavy 3px ultramarine tab rules and 1px hairlines; the shell reads as a solid ink band. The only layered surface is the confirm dialog, which sits on a 55% Deep Ultramarine backdrop with a 3px ultramarine border instead of a shadow.

### Named Rules
**The Printed-Depth Rule.** If something must stand forward, give it a frame or a ground, not a shadow.

## Shapes

Square and printed. The label plate has square corners and a double rule: a 3px ultramarine outer border, 5px of white, then a 1px ultramarine inner border. The ribbon is a flat banner with pointed ends (10px notched polygon), centred on and overlapping the plate's top edge. Controls (buttons, inputs, checkboxes, day buttons, dialog) carry a slight 4px corner, enough to read as touchable without softening the print. The progress bar and the badge are the only rounded forms (5px and fully rounded). Strokes on interactive outlines are 2px (inputs, quiet buttons, filters) or 2.5px (checkboxes).

### Named Rules
**The One Plate Rule.** The double-rule frame belongs to the label plate alone, and a screen shows at most one plate (Hoy's current meal, a recipe's header). Lists never get it.

## Components

### Buttons
Solid, condensed, capitalised, confident.
- **Shape:** slight corners (4px).
- **Primary ("Ver receta"):** crate red ground, white Barlow Condensed 800 capitals, full width, 52px tall, trailing arrow. Pressed: darker red and a 1px downward nudge, 160ms.
- **Quiet:** white ground, 2px ultramarine stroke and text, 48px tall.
- **Danger:** crate red ground, white text, 48px tall; used in the reset confirm.
- **Focus:** a 3px Valencia Orange outline, 2px offset, on every focusable element.

### Chips (filter toggle)
- **Style:** "Ocultar lo cogido": white ground, 2px ultramarine stroke, ultramarine condensed caps, 52px tall.
- **State:** pressed inverts to an ultramarine ground with paper text.

### Cards / Containers (the label plate)
The signature, and the only container. White interior, double ultramarine frame, square corners, 26px top and 18px side padding, centred headline. The orange ribbon carries the meal or recipe slot; below the headline sit the food items (a ruled list), an optional note, the green "Cantidades para los dos" imprint, and the red button when a recipe exists.

### Inputs / Fields
- **Style:** white ground, 2px ultramarine stroke, 4px corners, 48px tall. The add-extra field fuses a 48px ultramarine plus button to its right edge.
- **Focus:** the orange 3px outline wraps the whole field group.

### Navigation
- **Tab bar:** solid ultramarine, four equal columns, a 24px line icon over a Barlow Condensed 700 capital label. Inactive in Faded Ultramarine; active in Valencia Orange with a 3px orange bar across the top of its column. Colour transitions 160ms. An orange count badge sits on Compra.
- **Header:** solid ultramarine, display title, a 600-weight subtitle with one orange-highlighted phrase, and a 44px back button on recipe detail.
- **Day picker:** seven 54px buttons on ultramarine, each a condensed capital letter over a small Barlow weekday; selected inverts to paper with ultramarine ink; today, when not selected, is lettered in orange.

### Check row (shopping and ingredients)
A full-width button row, 56px tall (48px for ingredients), hairline below: a 28px ultramarine-stroked box, the item name in 600, the quantity flush right in Second Ink. Ticked: the box fills leaf green with a white check that scales in (140 to 220ms); name and quantity drop to 400, Spent Grey, struck through at 1.5px. Extras add a 44px remove button.

### Module tab
A ruled section header: condensed 800 capital title in ultramarine on the left, an optional count on the right (green when complete), a 3px ultramarine rule beneath. Every list sits under one.

### Meal row
The Hoy and Semana list unit: slot label in condensed caps on the left, dish in 600 with its items in small Second Ink below, a red arrow when it navigates. The current slot's label turns Burnt Orange with "· ahora"; past meals drop to Spent Grey.

## Do's and Don'ts

### Do:
- **Do** keep the ultramarine shell at both ends of every screen: header on top, 64px tab bar fixed below.
- **Do** put every list under a module tab with its 3px ultramarine rule, and separate rows with 1px Hairline only.
- **Do** keep one text size per list and rank with weight (600 vs 400), case and ink.
- **Do** right-align quantities in Second Ink with tabular numerals.
- **Do** show bought or done items as Spent Grey, 400 weight, struck through; leaf green fills the box.
- **Do** keep touch targets at 48px or taller (56px for shopping rows).
- **Do** limit motion to 140 to 260ms state changes on the shared ease (cubic-bezier(0.16, 1, 0.3, 1)), and drop it under reduced motion.

### Don't:
- **Don't** use the double-rule frame or the ribbon anywhere but the label plate, and never show two plates on one screen.
- **Don't** add shadows, inset rounded cards, or a grey grouped-list ground.
- **Don't** set orange text on paper; use Burnt Orange Ink.
- **Don't** use crate red for anything but the primary action, destructive confirm and navigation arrows, or green for anything but done and progress.
- **Don't** set running text in Barlow Condensed or in capitals.
- **Don't** letter in white on Valencia Orange (2.8:1); the ribbon and badge letter in Crate Ultramarine.
