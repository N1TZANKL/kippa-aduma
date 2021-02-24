import React from "react";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Input, { InputProps } from "@material-ui/core/Input";
import Box, { BoxProps } from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";

import { MuiStyles } from "src/utils/interfaces";

const styles = (theme: Theme) =>
    createStyles({
        searchTextField: {
            backgroundColor: theme.constants.appBackgroundHighlight,
            border: "1px solid rgba(255,255,255,0.2)",
            height: 30,
            fontSize: 14,
            borderRadius: 2,
            padding: "2px 10px",
        },
        searchIcon: {
            marginRight: 5,
            fontSize: 20,
        },
    });

type SearchBoxProps = MuiStyles &
    BoxProps & {
        inputProps?: Omit<InputProps, "value" | "onChange" | "placeholder">;
        value?: string;
        onSearchStringChange: (newSearchString: string) => void;
        placeholder?: string;
    };

function SearchBox({ classes, inputProps, value = "", onSearchStringChange, placeholder = "Search anything...", ...boxProps }: SearchBoxProps) {
    return (
        <Box {...boxProps} clone>
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onSearchStringChange(e.target.value)}
                disableUnderline
                autoFocus
                className={classes.searchTextField}
                startAdornment={<SearchIcon className={classes.searchIcon} />}
                {...inputProps}
            />
        </Box>
    );
}

export default withStyles(styles)(SearchBox);
