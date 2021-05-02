import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
// adminを初期化する必要がある為
admin.initializeApp();
// adminを権限持っている状態で設定したいとき下記。使うときはこちらを何回も繰り返すため先に定数に入れてメモリを確保するとスムーズ兼リソースも削減
const db = admin.firestore();

const sendResponse = (response: functions.Response, statusCode: number, body: any)=> {
  response.send({
    statusCode,
    body: JSON.stringify(body)
  })
}

// exportしないと外部で使えない。 コールバック関数・非同期処理（アシンク）
export const addDataset = functions.https.onRequest(async (req: any, res: any) => {
  //APIの中身を書く
  if (req.method !== 'POST') {
    // POSTじゃなかったらエラーを返す
    sendResponse(res, 405, {error:'Invalid Request!'})
  } else {
    // dataset.jsonの中身をそのまま渡すことになりrequestのbodyとして渡される事になる
    const dataset = req.body
    // JSON形式はオブジェクトのためそのまま配列として渡すのではなくまずkeyを取り出してfor文で繰り返す。for取り出したらvalueも必要になる
    for (const key of Object.keys(dataset)){
      const data = dataset[key]
      // 非同期処理をする為に逐次実行する為に以下記載
      // questionsというコレクションを作る。コレクションズといったデータモデルがあってそこに紐づくデータを入れていく
      await db.collection('questions').doc(key).set(data)
    }
    sendResponse(res, 200, { message: 'Successfully added dataset!' })
    // これでいったんAPIの作成は以上となる
  }

})
