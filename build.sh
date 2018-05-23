#!/usr/bin/env bash


echo ':::删除可能存在的编译文件夹pub'
rm -rf ./pub

echo ':::新建编译文件夹pub'
mkdir ./pub

echo ':::复制资源文件 assets'
cp -R ./src/lib/assets ./pub/assets

echo ':::复制脚手架文件package.json'
cp -R ./src/lib/package.json ./pub/package.json

echo ':::复制tsconfig'
cp -R ./src/lib/tsconfig.pub.json ./pub/tsconfig.pub.json

echo ':::复制部分相关文件'
cp -R ./src/lib/README.md ./pub/README.md

echo ':::编译文件'
npm run compile