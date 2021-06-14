import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  promisePractice = (e) => {
    
    let city = e.target.value.toLocaleUpperCase(); 
    fetch('https://ctp-zip-api.herokuapp.com/city/'+ city)
    .then(res => res.json())
    .then(zipCodes => {
      let arrayC = [];
      const req = zipCodes.map((zip) =>{
        return fetch('https://ctp-zip-api.herokuapp.com/zip/'+ zip)
          .then(response => response.json())
          .then(zipdata => {
            arrayC = arrayC.concat(zipdata)        
            console.log(arrayC)
          }).catch(error => console.log(error))
      })
      return Promise.all(req).then(() => {
        arrayC.sort((a, b) => (a.Zipcode > b.Zipcode) ? 1 : -1)
        console.log(arrayC)
        this.setState({
          items: arrayC,
          isLoaded: true,
        } )
      })
    })
    }

  render(){
      const search = <input id="citySearch" type="text" placeholder="Search cities" onChange={this.promisePractice}/>
      var{ isLoaded, items} = this.state;

      if(!isLoaded){
        return (
          <div className="App">
          <h1>City Search</h1>
          <div id="searchBox">~{search}~</div>
          <p>No results</p>
          </div>)
      }
      else{
        
        return(
            <div className="App">
              <h1>City Search</h1>
                <div id="searchBox">~{search}~</div>
                <ul>
                  {items.map(item => (
                    <li id="list" key={item.id}>
                      <div>State: {item.State}</div>
                      <div>Area: {item.Zipcode}</div>
                      <div>Total wages: {item.TotalWages}</div>
                      <div>Population (estimated): {item.EstimatedPopulation} </div>
                      <div>Location: ({item.Lat},{item.Long})</div>
                  </li>
                  ))} 
                </ul>
            </div>
        )
      }
  }
}

export default App;
