import { createInstance } from "./index.js";

const instance = createInstance();

function chattrain (trainform, success, fail) {
  instance
  .get(`chatbot/train/`, trainform)
  .then(success)
  .catch(fail);
}

function chatanswer (question, success, fail) {
  instance
    .get(`chatbot/answer/${question}/`)
    .then(success)
    .catch(fail);
}

export { chattrain, chatanswer }