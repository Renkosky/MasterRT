import EnvConst from 'src/theme/const-env.mri';

let ThemeConst = {
    // ... 各themeConst
    STORAGE_X_TOKEN: 'DEMO_X_TOKEN',
    STORAGE_LOCALE: 'DEMO_LOCALE',
    LOCALE: 'en',
    LOCALE_PATH: '/assets/demo/locale',
};

const DemoConst = {...ThemeConst, ...EnvConst};

export default DemoConst;
