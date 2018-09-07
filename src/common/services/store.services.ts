/**
 * store services
 * 使用JS SERVICES单例特性，存储共享数据
 */
class IStoreServices {
    initValue: any = {};
}

export {IStoreServices};
export default new IStoreServices();