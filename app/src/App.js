import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Grid from './grid';
import Details from './details';
import { Header, NavigationMenu } from './Navigation';
import ReactDOM from 'react-dom';
import InfinityScroll from './Infinityscroll';
import Loading from './Loading';
import CircularProgressBar from './CircularProgressBar';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLineFinished, setLoadingLineFinished] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [navIsAnimating, setNavAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressComplete, setProgressComplete] = useState(false);
  let interval;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.wunderfauks.com/wp/wp-json/acf/v3/work');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingLineFinished(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (loadingLineFinished) {
      interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [loadingLineFinished]);

  const toggleNav = (event) => {
    event.preventDefault();
    setNavAnimating(true);

    if (navOpen) document.body.classList.remove('nav-open');
    else document.body.classList.add('nav-open');

    setTimeout(() => {
      setNavAnimating(false);
      setNavOpen(!navOpen);
    }, 500);
  };

  const closeNav = () => {
    document.body.classList.remove('nav-open');
    setNavOpen(false);
  };

  return (
    <Router>

      <div>
        <Loading />
        <Header
          navOpen={navOpen}
          toggleNavHandler={(event) => toggleNav(event)}
          navIsAnimating={navIsAnimating}
        />
        <NavigationMenu
          navOpen={navOpen}
          navIsAnimating={navIsAnimating}
          closeNav={() => closeNav()}
          toggleNavHandler={(event) => toggleNav(event)}
        />

        {loadingLineFinished && location.pathname === '/' && (
          <CircularProgressBar
            visible={progress > 0 && !progressComplete}
            onComplete={() => setProgressComplete(true)}
          />
        )}


        {!loading && loadingLineFinished && (
          <InfinityScroll onScroll={() => { }}>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<Grid data={data} />} />
            </Routes>



          </InfinityScroll>
        )}
      </div>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export default App;
