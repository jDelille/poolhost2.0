
const newLocal = "development";
const newLocal_1 = "production";
export default process.env.NODE_ENV === newLocal
  ? "http://localhost:3333"
  : process.env.NODE_ENV === newLocal_1 &&
    "https://code-saver-app.herokuapp.com";