# PM Vibe Coding Skill

A custom skill designed for Product Managers to iteratively design, document, and prototype features with strict context management.

## Installation

1.  **Copy** this entire `pm-vibe-coding` folder into your project's skill directory.
    -   Recommended: `[Your-Repo]/.antigravity/skills/pm-vibe-coding/`
    -   Or simply keep it in `[Your-Repo]/skills/pm-vibe-coding/`

## Usage

1.  **Start a Session**:
    > "Use the PM Vibe Coding skill to help me design the new [Feature Name]."

2.  **Follow the Flow**:
    -   **Discovery**: The AI will ask you questions to clarify the "Why".
    -   **Documentation**: The AI will help you draft a PRD.
    -   **Prototyping**: The AI will build a `v1` prototype.

3.  **Iterate**:
    -   If you want to change logic, say: "I want to try a different approach for the logic."
    -   The AI will create a `v2` folder to preserve your `v1`.

## Key Files

-   `_context/active_state.md`: The "Brain" of your session. **Always** check this if the AI seems lost.
-   `prototypes/`: Where your code lives, separated by version.
