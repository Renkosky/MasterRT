import $pool from './base.resources';
import $theme from '../theme';

/**
 * 数据预加载
 */

class $preload {

		$services: any = $theme.getProviders('$services');

		preload(status, cb: any) {
				if (status) {
						let User = $pool.user.get({});
						Promise.all([User]).then(result => {
								let [user] = result;
								this.$services.setUserResponseInitValue(user);
								cb && cb(result);
						});
				} else {
						cb && cb();
				}
		}
}

export default new $preload();
