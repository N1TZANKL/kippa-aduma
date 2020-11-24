import React, { Dispatch, SetStateAction } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";

import { MuiStyles, OperationPost } from "interfaces";
import Panel, { PanelSubtitle, PanelTitle } from "src/components/general/Panel";
import Select from "src/components/general/Select";
import Checkbox from "src/components/general/Checkbox";
import { OperationPostTypes } from "db/post/model";
import { firstLetterUppercase } from "utils/helpers/strings";
import Radio from "src/components/general/Radio";
import { sortObjectArrayByDate } from "utils/helpers/dates";

import { PostTypeToColor } from "./timeline/post/post-type-indicator";

const styles = () =>
    createStyles({
        sortSelect: {
            margin: "10px 0 20px",
        },
        checkboxSectionWrapper: {
            marginLeft: 28,
            display: "flex",
            flexDirection: "column",
        },
        postTypeCheckboxColor: {
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "transparent",
            marginRight: 5,
            display: "inline-block",
        },
    });

export enum SortOptions {
    WrittenDesc = "Date Written: Newest First",
    WrittenAsc = "Date Written: Oldest First",
    HappenedDesc = "Date Happened: Newest First",
    HappenedAsc = "Date Happened: Oldest First",
}

export const SortOptionsToFunction: Record<SortOptions, (posts: OperationPost[]) => OperationPost[]> = {
    [SortOptions.WrittenAsc]: (posts) => sortObjectArrayByDate(posts, "writtenAt"),
    [SortOptions.HappenedAsc]: (posts) => sortObjectArrayByDate(posts, "happenedAt"),
    [SortOptions.WrittenDesc]: (posts) => sortObjectArrayByDate(posts, "writtenAt", "desc"),
    [SortOptions.HappenedDesc]: (posts) => sortObjectArrayByDate(posts, "happenedAt", "desc"),
};

export enum PostTypeFilterRadioOptions {
    ALL = "all",
    CUSTOM = "custom",
}

type SortFilterPanelProps = MuiStyles & {
    className: string;
    sortState: [SortOptions, Dispatch<SetStateAction<SortOptions>>];
    postTypeFiltersState: [OperationPostTypes[] | null, Dispatch<SetStateAction<OperationPostTypes[] | null>>];
};
function SortFilterPanel(props: SortFilterPanelProps) {
    const { classes, className, sortState, postTypeFiltersState } = props;
    const [currentSort, setSort] = sortState;
    const [postTypeFilters, setPostTypeFilters] = postTypeFiltersState;

    function onChangePostTypeFilterRadio(e: React.ChangeEvent<HTMLInputElement>) {
        setPostTypeFilters(JSON.parse(e.target.value));
    }

    function togglePostTypeFilter(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;

        // should not happen, but just so TS will shut up
        if (!postTypeFilters) return;

        if (postTypeFilters.includes(value as OperationPostTypes)) setPostTypeFilters(postTypeFilters.filter((p) => p !== value));
        else setPostTypeFilters([...postTypeFilters, value as OperationPostTypes]);
    }

    return (
        <Panel className={className}>
            <PanelTitle>Sort</PanelTitle>
            <Select
                className={classes.sortSelect}
                value={currentSort}
                selectionList={Object.values(SortOptions).map((s: string) => ({ label: s, value: s }))}
                variant="filled"
                onChange={(e) => setSort(e.target.value as SortOptions)}
            />
            <PanelTitle>Filter</PanelTitle>
            <PanelSubtitle>By Post Type</PanelSubtitle>
            <Radio
                value={"null"}
                checked={!postTypeFilters}
                label={firstLetterUppercase(PostTypeFilterRadioOptions.ALL)}
                onChange={onChangePostTypeFilterRadio}
            />
            <Radio
                value={JSON.stringify(Object.values(OperationPostTypes))}
                checked={Array.isArray(postTypeFilters)}
                label={firstLetterUppercase(PostTypeFilterRadioOptions.CUSTOM)}
                onChange={onChangePostTypeFilterRadio}
            />
            <div className={classes.checkboxSectionWrapper}>
                {Object.values(OperationPostTypes).map((postType: OperationPostTypes) => (
                    <Checkbox
                        value={postType}
                        checked={!postTypeFilters || postTypeFilters.includes(postType)}
                        disabled={!postTypeFilters}
                        key={postType}
                        label={
                            <span>
                                <div className={classes.postTypeCheckboxColor} style={{ backgroundColor: PostTypeToColor[postType] }} />
                                <i>{firstLetterUppercase(postType)}</i>
                            </span>
                        }
                        onChange={togglePostTypeFilter}
                    />
                ))}
            </div>
            <PanelSubtitle>By Post Author</PanelSubtitle>
            To be implemented!
            <PanelSubtitle>By Date Range</PanelSubtitle>
            To be implemented!
        </Panel>
    );
}

export default withStyles(styles)(SortFilterPanel);
