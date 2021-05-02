import React,{useState,useEffect,useCallback} from 'react';
//外部ファイルdataset使えるようにしたい。from以下は相対パス。
// import defaultDataset from './dataset';
import './assets/styles/style.css';
//index.jsの中で宣言されているAnswersList,Chats→エントリポイント使っていたらこのようにまとめられる！
import { AnswersList, Chats, FormDialog } from './components/index';
import {db} from './firebase/index';

//function App()→クラスコンポーネントに変更するstateとライフサイクル使いたいため。
//クラスのため直接exportする。
const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  //回答だけ表示になる為、次のQuestionも表示できるようにする為、下記とselectAnswer記載
  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    })
    //次の回答更新
    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
  }


  //以下selectAnswerは、Answer.jsxで使いたい。
  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    //selectAnswerを汎用的にしたいため条件分岐作成
    switch (true) {
      //nextIdがhttpsから始まるものか判定する必要がある。次の質問に飛ばせばいいのか/外部ページに飛ばせばいいのか。
      case (nextQuestionId === "init"):
        setTimeout(() => displayNextQuestion(nextQuestionId,dataset[nextQuestionId]), 500);
        break;

      case (nextQuestionId === "contact"):
        handleClickOpen();
        break;

      //先頭が以下。＊は何でも。test(判定する文字列)→nextIdがhttpsから始まるものかと確認
      case (/^https:*/.test(nextQuestionId)):
        //リンクのaタグのDOM要素をを作る。
        const a = document.createElement('a');
        //リンク先にnextQuestionIDを入れる。
        a.href = nextQuestionId;
        //ブラウザの別タブでひらく為に以下かく。そのままだとそのページで飛んでしまう。
        a.target = '_blank';
        a.click();
        break;
      //defaultはinit以外の時には以下処理するといった意味
      default:
        //今回のこの値が新しく追加される
        addChats({
          text: selectedAnswer,
          type: 'answer'
        })

        //次の質問がくるまで少し時間をおいてあげる。チャット遅延機能。こちらのほうが応答している感。
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 1000);
        break;

      //次への質問に対しての処理
      //this.displayNextQuestion(nextQuestionId)
      //break;
    }
  }
  //chatはオブジェクト型の値を渡されると仮定
  const addChats = (chat) => {
    //配列やオブジェクト扱うときは前回のstateを引数として受け取れる。前回のChatの状態持てる
    setChats(prevChats => {
      //前回のChatに対して今回のChatを追加できる
      return [...prevChats, chat]
    })
  }
  //モーダル ↓特に子コンポーネントに渡していない為useCallback関数は不要
  const handleClickOpen = () => {
    //openのstateをtrue
    setOpen(true)
  };
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);


  //コンポーネントが初期化して次のrenderが走るときに何かしら副作用のある処理したいとき
  //最初のrender走った時はまだ初期の空の状態。最初のrenderが終わって以下のターンになった時に実行される→データセットのinitの部分に書き換わる→再度renderが走ってデータが表示できるようになる
  useEffect(() => {
    // データセットはこちらに書くことが多い。最初のレンダーが終わった時に取得しに行きたい。データベースへの接続が非同期処理になってしまう。非同期処理を待ってから次の処理に進みますよといった形がとれるのが「asyncつき即時関数」
    (async () => {
      const initDataset = {};
      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          //firebase上のコレクション
          const id = doc.id
          // firestore上のドキュメント
          const data = doc.data()
          // answers一覧
          initDataset[id] = data
        })
      })
      // stateの更新は時間がかかる。stateの更新がかかる前に上記にてデータベースから持ってきて質問は一旦表示させる
      setDataset(initDataset)
      // 最初のコメントinitを表示させる箇所
      displayNextQuestion(currentId, initDataset[currentId])
    })()
    // const initAnswer = "";
    // this.selectAnswer(initAnswer,this.state.currentId)
  }, []) //1回だけ実行してほしいため[]を記載
  //以下は毎回毎回実行されてほしい為第二引数には何も表示しない。
  useEffect(() => {
    //Chatsの'scroll-area'から持ってくる
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

  //クラスコンポーネントの為return～始めるのではなく前にrender～
  return (
    <section className="c-section">
      <div className="c-box">
        {/* Answer.jsxで受け取れる。下OK 初期のanswersは空の配列だがanswersに連想配列が入ったらAnswerListのpropsで受け取れるようになる*/}
        <Chats chats={chats} />
        {/*()がついているとレンダーされるたびに実行されてしまうため外して変数の名前として渡してあげる。 */}
        <AnswersList answers={answers} select={selectAnswer} />
        {/*FormDialogにてpropsで管理できるようになる。open={this.props.open} */}
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}

//直接export上でする
export default App
