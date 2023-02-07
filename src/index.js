import React ,{useState , useEffect} from "react";
import ReactDOM  from "react-dom";
import axios from "axios";
import './styles.css';

const App =  () => {
    const [movies, setMovies] = useState([]);
    const [title , setTitle] = useState("harry");
    const [date , setDate ] = useState("");
    const [ids , setIds] = useState("");
    const [pageNumber , setPageNumber] = useState(1);
    // const [pagePrev , setPagePrev] = useState("");
    // const [pageNext , setPageNext] = useState("");
    const [pageTotal , setPageTotal] = useState(0);


    const getMovies = async (p) => {
        // const moviesRequest = await axios.get("http://www.omdbapi.com/?i=$tt1201607&apikey=278ba782");
        
    const moviesRequest = await axios.get("http://www.omdbapi.com/?s=$harry&apikey=278ba782");
        setMovies(moviesRequest.data.Search);
        setPageTotal(Math.ceil(moviesRequest.data.totalResults/10));
    };
    const SearchTab = async (p) => {
        
        console.log(p);
        let flag=true;
        if(p<1){
            p=1;
            flag=false;
        }
        if(p!==1&&p>pageTotal){
            p=pageTotal;
            flag=false;
        }
        console.log(p);
        setPageNumber(p);

        
        if(flag){

            if(ids){
                const moviesRequest = await axios.get(`http://www.omdbapi.com/?i=${ids}&Page=${p}&apikey=278ba782`);
                setPageTotal(Math.ceil(1));
                moviesRequest?setMovies([moviesRequest.data]):setMovies("");
                setIds("");
                setTitle("");
                setDate("");
            }
            else{
                const moviesRequest = await axios.get(`http://www.omdbapi.com/?s=${title}&y=${date}&Page=${p}&apikey=278ba782`);
                setPageTotal(Math.ceil(moviesRequest.data.totalResults/10));
                moviesRequest?setMovies(moviesRequest.data.Search):setMovies("");
                setIds("");
            }
            // tt1201607
        }
    };


    useEffect( () =>{
        getMovies();
    }, []);

    return(
        <>

            <nav className="navbar">
            <div className="logo">MovieMania</div>

            <ul className="nav-links">
                <input type="checkbox" id="checkbox_toggle" />
                <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
                <div className="menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Liked Movies</a></li>
                    <li>
                    <div className="search21">
                    <div id="bars">
                    <div id="upper">
                        <input type="text" id="search1" value={title} placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} />                   
                        <input type="number" id="search2" value={date} placeholder="Enter release year" onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div id="lower">
                        <input type="text" id="search1" value={ids} placeholder="Enter Movie ID" onChange={(e) => setIds(e.target.value)} />
                    </div>
                </div>
                <button id="btn" onClick={()=>SearchTab(1)}>Search</button>
                    </div>
                    </li>
                </div>
            </ul>

            <div className="search11">
                <div id="bars">
                    <div id="upper">
                        <input type="text" id="search1" value={title} placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} />                   
                        <input type="number" id="search2" value={date} placeholder="Enter release year" onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div id="lower">
                        <input type="text" id="search1" value={ids} placeholder="Enter Movie ID" onChange={(e) => setIds(e.target.value)} />
                    </div>
                </div>
                <button id="btn" onClick={()=>SearchTab(1)}>Search</button>
            </div>
                        
            </nav>

            <div id="space"></div>

        { movies.length > 0 ? movies.map(movie => {
                return (
                    <div id="pad" key={movie.imdbID}>
                        <div className="card">
                            <div className="left">
                                    <img src={movie.Poster} alt={movie.Title}/>
                            </div>
                            <div className="right">
                                <span>Title : {movie.Title}</span><br/>
                                <span>Year of Release : {movie.Year}</span><br/>
                                <span>Imdb ID : {movie.imdbID}</span><br/>
                                <span>Type : {movie.Type}</span><br/>
                
                                <div className="favor">
                                    <input id="heart" type="checkbox" />
                                    <label for="heart">❤</label>
                                    {/* <button id="like" >Like</button>
                                    <button id="dislike" >DisLike</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                    
        }): ''}
        {movies.length === 0 &&
                <>
                <p>No Result Found!!....</p>
                </>            
        }

        <div id="space"></div>
        {/* pagination */}
            <div id="footer">
            <button className="butn" onClick={()=>{SearchTab(pageNumber-1);}}> {'<-'} Previous</button>
            {pageNumber}
            <button className="butn" onClick={()=>{SearchTab(pageNumber+1);}}>Next {'->'} </button>
            </div>
        </>
      )
}
ReactDOM.render(<App />,document.getElementById("root"));