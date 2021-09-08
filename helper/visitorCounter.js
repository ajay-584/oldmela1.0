const requestIp = require('request-ip');
const dateFormat = require('dateformat');
const pool = require('../model/pool');

module.exports = () => {

	return async (req, res, next) => {
		try{
			// custom code 
			const date = dateFormat(new Date(), 'dd-mm-yyyy');
			const ip = requestIp.getClientIp(req); 
			const visit = await pool.visitor_data.find({ip:ip});
			if(visit.length<1){
				await pool.visitor_data.create({ip});
				return next();
			}
			next();
		}catch(e){
			console.log(e);
			next();
		}
	};
};