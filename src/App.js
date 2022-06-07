import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [nameList, setNameList] = useState([]);
  const [giphyResult, setGiphyResult] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedGif, setSelectedGif] = useState("");
  const [selectedList, setselectedList] = useState([]);

  // on submitting Go button 
  const handleSubmit = () => {
    setNameList([...nameList, name]);
    setName("");
    setselectedList([...selectedList, selectedGif]);
    setSearch("");
    // console.log("nameList", nameList);
  };


  const select = (item) => {
    setSelectedGif(
      giphyResult?.data.filter((val) => {
        return val.id == item;
      })
    );
  };

  useEffect(() => {
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=eH3t7Sudb2TKpPpsrwrWNfKgIiGXG5de"
    )
      .then((response) => response.json())
      .then((result) => {
        setGiphyResult(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const SearchTerm = giphyResult?.data.filter(
    (gif) => gif.title.toLowerCase().indexOf(search) > -1
  );

  return (
    <div className="App">
      <div className="main">
        <div className="input">
          <input
            className="inputbox"
            type="text"
            placeholder="Enter text..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="gif">
          <input
            className="gifsearch"
            type="text"
            placeholder="Search gif..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="button" onClick={handleSubmit}>
          Go
        </button>
      </div>
      <div className="">
        {SearchTerm?.map((item) => {
          return SearchTerm.length == 50 ? (
            ""
          ) : (
            <img
              key={item.images.fixed_height.url}
              src={item.images.fixed_height.url}
              alt="gif"
              onClick={() => select(item.id)}
            />
          );
        })}
      </div>
      <div className="">
        <div className="Result">
          {nameList.map((item) => (
            <h4 className="h4" key={item} > {item}</h4>
          ))}
          {selectedList?.map((el) => {
            return (
              <img
                key={el[0].images.fixed_height.url}
                className="gifs"
                src={el[0].images.fixed_height.url}
                alt="gif"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
