# Dragonglass

Dragonglass is a collection of scripts and themes used to power my [Obsidian](http://obsidian.md) workflow. Note, everything here is very Work-In-Progress and likely only works on my own computer!

## Contents

### [Volcano](https://github.com/kognise/volcano) Plugins

#### **[WIP]** Daily Notes (with dynamic templates)

Based on the existing "Daily Note" plugin in Obsidian, but it renders the template with [Handlebars](https://handlebarsjs.com/). This allows for dynamic content within the template, such as timestamps.

### Scripts

#### `daily-note-template.py`

A script used in conjunction with Keyboard Maestro to create a new daily note if one doesn't exist. It supports dynamic content.

#### `markdown-calendar.py`

Insired by this [Obsidian forum post](https://forum.obsidian.md/t/calendar-and-tasks-for-daily-notes/3218), the markdown-calendar creates a calendar view autofilled with the daily notes that you have in your vault. I have it configured to regenerate whenever Obsidian regains focus.

#### `format-date-files.py`

A crude script for migrating all my Bear notes in the format of `Month Day, Year.md` into `YYYY-mm-dd.md`.

### Theme(s)

#### Ulfric

A modified version of the [Nord Theme](https://www.nordtheme.com/) with added visual niceties (and hacks).
