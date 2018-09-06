interface $$ThemeBus {

    /**
     * identity
     * 用户身份登记
     * 通常用在用户登录，切换等
     * 需要设置或更新用户的session或token信息
     * 又或缓存用户的基本信息
     * @param user
     * @param cb
     */
    identity(user: any, cb?: any): void;

    /**
     * 清理用户身份信息
     */
    clearIdentity(): void;

    /**
     * afterPath
     * 获取用户登录后的页面地址
     * @return {string}
     */
    afterPath(): string;

    /**
     * beforePath
     * 获取默认首页
     * @return {string}
     */
    beforePath(): string;
}