set -e
echo "[vue-directives]Enter publish version: "
read VERSION

read -p "Publishing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Publishing $VERSION ..."

  # build
  git checkout master
  VERSION=$VERSION npm run build

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  # npm version $VERSION --message "[publish] $VERSION"

  # publish
  git push
  git tag -a v$VERSION -m "v$VERSION"
  npm publish
fi
