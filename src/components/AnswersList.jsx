import React from 'react';
//Answerから直接読み込むためにfrom './Answer'としてもいいが今回はエントリポイント使っているのでindex経由で。
import {Answer} from './index';

//ルートのコンポーネントから受け取る。ここが中の表示にかかわってくる
const AnswersList = (props) => {
  return(
    <div className="c-grid__answer">
      {/*propsで受け取る。１つ１つvalueとindex渡していく。ここが箱の役割
      map(配列内で定義した中身,各要素のインデックス番号)*/}
      {props.answers.map((value, index) => {
        return <Answer content={value.content} key={ index.toString() }/>
      })}
      {/*<Answer content={props}/>*/}
    </div>
  )
}

export default AnswersList
