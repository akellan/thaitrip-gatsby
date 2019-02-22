import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

export const appTheme: Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h3: { fontWeight: 300 },
    h1: { fontWeight: 400, fontSize: "4rem" }
  }
});
