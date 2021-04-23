import React from 'react';
// import logo from './logo.svg';
import './App.css';
import weather from './services/weather'

const Header = (): JSX.Element => <div>Weather</div>
const Form = (props: any): JSX.Element => {
  const { dispatch } = props;
  const [city, setCity] = React.useState('San Francisco');
  const handleChange = (e: any) => {
    setCity(e.target.value)
  }
  const handleSearch = () => {
    weather({ city }).then(res => {
      // console.log(res)
      const { weather, main, wind, name } = res;
      const { temp, feels_like } = main;
      const { icon, description } = weather[0];
      const { speed } = wind;
      dispatch({type: 'data', data: { name, temp, feels_like, icon, description, speed }})
      
    }).catch(err => {
      console.log(err)
      dispatch({ type: 'error', message: 'There was an error' })
    })

  }
  return (
    <div className="form">
      <label htmlFor="input">City</label>
      <input onChange={handleChange} name="input"></input>
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}
const Result = (props: any): JSX.Element => { 
  const { state } = props;
  const { data, error } = state;
  const { name, temp, feels_like, icon, description, speed } = data
  return (<div className="result">
      <h1>{name}</h1> <span><img width="30px" height="30px" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='icon' /></span>
      <p>{`Description ${description}`}</p>
      <p>{`Temprature ${temp}${'\u00B0'}F`}</p>
      <p>{`Feels Like ${feels_like}${'\u00B0'}F`}</p>
      <p>{`wind ${speed} mph`}</p>
      
      <p style={{color: 'red'}}>{error ? error : ''}</p>
</div>)
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'error':
      return { ...state, error: action.message };
    case 'data':
      return { ...state, data: action.data };
    default:
      throw new Error();
  }
}
function App() {
  const initialState = { error: '', data: {} };
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <Form state={state} dispatch={dispatch}></Form>
        <Result state={state} dispatch={dispatch}></Result>
      </div>
    </div>
  );
}

export default App;
