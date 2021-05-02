//問い合わせフォームのメイン：クラスコンポーネントにする
//nextIDがcontactの時にこのモーダルを表示させるようにする。
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';
export default class FormDialog extends React.Component{
  //functionalコンポーネントの書き方になっていてstate持たせたいとき以下の書き方
  constructor(props) {
    super(props);
    //HTMLのようにinputに入れればいいということではなくてstateを持って管理をしなければならない
    this.state = {
      name: "",
      email: "",
      description:""
    }

    //bindしてあげる
    this.inputName = this.inputName.bind(this)
    this.inputEmail = this.inputEmail.bind(this)
    this.inputDescription = this.inputDescription.bind(this)
  }

  //上記stateを管理するfunctionの作成。onChangeイベントを管理する。変更があった対象をイベントという引数で受け取ってイベント.target.valueにしたら受け取れる
  inputName = (event) => {
    // console.log(event.target.value); 入力している物がリアルタイムで反映（変更）される
    // nameで管理されている項目に入力されたら随時更新されるようになる
    this.setState({name:event.target.value})
  }

  inputEmail = (event) => {
    // nameで管理されている項目に入力されたら随時更新されるようになる
    this.setState({email:event.target.value})
  }

  inputDescription = (event) => {
    // nameで管理されている項目に入力されたら随時更新されるようになる
    this.setState({description:event.target.value})
  }

  submitForm = () => {
    const name = this.state.name
    const email = this.state.email
    const description = this.state.description
    // バリデーションを本来は入れるべき
    // 以下はスラックに通知を入れる内容
    const payload = {
      // JSONで渡す 何を渡すのか↓ 実際表示させる内容
      text: 'お問い合わせがありました\n' +
        'お名前：' + name + '\n' +
        'Email：' + email + '\n' +
        'お問い合わせ内容：\n' + description
    };

    const url = "https://hooks.slack.com/services/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"
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(() => {
      alert('送信が完了しました。追ってご連絡します☻');
      // 送信完了したらまた問い合わせ項目入力できるように初期化する
      this.setState({
        name: "",
        email: "",
        description:"",
      })
      // 問い合わせしただけだとモーダルが閉じられない為
      return this.props.handleClose()
    })
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
        {/* もともとはアラートだったためこちらにテキストを入れる */}
        <DialogContent>
          {/* multilineは複数行にするときに記載。今回は1行でいい為false */}
          <TextInput
            label={ "お名前（必須）" } multiline={ false } rows={1}
            value={this.state.name} type={"text"} onChange={this.inputName}
          />
          <TextInput
            label={ "メールアドレス" } multiline={ false } rows={1}
            value={this.state.email} type={"email"} onChange={this.inputEmail}
          />
          <TextInput
            label={ "お問い合わせ内容" } multiline={ true } rows={5}
            value={this.state.description} type={"text"} onChange={this.inputDescription}
          />
          {/* 現在のnameを渡して上げる */}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          {/* <Button onClick={this.props.handleClose} color="primary" autoFocus>ただダイアログを閉じているだけ */}
          <Button onClick={this.submitForm}>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
