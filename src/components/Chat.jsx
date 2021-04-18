import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import flower from '../assets/image/flower.jpg';
import flower2 from '../assets/image/flower2.jpg';

const Chat = (props) => {
  //props.typeでquestionなのかanswerなのかここで判断。isQuestionで論理型で作る
  const isQuestion = (props.type === 'question');
  //?trueの時 : questionの時  →左から順番に詰めて行う。
  const classes = isQuestion ? 'p-chat_row' : 'p-chat_reverse';
  return (
      <ListItem>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="icon" src={flower} />
        ) : (
          <Avatar alt="icon" src={flower2} />
        )}
      </ListItemAvatar>
        <div className="p-chat__bubble" >{props.text}</div>
      </ListItem>
  )
}

export default Chat
