const dateFormat = require('dateformat');
const pool = require('../model/pool');

const todayDate = dateFormat(new Date(), 'dd-mm-yyyy');

module.exports = () => {
	// list of known IP addresses and session ids
	const ipAddresses = {};
	const sessionIds = {};

	// call the hook or update the counter in the MongoDB collection
	const inc = async counterId => await pool.visitor_data.create({ id: `127.0.0.1-requests-${todayDate}` })

	// wrap the counter incrementation with redis synchronisation
	let incCounter = inc;

	return (req, res, next) => {
		// determine the today date
		const todayDate = dateFormat(new Date(), 'dd-mm-yyyy');

		// determine the counter prefix
		const counterPrefix = req.hostname;

		// increment the counter of requests
		incCounter(`${counterPrefix}-requests-${todayDate}`);

		// check if the express-session middleware is enabled
		if(req.session === undefined)
			return next();

		// determine the ip address key and the session key
		const ipAddressKey = `${todayDate}-${req.ip}`;
		const sessionKey = `${todayDate}-${req.session.id}`;

		// "notFirstRequest" is used because when multiple requests come at the same time from the same web client, they are not identified with the same session id
		// the last visit date is set only after the second wave of requests when the cookie has been initialized client-side
		let processedToday = false;
		if(req.session.notFirstRequest && req.session.lastVisitDate !== todayDate) {
			// check if this visitor is not came today
			// the IP address and the session are checked to see if they have not already been processed
			if(
				(!ipAddresses[ipAddressKey] || !ipAddresses[ipAddressKey].processedToday) &&
				(!sessionIds[sessionKey] || !sessionIds[sessionKey].processedToday)
			) {
				incCounter(`${counterPrefix}-visitors-${todayDate}`, `${req.ip}-visitor-${todayDate}`);
				!req.session.lastVisitDate && incCounter(`${counterPrefix}-new-visitors-${todayDate}`, `${req.ip}-new-visitor-${todayDate}`);
			}

			// set the last visit date for this visitor
			req.session.lastVisitDate = todayDate;

			// set the "processedToday" boolean to true to avoid incrementing the visitor counter for the same IP or the same session
			processedToday = true;
		}
		req.session.notFirstRequest = true;

		// check if this IP address is new today
		if(!ipAddresses[ipAddressKey]) {
			ipAddresses[ipAddressKey] = { requests: 1, processedToday };
			incCounter(`${counterPrefix}-ip-addresses-${todayDate}`, `${req.ip}-ip-address-${todayDate}`);
		} else {
			ipAddresses[ipAddressKey].requests++;
			ipAddresses[ipAddressKey].processedToday = processedToday || ipAddresses[ipAddressKey].processedToday;
		}

		// check if this session is new today
		if(!sessionIds[sessionKey]) {
			sessionIds[sessionKey] = { requests: 1, processedToday };
			incCounter(`${counterPrefix}-sessions-${todayDate}`, `${req.session.id}-session-${todayDate}`);
		} else {
			sessionIds[sessionKey].requests++;
			sessionIds[sessionKey].processedToday = processedToday || sessionIds[sessionKey].processedToday;
		}
		next();
	};
};