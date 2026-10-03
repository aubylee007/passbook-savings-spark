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

- Keep demonstration stakeholder records in a client-safe data module and use stable SHG IDs across public views and shared messages, so every view refers to the same group.
- Persist mock partner messages in a Cloud table with realtime subscription; demo login is a presentation gate only, so public write access must not be mistaken for production authorization.
- Keep the three modes in the home route with hash-addressable public detail views, because the requested prototype is one connected passbook app with direct `#shg1` entry.
