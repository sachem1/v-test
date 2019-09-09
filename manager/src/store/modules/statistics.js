import service from "./service";
import axios from 'axios';
import util from '@/libs/util';

const statistics = service;
statistics.actions.getStatisticsList = async function(context, payload){
    let response=await axios.post(
		'Setting/StatisticsService/Statistics?statisticsId=' + payload.data.statisticsId, 
		{
			ConditionParams : payload.data,
			Pagination :{
				PageSize : payload.data.MaxResultCount,
				CurrentPageIndex : payload.data.SkipCount / payload.data.MaxResultCount + 1
			}
		});
    return util.wrapResult(response);
};

statistics.actions.getStatisticsCondition = async function(context, payload){
    let response=await axios.get(
		'Setting/StatisticsService/GetStatisticsCondition?statisticsId=' + payload.data);
    return util.wrapResult(response);
};
export default statistics;