#!/usr/bin/env bash

git status | grep 'nothing to commit, working directory clean'

echo ':::编译文件'
npm run tsd
if [ $? -ne 0 ]; then
    echo 编译错误
    exit 1
fi

# 旧版本号
_ov=`npm view masterrt.seed version`

# 要发布的版本号
_version=""

# git commit 信息
_commit=""

if [ -n ]; then
    if [ "$1" == "v" ]; then
        _version="$2"
        _commit="$4"
    elif [ "$1" == "m" ]; then
        _version="$4"
        _commit="$2"
    fi
fi


git add .
git commit -am "$_commit"

# 若不手动设置版本号，则自动增长
cd ./pub
    if [ "$_version" == "" ]; then
        _version=`npm version patch --no-git-tag-version`
    else
        npm version $_version --no-git-tag-version
    fi
cd ..

echo "::::: 推送到NPM $_ov -> $_version"

echo ":::::: 推送到NPM"
    npm publish pub

if [ $? -eq 0 ]; then

    echo '::::::::: 将package.json写回项目'
        cp -R ./pub/package.json ./src/lib/package.json

    echo '::::::::::: 删除临时目录 pub'
        rm -rf ./pub

    echo ":::::::::::: Git Mark 此次修改信息"
    git pull
    git add .
    git commit -am "$_ov -> $_version :: $_commit"
    git pull
    git push

    _tag="masterrt.v$_version"

    echo "::::::::::::::: Git Tag"
    git tag $_tag -m "$_ov -> $_version :: $_commit"
    git push --tags
fi