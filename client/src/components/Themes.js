import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  
};

export const darkTheme = {
 
};

export const GlobalStyles = createGlobalStyle`
 body {
  background-color: ${(props) => props.theme.body}
 }
 .header {
  background-color: ${(props) => props.theme.navbar}
 }
 `