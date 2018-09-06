import EnvConst from 'src/theme/const-env.mri';

let ThemeConst = {
    // ... 各themeConst
    STORAGE_X_TOKEN: 'TEST3_X_TOKEN',
    STORAGE_LOCALE: 'TEST3_LOCALE',
    LOCALE: 'en',
    LOCALE_PATH: '/assets/test3/locale',
};

const Test3Const = {...ThemeConst, ...EnvConst};

export default Test3Const;
