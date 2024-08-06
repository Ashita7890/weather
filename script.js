const url = 'https://rapidweather.p.rapidapi.com/data/2.5/forecast?q=London%2CUK';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '4e0ea4cfd2mshdc9115116701107p1f698djsn03b5068920f3',
		'x-rapidapi-host': 'rapidweather.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}