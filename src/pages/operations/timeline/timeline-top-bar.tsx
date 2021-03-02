import React, { useState } from "react";
import dynamic from "next/dynamic";
import { withStyles, createStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";

import { PanelButton, PanelTitle } from "src/components/general/Panel";
import { spaceChildren } from "src/utils/helpers/css";
import { MuiStyles, OperationPost, SetState } from "src/utils/interfaces";
import FormDialog from "src/components/dialogs/FormDialog";
import SearchBox from "src/components/general/SearchBox";

const CreatePostForm = dynamic(() => import("../create-post-form"), {
    ssr: false,
});

const styles = createStyles({
    flexCenter: {
        display: "flex",
        alignItems: "center",
    },
    titleRoot: {
        justifyContent: "space-between",
        padding: "0 15px",
        height: 50,
    },
    actionsRoot: {
        ...spaceChildren("horizontally", 10),
    },
    searchOpenRight: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    searchOpenLeft: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        padding: "2px 5px 2px 10px",
        minWidth: "fit-content",
    },
});

type TimelineTopBarProps = MuiStyles & { onSearch: SetState<string>; searchString?: string; addPost: (newPost: OperationPost) => void };
function TimelineTopBar({ classes, onSearch, searchString = "", addPost }: TimelineTopBarProps) {
    const [formOpen, setFormOpen] = useState(false);

    const toggleFormOpen = () => setFormOpen((prev) => !prev);

    return (
        <PanelTitle className={clsx(classes.titleRoot, classes.flexCenter)} withBackground>
            <span>Operation Feed</span>
            <div className={clsx(classes.flexCenter, classes.actionsRoot)}>
                <SearchBox
                    placeholder="Search posts by text, type..."
                    value={searchString}
                    onSearchStringChange={onSearch}
                    padding="2px 10px"
                    width={250}
                />
                <PanelButton color="secondary" onClick={toggleFormOpen}>
                    <EditIcon />
                    Create
                </PanelButton>
                <FormDialog title="Create Post" open={formOpen} onClose={toggleFormOpen}>
                    <CreatePostForm onSubmitSuccess={addPost} onClose={toggleFormOpen} />
                </FormDialog>
            </div>
        </PanelTitle>
    );
}

export default withStyles(styles)(TimelineTopBar);
