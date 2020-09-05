import React, {useState} from 'react';
import Loader from 'react-loader-spinner'

import Tweet from '../../../Component/Tweet';
import { ReactComponent as SearchIcon } from '../../../search.svg';
import './index.css';

export default function Left() {
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(false);
  const [tweetList, setTweetList] = useState([]);

  const searchTweets = () => {
    if(!searchString) {
      alert('Please type the search string!');
      return;
    }
    setLoading(true);
    fetch('https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=' + searchString + '&count=20', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.REACT_APP_BEARER_TOKEN
      }
    }).then(response => {
      return response.json();
    }).then(list => {
      console.log(list);
      setLoading(false);
      setTweetList(list.statuses);
    }).catch(err => {
      console.log(err);
      alert(err.toString());
      setLoading(false);
      setTweetList([]);
    })
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      searchTweets();
    }
  }
  return (
    <div className="leftPanel">
      <div className="searchRow">
        <input
          onKeyPress={handleKeyPress}
          type="input"
          placeholder="Search Twitter"
          className="searchInput"
          maxLength="1000"
          onChange={e => setSearchString(e.target.value)}  />
        <button className="searchButton" onClick={() => searchTweets()}>
          <SearchIcon width={25} height={25} />
        </button>
      </div>
      <div className="leftMain">
        {
          loading ? (
            <div className="loadingContainer">
              <Loader
                type="ThreeDots"
                color="#013398"
                height={50}
                width={50}
              />
            </div>
          ) : (
            tweetList.map(tweet => (
              <Tweet draagable {...tweet} key={tweet.id} />
            ))
          )
        }
      </div>
    </div>
  )
}