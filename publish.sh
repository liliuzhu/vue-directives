set -e
echo "[vue-directives]Enter publish version: "
read VERSION

read -p "Publishing - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Publishing $VERSION ..."

  # build
  #git checkout master
  VERSION=$VERSION npm run build

  # publish
  git add .
  git commit -m 'releases v$VERSION version'
  git tag -a v$VERSION -m "releases v$VERSION version"
  git push origin --delete tag "v$VERSION"
  npm publish --access public
fi
