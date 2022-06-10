import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --primary: #738b8c;
  --primary-light: #b8ddf4;

}
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body{
font-family: 'Roboto', sans-serif;

}

ol ul {
  list-style: none;
  
}
`;
export default GlobalStyles;
