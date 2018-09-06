import EnvConst from 'src/theme/const-env.mri';

let ThemeConst = {
    // ... 各themeConst
    STORAGE_X_TOKEN: 'TEST2_X_TOKEN',
    STORAGE_LOCALE: 'TEST2_LOCALE',
    LOCALE: 'en',
    LOCALE_PATH: '/assets/test2/locale',
};

const Test2Const = {...ThemeConst, ...EnvConst};

export default Test2Const;
