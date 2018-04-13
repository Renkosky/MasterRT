#!/usr/bin/env bash
echo ':::编译文件'
npm run tsd

_ov=`npm view masterrt.seed version`

echo '::: 升级版本号'
    _uv=`node -pe '(JSON.parse(process.env.npm_config_argv).remain[0] || 0).toString()'`
    cd ./pub
        if [ $_uv == "0" ]; then
            _uv=`npm version patch`
        else
            npm version $_uv
        fi
    cd ..

echo ':::::: 推送到NPM'
    npm publish pub

if [ $? -eq 0 ]; then
    echo '::::::::: 将package.json写回项目'
        cp -R ./pub/package.json ./src/lib/package.json

    echo '::::::::::: 删除临时目录 pub'
        rm -rf ./pub

    echo ':::::::::::: Git Mark 此次修改信息'
    git pull
    git add .
    git commit -am "$_ov -> $_uv"
    git pull
    git push

    echo '::::::::::::::: Git Tag'
    git tag $_uv
    git push --tags
fi