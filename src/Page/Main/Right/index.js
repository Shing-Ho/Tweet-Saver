import React, {useState, useEffect, useCallback} from 'react';
import { useDrop } from 'react-dnd'

import Tweet from '../../../Component/Tweet';
import './index.css';

export default function Right() {
  const [tweetList, setTweetList] = useState([]);

  const [, drop] = useDrop({
    accept: 'Tweet',
    drop: () => {
      console.log('dropped');
      setTimeout(() => {
        loadTweetList();
      }, 100)
      return { name: 'Saved' }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
 
  const loadTweetList = useCallback(() => {
    const currentList = localStorage.getItem('@TweetList');
    if (currentList) {
      try {
        const list = JSON.parse(currentList);
        if (list && list.length) {
          setTweetList(list);
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, []);

  useEffect(() => {
    loadTweetList();
  }, [loadTweetList]);

  return (
    <div ref={drop} className="right">
      <div className="rightHeader">Saved Tweets</div>
      <div className="rightMain">
        {
          tweetList.map(tweet => (
            <Tweet draagable={false} {...tweet} key={tweet.id} />
          ))
        }
      </div>
    </div>
  )
}