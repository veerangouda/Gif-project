import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [nameList, setNameList] = useState([]);
  const [giphyResult, setGiphyResult] = useState(null);
  const [search, setSearch] = useState("");
  const [d, setd] = useState([]);
  const [selectedGif, setSelectedGif] = useState("");
  const [selectedList, setselectedList] = useState([]);

  const handleSubmit = () => {
    setNameList([...nameList, name]);
    setd([]);
    setName("");
    console.log("nameList", nameList);
  };

  const handleGif = () => {
    setselectedList([...selectedList, selectedGif]);
    // setSelectedGif([...selectedGif])
  };

  const select = (item) => {
    // console.log("first",item)
    setSelectedGif(
      giphyResult?.data.filter((val) => {
        return val.id == item;
        // if(val.id === item){
        // }
      })
    );
  };
  console.log("selectedgif", selectedList);
  useEffect(() => {
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=eH3t7Sudb2TKpPpsrwrWNfKgIiGXG5de"
    )
      .then((response) => response.json())
      .then((result) => {
        setGiphyResult(result);
        // console.log("result",result)
        // console.log(
        //   "result",
        //   result.data.map((v) => {
        //     return v.url;
        //   })
        // );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const SearchTerm = giphyResult?.data.filter(
    (gif) => gif.title.toLowerCase().indexOf(search) > -1
  );
  // console.log("SearchTerm", SearchTerm);

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
          <button className="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <div className="gif">
          <input
            className="gifsearch"
            type="text"
            placeholder="search gif"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="button" onClick={handleGif}>
            Submit gif
          </button>
        </div>
      </div>
      <div className="">
        <div className="Result">
          {nameList.map((item) => (
            <h4 className="h4"> {item}</h4>
          ))}
          {/* {selectedGif.map((el) => {
            el.images.fixed_height.url
          })} */}

          {
            selectedList?.map((el) => {
              <img src={el.images.fixed_height.url} alt="gg" />
            })
          }
          {/* <img
            src={selectedList?.map((el) => {
              el.images.fixed_height.url;
            })}
            alt="gg"
          /> */}
          {/* <img src={selectedList?.map((el) => {
            el.images.fixed_height.url
          })}  /> */}
          {/* {selectedList} */}
        </div>
        <div className="giphy">
          {SearchTerm?.map((item) => {
            return SearchTerm.length == 50 ? (
              ""
            ) : (
              <img
                src={item.images.fixed_height.url}
                alt="gif"
                onClick={() => select(item.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
