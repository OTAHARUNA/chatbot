import React from 'react';
//外部ファイルdataset使えるようにしたい。from以下は相対パス。
import defaultDataset from './dataset';
import './assets/styles/style.css';
//index.jsの中で宣言されているAnswersList
import {AnswersList} from './components/index';

//function App()→クラスコンポーネントに変更するstateとライフサイクル使いたいため。
//クラスのため直接exportする。
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //わかりやすいように並べる※ここではアルファベット順
      answers: [],
      chats: [],
      //initしたときに下記のdataset初期化したとき
      currentId: "init",
      //実際にデータベースと接続してデータセットはまだせずローカル。dataset.jsに行く
      dataset: defaultDataset,
      open:false
    }
  }
  //初期のデータセット
  //initAnswer = () => {
  //  //デフォルトのデータカレントIDのアンサーズをとりたい。データセットのinitを//まずとりたい
  //  const initDataset = this.state.dataset[this.state.currentId];
  //  const initAnswers = initDataset.answers;
  //  //最終的には変更したい
  //  this.setState({
  //    answers:initAnswers
  //  })
  //}
//render()後に一度だけ呼ばれる関数。一度目のrender終わったとに副作用働く
//最初のrender走った状態だとanswersは初期の空っぽの状態以下のターンで
 // componentDidMount() {
 //   //datasetの値に書き換わる
 // //  this.initAnswers()
 // }
  //クラスコンポーネントの為return～始めるのではなく前にrender～
  render(){
    return (
      <section className="c-section">
        <div className="c-box">
          {/* Answer.jsxで受け取れる
           {defaultDataset}
          <AnswersList answers={this.state.answers} />*/}
          <AnswersList/>
        </div>
      </section>
    );
  }
}

//直接export上でする
//export default App;
