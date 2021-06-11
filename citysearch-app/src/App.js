import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.citySearch = this.citySearch.bind(this);
    this.state = {
      items: [],
      isLoaded: false,
      zipitems: [],
    }
  }

  citySearch(e){
    let city = e.target.value.toLocaleUpperCase();    //on screen it looks lowercase but it retrieves results
    try{
      console.log("fetching");
    fetch('https://ctp-zip-api.herokuapp.com/city/'+ city)
        .then(res => res.json())
        .then(json => {
          this.setState({
            items: json,
          });
        });
    if(this.state.items != null){
      this.setState({isLoaded:true})
      
    }
    else{this.setState({isLoaded:false})}
  }catch(e){console.error(e);}
        
  }

  zipSearch(zipcode){
    console.log(zipcode)
    fetch('http://ctp-zip-api.herokuapp.com/zip/'+ zipcode)
    .then(res => res.json())
        .then(json => {
          this.setState({
            zipitems: json,
          });
        });
  }

  render(){
    const search = <input id="citySearch" type="text" placeholder="Search cities" onChange={this.citySearch}/>
    var{ isLoaded, items, zipitems} = this.state;

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
                    {this.zipSearch(item)}
                  {/*  {zipitems.map(newItems => (
                      <li>
                      <li id="item" key={newItems.id}>State: {newItems.State}</li>
                      <li id="item" key={newItems.id}>Total Wages: {newItems.TotalWages}</li>
                      </li>
                  ))} */}
                    {item}
                </li>
                ))}
              </ul>
          </div>
      )
    }
}
}

export default App;
