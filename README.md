# flynndev


Notes
---
Use this to remove untracked files from git repo without deleting actual files
```
git ls-files --ignored --exclude-standard | sed 's/.*/"&"/' | xargs git rm -r --cached

```
