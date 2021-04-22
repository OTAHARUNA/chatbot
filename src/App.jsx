import React from 'react';
//外部ファイルdataset使えるようにしたい。from以下は相対パス。
import defaultDataset from './dataset';
import './assets/styles/style.css';
//index.jsの中で宣言されているAnswersList,Chats→エントリポイント使っていたらこのようにまとめられる！
import {AnswersList,Chats} from './components/index';

//function App()→クラスコンポーネントに変更するstateとライフサイクル使いたいため。
//クラスのため直接exportする。
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //わかりやすいように並べる※ここではアルファベット順
      //初期の状態は空。
      answers: [],
      chats: [],
      //initしたときに下記のdataset初期化したとき
      currentId: "init",
      //実際にデータベースと接続してデータセットはまだせずローカル。dataset.jsに行く
      dataset: defaultDataset,
      open:false
    }
    //bindされたコールバック関数にできる
    this.selectAnswer = this.selectAnswer.bind(this)
  }
  //回答だけ表示になる為、次のQuestionも表示できるようにする為、下記とselectAnswer記載
  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      //次のquestionを見る為に例）"job＿offer選択されたならそちらのquestion表示。
      text: this.state.dataset[nextQuestionId].question,
      type:'question'
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }
//以下selectAnswerは、Answer.jsxで使いたい。
  selectAnswer = (selectedAnswer, nextQuestionId) => {
    //selectAnswerを汎用的にしたいため条件分岐作成
    switch (true) {
      case (nextQuestionId === "init"):
        this.displayNextQuestion(nextQuestionId)
        break;
      //defaultはinit以外の時には以下処理するといった意味
      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: 'answers'
        })
        this.setState({
          chats:chats
        })

        //次への質問に対しての処理
        this.displayNextQuestion(nextQuestionId)
        break;
    }
  }


//コンポーネントが初期化して次のrenderが走るときに何かしら副作用のある処理したいとき
//最初のrender走った時はまだ初期の空の状態。最初のrenderが終わって以下のターンになった時に実行される→データセットのinitの部分に書き換わる→再度renderが走ってデータが表示できるようになる
  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer,this.state.currentId)
  }


  //クラスコンポーネントの為return～始めるのではなく前にrender～
  render(){
    return (
      <section className="c-section">
        <div className="c-box">
          {/* Answer.jsxで受け取れる。下OK 初期のanswersは空の配列だがanswersに連想配列が入ったらAnswerListのpropsで受け取れるようになる*/}
          <Chats chats={this.state.chats} />
          {/*()がついているとレンダーされるたびに実行されてしまうため外して変数の名前として渡してあげる。 */}
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
        </div>
      </section>
    );
  }
}

//直接export上でする
//export default App;
