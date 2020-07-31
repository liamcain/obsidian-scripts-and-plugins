#!/usr/bin/python
import argparse
from datetime import date
import os

from utils import get_template


def create_daily_note_template(*, daily_notes_dir):
    today = date.today().strftime("%Y-%m-%d")
    template = get_template("daily_note_template.j2")

    if os.path.exists(f"{daily_notes_dir}/{today}.md"):
        print(f"{daily_notes_dir}/{today}.md already exists, skipping...")
        return

    print(f"creating {daily_notes_dir}/{today}.md")
    with open(f"{daily_notes_dir}/{today}.md", "w") as daily_note:
        daily_note.write(
            template.render(today_header=date.today().strftime("%a %B %d, %Y"))
        )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a daily note with some dynamic content."
    )

    parser.add_argument(
        "--obsidian-vault-dir",
        dest="daily_notes_dir",
        help="Location of your Obsidian.md vault",
    )

    args = parser.parse_args()
    create_daily_note_template(daily_notes_dir=args.daily_notes_dir)
