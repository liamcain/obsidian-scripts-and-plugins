import jinja2
import os

SCRIPT_DIR = os.path.dirname(__file__)


def get_template(template_name):
    template_loader = jinja2.FileSystemLoader(searchpath=f"{SCRIPT_DIR}/templates")
    template_env = jinja2.Environment(loader=template_loader)
    return template_env.get_template(template_name)
