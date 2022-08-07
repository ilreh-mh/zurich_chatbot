import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
const InputArea = styled('div')`
  display: flex;
  flex-direction: row;
`;

const Chat = () => {
  return (
    <Root>
      <ChatWindow>
      </ChatWindow>
      <InputArea>
        <TextField sx={{
          flexBasis: '100%'
        }} />
        <Button variant="contained" sx={{
          marginLeft: '.5rem'
        }}
        >
          Abschicken
        </Button>
      </InputArea>
    </Root>
  );
}

export default Chat;
