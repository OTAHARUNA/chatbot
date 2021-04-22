import React from 'react';
//マテリアルUI使う
import { makeStyles,createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//見た目をカスタマイズするのに以下マテリアルUI使用。
const useStyles = makeStyles(() => (
  createStyles({
    "button": {
      borderColor: '#FF3366',
      color: '#FF3366',
      fontWeight: 600,
      marginBottom:'8px',
      "&:hover": {
        backgroundColor:'#FF3366',
        color:'#fff'
      }
    }
  })
));

const Answer = (props) => {
  //マテリアルUI使う
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant="outlined" onClick={() => { props.select(props.content, props.nextId) }}>
    {/*onClickは、App.jsxのthis.selectAnswerの関数を呼び出し */}
      {/*{props.answer.content}でエラーが起きてしまう。propsが受け取れていない。正：props.content→Answeralistにてanswer迄取得している */}
      {/*App→AnswersListからバケツリレーで届いた*/}
      {props.content}
    </Button>
  )
}

export default Answer
