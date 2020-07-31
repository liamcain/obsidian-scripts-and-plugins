#!/usr/bin/python
import argparse
import calendar
from datetime import date
import os
from tabulate import tabulate

from utils import get_template

MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
MONTH_HEADERS = ["S", "M", "T", "W", "H", "F", "S"]


def generate_calendar(*, daily_notes_dir, year):
    calendar.setfirstweekday(calendar.SUNDAY)

    final_output = ""
    for month in range(1, 12):
        month_matrix = calendar.monthcalendar(year, month)
        month_output = []
        for row in month_matrix:
            week_output = []
            for day in row:
                if day == 0:
                    week_output.append(" ")
                    continue

                formatted_date = f"{year}-{month:02}-{day:02}"
                cell_str = (
                    f"[[{formatted_date}\\|{day}]]"
                    if os.path.exists(f"{daily_notes_dir}/{formatted_date}.md")
                    else str(day)
                )

                # Make today **bold**
                if formatted_date == date.today().strftime("%Y-%m-%d"):
                    cell_str = f"=={cell_str}=="

                week_output.append(cell_str)
            month_output.append(week_output)

        final_output += f"\n## {MONTH_NAMES[month-1]}\n"

        final_output += tabulate(
            month_output,
            MONTH_HEADERS,
            tablefmt="pipe",
            stralign="center",
            numalign="center",
        )

    template = get_template("calendar_view.j2")
    with open(f"{daily_notes_dir}/{year} Calendar.md", "w") as calendar_note:
        calendar_note.write(template.render(calendar_str=final_output))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate calendar view with links to daily notes"
    )

    parser.add_argument(
        "--obsidian-vault-dir",
        dest="daily_notes_dir",
        help="Location of your Obsidian.md vault",
    )
    parser.add_argument(
        "--year", dest="year", help="Calendar year", default=2020, type=int
    )

    args = parser.parse_args()
    generate_calendar(daily_notes_dir=args.daily_notes_dir, year=args.year)
