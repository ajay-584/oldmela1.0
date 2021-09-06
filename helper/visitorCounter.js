const dateFormat = require('dateformat');
const pool = require('../model/pool');

module.exports = () => {

	return async (req, res, next) => {
		// custom code 
		const host = req.headers.host;
		const ip = req.ip;
		// determine the today date
		const todayDate = dateFormat(new Date(), 'dd-mm-yyyy');
		// await pool.visitor_data.create({visitData:"data"});
		const hostIpDate = String(`hostp:${host}|ip:${ip}|date:${todayDate}`);
		const visit = await pool.visitor_data.find({visitData:hostIpDate});
		if(visit.length<1){
			await pool.visitor_data.create({visitData:hostIpDate});
			return next();
		}
		next();
	};
};