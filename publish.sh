set -e

read -p "Publishing - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Publishing ..."

  # build
  #git checkout master
  npm run build

  # publish
  npm publish --access public
fi
