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
  git tag -a v$VERSION -m "v$VERSION"
  git push
  npm publish --access public
fi
