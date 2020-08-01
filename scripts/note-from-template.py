#!/usr/bin/python
import argparse
from datetime import date
import os

from utils import get_template


def note_from_template(*, daily_notes_dir, template_name, note_filename, **kwargs):
    template = get_template(f"{template_name}.j2")
    if os.path.exists(f"{daily_notes_dir}/{note_filename}.md"):
        print(f"{daily_notes_dir}/{note_filename}.md already exists, skipping...")
        return

    print(f"creating {daily_notes_dir}/{note_filename}.md")
    with open(f"{daily_notes_dir}/{note_filename}.md", "w") as daily_note:
        daily_note.write(template.render(**kwargs))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a daily note with some dynamic content."
    )

    parser.add_argument(
        "--obsidian-vault-dir",
        dest="daily_notes_dir",
        help="Location of your Obsidian.md vault",
    )

    parser.add_argument(
        "--template_name",
        dest="template_name",
        help="Name of the template found in the templates/ dir",
    )

    parser.add_argument(
        "--note_filename", dest="note_filename", help="Name of the created file",
    )

    args = parser.parse_args()
    note_from_template(
        daily_notes_dir=args.daily_notes_dir,
        template_name=args.template_name,
        note_filename=args.note_filename,
    )
