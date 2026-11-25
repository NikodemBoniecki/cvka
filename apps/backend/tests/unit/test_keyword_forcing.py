"""Selected skills always land in the tailored resume's skills section."""

from typing import Any
from unittest.mock import AsyncMock, patch

from app.services.keyword_forcing import force_keywords


async def test_selected_skill_in_a_bullet_is_still_added_to_skills() -> None:
    resume: dict[str, Any] = {
        "summary": "",
        "workExperience": [
            {"description": ["Used Kubernetes to deploy the application."]}
        ],
        "additional": {"technicalSkills": []},
    }

    with patch(
        "app.services.keyword_forcing._propose",
        new_callable=AsyncMock,
        return_value=[],
    ):
        tailored = await force_keywords(
            resume,
            ["Kubernetes"],
            "Required: Kubernetes",
            "pl",
            skill_keywords=["Kubernetes"],
        )

    assert tailored["additional"]["technicalSkills"] == ["Kubernetes"]
