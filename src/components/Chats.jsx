import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Chat} from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
}));

//Chatsがリスト全体を表していてリストアイテムそれぞれはChatで使いたい為Chatに移動
//初期のChatの状態渡したいためpropsを()内に入れる
const Chats = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {props.chats.map((chat, index) => {
        return <Chat text={chat.text} type={chat.type} key={ index.toString() }/>
      })}
    </List>
  )
}
//Chatコンポーネントへ渡す。textとtypeを渡した
export default Chats
