import React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  serverAnswer,
  valueOptions,
  flowObject,
  stateInterface,
} from '../interfaces/Chat';

// required for ssr-passed-values
declare const window: any;

// Styles
const Root = styled('div')`
  width: 100%;
  height: calc(100vh - 70px);
`;
const ChatWindow = styled('div')`
  width: 100%;
  overflow: scroll;
  height: 100%;
  background-color: #FFFFDD;
`;
const InputArea = styled('form')`
  display: flex;
  flex-direction: row;
`;

class Chat extends React.Component<any, stateInterface> {
  constructor(props: any) {
    super(props);
    this.state = {
      flow: typeof window == 'undefined' ? [] : window.serversideVars.flow,
      lines: [],
      currentId: 100,
      userText: '',
      finished: false,
      serverAnswers: [],
    }
  }

  componentDidMount() {
    if (!this.state.flow) return;
    this.setState({lines: [
      'BOT: ' + this.state?.flow?.find(
        (x: any) => x?.id == this.state?.currentId
      )?.text
    ]});
  }

  handleSubmit() {
    let curLines = JSON.parse(JSON.stringify(this.state.lines));
    curLines.push('USER: ' + this.state.userText);
    let currentObj = this.state?.flow?.find(
      (x:any) => x?.id == this.state?.currentId
    );
    let match = currentObj?.valueOptions?.find(
      (x:any) => String(x.text).toLowerCase()
      ==
      String(this.state.userText).toLowerCase()
    );
    if (match) {
      let serverAnswers = JSON.parse(JSON.stringify(this.state.serverAnswers));
      serverAnswers.push({
        name: currentObj?.name,
        value: match.value,
      });
      this.setState({serverAnswers: serverAnswers});
      if (match.nextId) {
        curLines.push('BOT: ' + this.state?.flow?.find(
          (x:any) => x?.id == match?.nextId
        )?.text);
        this.setState({lines: curLines});
        this.setState({
          lines: curLines,
          currentId: match.nextId,
        });
      }
      else {
        fetch('https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state.serverAnswers),
        });
        this.setState({
          lines: [ 'Herzlichen Dank für Ihre Angaben.' ],
          finished: true,
        });
      }
    }
    else {
      curLines.push('BOT: Konnte Antwort nicht bearbeiten. Bitte erneut eingeben.');
      this.setState({lines: curLines});
    }
    this.setState({userText: ''});
  }

  render() {
    return (
      <Root>
        <ChatWindow>
          {this.state.lines.map((line:string) => <div>{line}</div>)}
        </ChatWindow>
        { this.state.finished == false && <InputArea onSubmit={(event:any) => {
          event.preventDefault();
          this.handleSubmit();
        }}>
          <TextField
            sx={{
              flexBasis: '100%'
            }}
            value={this.state.userText}
            onChange={(event: any) => {
              this.setState({userText: event.target.value})
            }}
          />
          <Button type="submit" variant="contained" sx={{
              marginLeft: '.5rem'
            }}
          >
            Abschicken
          </Button>
        </InputArea> }
      </Root>
    );
  }
}
export default Chat;
