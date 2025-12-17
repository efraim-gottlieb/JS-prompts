#!/bin/bash   

echo "Enter commit message:"
read commit_msg

git add .

git commit -m "$commit_msg"

git checkout main
git merge dev
git push

git checkout dev

echo "✔ Done!"
