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
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    //selectAnswerを汎用的にしたいため条件分岐作成
    switch (true) {
      case (nextQuestionId === "init"):
        break;
      //defaultはinit以外の時には以下処理するといった意味
      default:
        break;
    }
  }


  //初期のデータセット answersの連想配列にdatasetを入れたいため。
  initAnswer = () => {
    //デフォルトのデータセットは連想配列のためそのdataset.jsのinitをまずとりたい
    const initDataset = this.state.dataset[this.state.currentId];
    const initAnswers = initDataset.answers;
    //最終的には以下でanswersの中身を変更したい
    this.setState({ answers: initAnswers });
  }
  //Chatsのデータ受け渡し
  initChats = () => {
    //デフォルトのデータセットは連想配列のためそのdataset.jsのinitをまずとりたい
    //initDatasetはdataset.jsの"init"のanswers～question迄を指す。
    const initDataset = this.state.dataset[this.state.currentId];
    const chat = {
      text: initDataset.question,
      type: 'question'
    }

    //上記で追加すべきchatは取得できたため、更新する為下記追加。下記は現在のchats
    const chats = this.state.chats;
    //空のところに連想配列をプッシュしている→setStateされる※Reactではstate変えるには必ずsetStateしないといけない。プッシュは連想配列に追加するコマンド
    chats.push(chat)

    this.setState({
      chats:chats
    })
  }

//コンポーネントが初期化して次のrenderが走るときに何かしら副作用のある処理したいとき
//最初のrender走った時はまだ初期の空の状態。最初のrenderが終わって以下のターンになった時に実行される→データセットのinitの部分に書き換わる→再度renderが走ってデータが表示できるようになる
  componentDidMount() {
    //最初のrender後stateがここでやっとChatsコンポーネントに受け渡される。
    this.initChats()
    //datasetの値に書き換わる
    this.initAnswer()
  }

  //クラスコンポーネントの為return～始めるのではなく前にrender～
  render(){
    return (
      <section className="c-section">
        <div className="c-box">
          {/* Answer.jsxで受け取れる。下OK 初期のanswersは空の配列だがanswersに連想配列が入ったらAnswerListのpropsで受け取れるようになる*/}
          <Chats chats={ this.state.chats }/>
          <AnswersList answers={this.state.answers} />
        </div>
      </section>
    );
  }
}

//直接export上でする
//export default App;
