import { MrResource } from 'masterrt';
// 统一错误处理
export const getRequest = (url, option, type = 'POST') => {
    let pool = MrResource.pool(url);
    if (type === 'POST') {
        return pool
            .post(option)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.data;
            });
    } else {
        return pool
            .get(option)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.data;
            });
    }
};
