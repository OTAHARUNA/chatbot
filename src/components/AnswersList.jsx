import React from 'react';
//Answerから直接読み込むためにfrom './Answer'としてもいいが今回はエントリポイント使っているのでindex経由で。
import {Answer} from './index';

const AnswersList = (props) => {
  return(
    <div className="c-grid_answer">
      {/*propsで受け取る。１つ１つvalueとindex回していく。ここが箱の役割
      {props.answers.map((value, index) => {
        return (<Answer content={value.content} key={ index.toString() }/>)
      })}*/}
      <Answer content={"hoge"}/>
    </div>
  )
}

export default AnswersList
