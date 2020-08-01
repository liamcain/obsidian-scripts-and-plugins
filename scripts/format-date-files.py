from datetime import datetime
import os
from glob import glob
from pathlib import Path


def is_valid_date(date_str: str):
    # print(f'checking if {date_str} is a valid date')
    try:
        datetime.strptime(date_str, '%b %d, %Y')
    except ValueError:
        return False
    return True


def formatted_date(date_str: str):
    return datetime.strptime(date_str, '%b %d, %Y').strftime('%Y-%m-%d')


def format_date_files():
    for filepath in glob("~/Documents/Notes/*.md"):
        # print(f'found file {filepath}')
        file_name = Path(filepath).stem

        if is_valid_date(file_name):
            full_dir = os.path.dirname(filepath)
            new_filepath = f'{full_dir}/{formatted_date(file_name)}.md'
            print(f'moving {filepath} to {new_filepath}')
            os.rename(filepath, new_filepath)


if __name__ == "__main__":
    format_date_files()
