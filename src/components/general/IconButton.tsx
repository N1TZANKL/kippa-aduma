import React from "react";
import { style, compose } from "@material-ui/system";
import styled from "styled-components";
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from "@material-ui/core/IconButton";
import { SvgIconComponent } from "@material-ui/icons";

const fontSizeStyle = style({
    prop: "fontSize",
    cssProperty: "fontSize",
});

const paddingStyle = style({
    prop: "p",
    cssProperty: "padding",
});

const styles = compose(fontSizeStyle, paddingStyle);

const StyledIconButton = styled(MuiIconButton)`
    ${styles}
`;

type IconButtonProps = Omit<MuiIconButtonProps, "children"> & { fontSize?: number | string; p?: number | string; icon: SvgIconComponent };
export default function IconButton({ fontSize, icon: Icon, p = 4, ...otherProps }: IconButtonProps): JSX.Element {
    return (
        <StyledIconButton fontSize={fontSize} p={p} {...otherProps}>
            <Icon fontSize={fontSize ? "inherit" : "default"} />
        </StyledIconButton>
    );
}
