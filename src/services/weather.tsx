const weather = async (props: any): Promise<any> => {
    const { city } = props
    const API_key = "32d7547d7863fd15d4b20c866155c8ab"
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
    const res = await fetch(api, {
        method: 'GET'
    })
    // console.log(res);
    if (res.ok) {
        return res.json().then(data => Promise.resolve(data))
    }
    return Promise.reject(`something went wrong: response was: ${res.status}`)
    
}

export default weather;