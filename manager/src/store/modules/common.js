import axios from '@/libs';
import util from '../../libs/util';

const commons = {
    state: {

    },
    actions: {
        async getTemplateList(context, payload) {
            //传入不同模板类型参数
            let data = payload.data;
            let response = await axios.request({
                url: 'user/getTemplate',
                data: data,
                method: 'post'
            });
            return util.wrapResult(response);
        }
    }
};

export default commons;