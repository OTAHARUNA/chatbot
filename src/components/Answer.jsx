import React from 'react';
//マテリアルUI使う
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//見た目をカスタマイズするのに以下マテリアルUI使用。
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100 %',
  },
}));

const Answer = (props) => {
  //マテリアルUI使う
  const classes = useStyles();
  return (
    <Button className={classes.root} variant="contained" color="secondary">
      {/*{props.answer.content}でエラーが起きてしまう。propsが受け取れていない。正：props.content→Answeralistにてanswer迄取得している */}
      {props.content}
    </Button>
  )
}

export default Answer
