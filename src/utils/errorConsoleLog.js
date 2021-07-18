export const errorConsoleLog = (text, error) => {
	console.log(error);
	if (error) console.log(error.response);
	console.log(`${text} error!`);
};
