import React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiStyles } from "interfaces";
import Lottie from "react-lottie";
import animationData from "./animation.json";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            pointerEvents: "none",
        },
        text: {
            marginTop: -50,
            color: "rgba(255,255,255,0.35)",
            fontStyle: "italic",
            letterSpacing: 1,
            fontFamily: "monospace",
        },
    });

type NotFoundAnimationProps = MuiStyles & { text?: string };
function NotFoundAnimation({ classes, text }: NotFoundAnimationProps) {
    const options = {
        loop: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <Fade in={true} mountOnEnter unmountOnExit>
            <div>
                <div className={classes.root}>
                    <Lottie options={options} height={300} width={300} />
                </div>
                <Typography variant="h6" className={classes.text} align="center">
                    {text || "No result found to match your request"}
                </Typography>
            </div>
        </Fade>
    );
}

export default withStyles(styles)(NotFoundAnimation);
