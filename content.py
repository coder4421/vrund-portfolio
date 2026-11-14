"""Load and validate the shared portfolio content."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def load_content(path=None):
    source = Path(path) if path is not None else ROOT / "content-data.json"
    data = json.loads(source.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("Content must be a JSON object.")
    for collection in ("jobs", "groups"):
        if not isinstance(data.get(collection), list) or not data[collection]:
            raise ValueError(f"Content needs a nonempty {collection} list.")
    for index, job in enumerate(data["jobs"], 1):
        if not isinstance(job, dict):
            raise ValueError(f"Job {index} must be an object.")
        for field in ("date", "company", "role", "summary", "tech", "resume_summary"):
            if not isinstance(job.get(field), str) or not job[field].strip():
                raise ValueError(f"Job {index} needs a nonempty {field} string.")
        if not isinstance(job.get("bullets"), list) or not all(
            isinstance(bullet, str) and bullet.strip() for bullet in job["bullets"]
        ):
            raise ValueError(f"Job {index} needs a list of bullet strings.")
    for index, group in enumerate(data["groups"], 1):
        if not isinstance(group, list) or len(group) != 3 or not all(
            isinstance(value, str) and value.strip() for value in group
        ):
            raise ValueError(f"Expertise group {index} needs name, description, and technologies.")
    if not isinstance(data.get("artifact"), str) or not data["artifact"].strip():
        raise ValueError("Content needs artifact HTML.")
    return data
