import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Popover, { PopoverProps } from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import { SvgIconComponent } from "@material-ui/icons";

import { MuiStyles } from "interfaces";

const styles = () =>
    createStyles({
        menuItemWrapper: {
            display: "flex",
            alignItems: "center",
            padding: "5px 0",
        },
        menuItemIcon: {
            marginRight: 12,
        },
    });

type MenuItemProps = {
    title: string;
    icon?: SvgIconComponent;
    onClick?: React.MouseEventHandler;
};

type MenuProps = MuiStyles &
    PopoverProps & {
        anchorEl: PopoverProps["anchorEl"];
        onClose: PopoverProps["onClose"];
        items: MenuItemProps[];
    };

function Menu(props: MenuProps) {
    const { classes, items, ...popoverProps } = props;

    return (
        <Popover {...popoverProps}>
            {items.length > 0 &&
                items.map(({ title, icon: Icon, onClick }, index) => (
                    <MenuItem key={title} divider={index !== items.length - 1} onClick={onClick}>
                        <div className={classes.menuItemWrapper}>
                            {Icon ? <Icon className={classes.menuItemIcon} /> : null}
                            {title}
                        </div>
                    </MenuItem>
                ))}
        </Popover>
    );
}

export default withStyles(styles)(Menu);
