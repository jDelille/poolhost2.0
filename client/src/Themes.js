import { createGlobalStyle } from "styled-components";

export const lightTheme = {
 BG: "#FFF",
 Accent: "#f1f2f3",
 Text: "#181818",
 Border: "1px solid lightgray"
};

export const darkTheme = {
 BG: "#121212",
 Accent: "#242424",
 Text: "#FFF",
 Border: "1px solid #242424"
};

export const GlobalStyles = createGlobalStyle`
.App,
.hero,
.navbar,
.gamebar
 {
 background-color: ${(props) => props.theme.BG};
 color: ${(props) => props.theme.Text};
};
.box {
 background-color: ${(props) => props.theme.BG};
 border: ${(props) => props.theme.Border};

};

 `