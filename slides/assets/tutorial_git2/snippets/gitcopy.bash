# Opt 1) for the whole repo
git merge otherbranch --no-commit --no-ff -X theirs
git reset currentbranch

# Opt 2)
git checkout otherbranch .