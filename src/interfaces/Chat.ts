export interface serverAnswer {
  name: string,
  value: any,
}

export interface valueOptions {
  nextId: number | boolean,
  value: number,
  text: string,
}

export interface flowObject {
  id: number,
  name: string,
  text: string,
  uiType: string, 
  valueType: string,
  valueOptions: Array<valueOptions>,
}

export interface stateInterface {
  flow: Array<flowObject>,
  lines: Array<string>,
  currentId: number | boolean,
  userText: string,
  finished: boolean,
  serverAnswers: Array<serverAnswer>,
}
