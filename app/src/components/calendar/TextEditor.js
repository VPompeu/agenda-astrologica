import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import RichTextEditor, { getTextAlignClassName, getTextAlignBlockMetadata, getTextAlignStyles } from "react-rte";
import "../../styles/CalendarStyle.css";
import SessionStore from "../../stores/SessionStore";
import { Grid } from "@mui/material";

const TextEditor = ({ onChange, defaultValue }) => {

    const [theme, setTheme] = useState(SessionStore.getTheme());
    const [value, setValue] = useState(null);
    const ref = useRef();
    const isListenerAdded = useRef(false); // Novo useRef para rastrear se o listener foi adicionado

    useEffect(() => {
        if (!isListenerAdded.current) {
            bind();
            isListenerAdded.current = true; // Marcar o listener como adicionado
        }

        // set the state value using the package available method
        if (defaultValue.length > 0) {
            setValue(
                RichTextEditor.createValueFromString(
                    defaultValue,
                    'html',
                    {
                        customBlockFn: getTextAlignBlockMetadata,
                    }
                )
            );
        } else {
            setValue(RichTextEditor.createEmptyValue());
        }

        return clear;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(theme);
        setTimeout(() => {
            updateEditorTheme();
        }, 100);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    const bind = () => {
        SessionStore.addListener("theme_change", toggleTheme);
    };

    const clear = () => {
        SessionStore.removeListener("theme_change", toggleTheme);
    };

    const toggleTheme = () => {
        SessionStore.setTheme();
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const updateEditorTheme = () => {
        const container = ref.current;
        if (container) {
            const editorRoot = container.querySelector('.RichTextEditor__root___2QXK-');
            if (editorRoot) {
                if (theme === 'dark') {
                    editorRoot.style.backgroundColor = '#121212';
                    editorRoot.style.color = 'white';
                } else {
                    editorRoot.style.backgroundColor = 'white';
                    editorRoot.style.color = 'black';
                }
            }
        }
    };

    const handleOnChange = (value) => {
        setValue(value);
        if (onChange) {
            onChange(value.toString(
                'html',
                {
                    blockStyleFn: getTextAlignStyles,
                }));
        }
    };

    if (!value) { return null; }

    return (
        <Grid container ref={ref} style={{ width: '100%', margin: 0 }} alignItems="center" justifyContent="center">
            <Grid item xs={12} style={{ width: '98%' }} textAlign="center">
                <RichTextEditor
                    placeholder={"Digite sua anotação diária!"}
                    className={`rte-editor ${theme}`}
                    blockStyleFn={getTextAlignClassName}
                    value={value}
                    onChange={handleOnChange}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                />
            </Grid>
        </Grid>
    );
};

TextEditor.propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};

export default TextEditor;
