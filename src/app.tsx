import {MetaProvider, Title} from "@solidjs/meta";
import {Router} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start/router";
import {Suspense} from "solid-js";
import "./app.css";
import {createTheme, ThemeProvider} from "@suid/material";

const theme = createTheme({
    spacing: 4,
    components: {
        MuiButton: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiFilledInput: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiFormControl: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiFormHelperText: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiIconButton: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiInputBase: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiInputLabel: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiListItem: {
            defaultProps: {
                dense: true,
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiFab: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTable: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTextField: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiToolbar: {
            defaultProps: {
                variant: 'dense',
            },
        },
    },
});

export default function App() {
    return (
        <Router
            root={props => (
                <MetaProvider>
                    <ThemeProvider theme={theme}>
                        <Suspense>{props.children}</Suspense>
                    </ThemeProvider>
                </MetaProvider>
            )}
        >
            <FileRoutes/>
        </Router>
    );
}
