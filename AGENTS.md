# Internal reviews

Keep internal reviews, audit reports, and supporting captures out of Git. Store them locally under the ignored `docs/` directory. Only the public README preview belongs in Git under `docs/`.

# Pull request reviews

After pushing and verifying a review fix, reply in each affected GitHub review thread with the change, commit SHA, and verification results. Resolve the thread after posting the reply if all feedback in it has been addressed.

# Project visuals

- Treat project icons on the home page as the small image beside the project title. When a request changes a project's logo or favicon, use the official square favicon or app icon in that slot. Add a separate wordmark or banner only when the request explicitly calls for another visual.
- Foloom uses its official app icon as the title favicon. Show the real XLSX editor capture in the details in both languages.
- Verify the rendered image source, position, and number of images in the affected project entry on both language versions.

# Writing conventions

- Do not use em dashes (`—`) or en dashes (`–`) in user-facing copy, documentation, metadata, or generated content.
- Use a normal hyphen for ranges, for example `2025-2026`.
- Connect sentences naturally with commas, periods, colons, parentheses, or conjunctions instead of long dashes.
- Before finishing copy changes, search the repository for `—` and `–` and replace any accidental usage unless it is required verbatim by source material.
