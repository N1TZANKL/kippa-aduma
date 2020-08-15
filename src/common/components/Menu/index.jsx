import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";

const styles = (theme) => ({
    menuItemWrapper: {
        display: "flex",
        alignItems: "center",
        padding: "5px 0",
    },
    menuItemIcon: {
        marginRight: 12,
    },
});

function Menu(props) {
    const { classes, items, ...popoverProps } = props;

    return (
        <Popover {...popoverProps}>
            {items.length > 0 &&
                items.map((menuItem, index) => {
                    const Icon = menuItem.icon;
                    return (
                        <MenuItem divider={index !== items.length - 1}>
                            <div className={classes.menuItemWrapper}>
                                {Icon && <Icon className={classes.menuItemIcon} />} {menuItem.title}
                            </div>
                        </MenuItem>
                    );
                })}
        </Popover>
    );
}

Menu.defaultProps = {
    items: [],
};

Menu.propTypes = {
    ...Popover.propTypes,
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired, // [{title: string, icon?: MuiIconComponent}, ....]
};

export default withStyles(styles)(Menu);
