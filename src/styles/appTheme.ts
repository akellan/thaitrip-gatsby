import { createMuiTheme, Theme } from "@material-ui/core/styles";

export const appTheme: Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h3: { fontWeight: 300 },
    h1: { fontWeight: 400, fontSize: "4rem" }
  },
  palette: {
    text: {
      secondary: "#1ac308"
    }
  }
});
