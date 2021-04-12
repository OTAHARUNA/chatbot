import React from 'react';
//マテリアルUI使う
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//見た目をカスタマイズするのに以下マテリアルUI使用。
const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

const Answer = (props) => {
  //マテリアルUI使う
  //const classes = useStyles();
  return (
    <Button variant="contained" color="secondary">
      {/*{props.answer.content}でエラーが起きてしまうpropsが受け取れていない */}
      {props.content}
    </Button>
  )
}

export default Answer
