<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the factoring replica as the original scoped DOM and CSS rendered through React, replacing interactive buttons with the shared Button variant; this preserves reference styling without executing third-party tracking scripts.
- Host copied images and fonts through asset pointers; this avoids hotlinks and keeps the original appearance portable.
- Serve the requested landing at /invertir-factoring and redirect / there; this keeps the preview entry point aligned with the requested URL.
- Preserve the reference calculator's existing formula separately from landing copy; this keeps text changes from silently changing financial behavior.
