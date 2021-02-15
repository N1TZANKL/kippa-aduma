import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Popover, { PopoverProps } from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import { SvgIconComponent } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

import { MuiStyles } from "src/utils/interfaces";

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
        smallMenuItem: {
            padding: "2px 10px",
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
        size?: "regular" | "small";
    };

function Menu({ classes, items, size = "regular", ...popoverProps }: MenuProps) {
    return (
        <Popover {...popoverProps}>
            {items.length > 0 &&
                items.map(({ title, icon: Icon, onClick }, index) => (
                    <MenuItem
                        key={title}
                        divider={index !== items.length - 1}
                        onClick={onClick}
                        className={clsx(size === "small" && classes.smallMenuItem)}
                    >
                        <div className={classes.menuItemWrapper}>
                            {Icon ? <Icon className={classes.menuItemIcon} /> : null}
                            <Typography variant={size === "small" ? "caption" : "body1"}>{title}</Typography>
                        </div>
                    </MenuItem>
                ))}
        </Popover>
    );
}

export default withStyles(styles)(Menu);
