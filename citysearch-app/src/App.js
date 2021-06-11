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
                    {zipitems.map(newItems => (
                      <li>
                      <li id="item" key={newItems.id}>State: {newItems.State}</li>
                      <li id="item" key={newItems.id}>Total Wages: {newItems.TotalWages}</li>
                      </li>
                    ))}
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
