import React from 'react';
import { useDrag } from 'react-dnd'

import './index.css';

export default function Tweet({id, text, user, draagable}) {
  const {profile_image_url, name, screen_name, created_at} = user;

  const [, drag] = useDrag({
    item: { id, text, user, type: 'Tweet' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        const currentList = localStorage.getItem('@TweetList');
        if (currentList) {
          try {
            const list = JSON.parse(currentList);
            localStorage.setItem('@TweetList', JSON.stringify([...list, item]))
          } catch (e) {
            localStorage.setItem('@TweetList', JSON.stringify([item]))
          }
        } else {
          localStorage.setItem('@TweetList', JSON.stringify([item]))
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div ref={draagable ? drag : null} className="tweet" key={id}>
      <div className="tweetMain">
        <img src={profile_image_url} alt={name} className="tweetImg" />
        <div className="tweetMainField">
          <div className="tweetTop">
            <div className="tweetNameRow">
              <span className="tweetName">
                {name}
              </span>
              <span className="tweetScreenName">
                @{screen_name}
              </span>
            </div>
            <div>{created_at}</div>
          </div>
          <div className="tweetMainText">
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}