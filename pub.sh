#!/usr/bin/env bash

echo ':::编译文件'
npm run tsd
if [ $? -eq 0 ]; then
    echo 编译错误
    echo '$1'
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
    