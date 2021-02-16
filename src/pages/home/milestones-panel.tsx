import React, { useState, useEffect } from "react";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Skeleton from "@material-ui/lab/Skeleton";
import * as Yup from "yup";
import SvgIcon from "@material-ui/core/SvgIcon";
import { mdiFlagPlus, mdiFlag } from "@mdi/js";
import { grey } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import Panel, { PanelTitle, PanelSubtitle, PanelButton } from "src/components/general/Panel";
import { Get, Post } from "src/utils/helpers/api";
import { MilestoneModel } from "server/db/milestone/model";
import FormDialog from "src/components/dialogs/FormDialog";
import { FormBaseOnSubmit } from "src/components/forms/FormBase";
import { FormBase, TextField, DateTimeField } from "src/components/forms";
import { formatTime, areSameDates, sortObjectArrayByDate } from "src/utils/helpers/dates";

const styles = createStyles({
    root: {
        justifyContent: "flex-start !important",
        padding: "20px 0 0 !important",
    },
    milestonesWrapper: {
        width: "100%",
        height: "100%",
        padding: "10px 20px 3px 105px",
        overflowX: "auto",
        overflowY: "hidden",
        position: "relative",
        display: "flex",
    },
    addMilestoneButton: {
        marginLeft: 10,
    },
    title: {
        display: "flex",
        alignItems: "center",
    },
    noMilestonesText: {
        width: "100%",
        textAlign: "center",
        marginTop: 15,
    },
    milestonesTimeline: {
        borderBottom: `8px solid ${grey[600]}`,
        position: "absolute",
        bottom: 45,
        left: 0,
        right: 0,
    },
    milestone: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "flex-end",
        marginLeft: 50,
        marginRight: 125,
        alignItems: "center",
    },
    milestoneCircle: {
        borderRadius: "50%",
        backgroundColor: grey[600],
        width: 24,
        height: 24,
        position: "absolute",
        bottom: 25,
    },
    milestoneLine: {
        borderLeft: `4px double ${grey[600]}`,
        position: "absolute",
        bottom: 30,
        height: "65%",
        //marginLeft: 11,
    },
    milestoneFlagDiv: {
        marginBottom: 65,
        position: "absolute",
        marginLeft: 151,
        width: 175,
        height: "60%",
    },
    milestoneFlag: {
        fontSize: 48,
    },
    milestoneTitle: {
        paddingLeft: 30,
        paddingRight: 10,
        marginTop: "-5%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
        wordBreak: "break-word",
    },
    milestoneTime: {
        position: "absolute",
    },
    date: {
        marginRight: 165,
        bottom: 27,
        borderRadius: 3,
        backgroundColor: grey[600],
        padding: "0 5px",
        width: 50,
        textAlign: "center",
    },
});

type AddMilestoneFormProps = { onClose: () => void; updateMilestones: (newMilestone: MilestoneModel) => void };

function AddMilestoneForm({ onClose, updateMilestones }: AddMilestoneFormProps) {
    const onSubmit: FormBaseOnSubmit = async (formData) => {
        const res = await Post("milestone", formData);

        if (res.ok) {
            const newMilestone: MilestoneModel = await res.json();
            updateMilestones(newMilestone);
        } else {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        }
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("Required").max(50, "Keep it short!"),
        achievedOn: Yup.date().required("Required"),
    });

    const initialValues = { achievedOn: new Date().toISOString(), title: "" };

    return (
        <FormBase validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues} onClose={onClose}>
            {() => (
                <>
                    <TextField fieldKey="title" />
                    <DateTimeField fieldKey="achievedOn" label="Date & Time Achieved" datePickerProps={{ disableFuture: true }} />
                </>
            )}
        </FormBase>
    );
}

type MilestonesPanelProps = WithStyles<typeof styles> & { className: string };

function MilestonesPanel({ classes, className }: MilestonesPanelProps) {
    const [milestones, setMilestones] = useState<MilestoneModel[] | null>(null);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);

    useEffect(() => {
        fetchMilestones();
    }, []);

    async function fetchMilestones() {
        const res = await Get("milestone");
        const data = await res.json();
        setMilestones(data);
    }

    function updateMilestones(newMilestone: MilestoneModel) {
        setMilestones((prevState) => [...(prevState || []), newMilestone]);
    }

    return (
        <>
            <Panel className={clsx(className, classes.root)}>
                <PanelTitle className={classes.title}>
                    Campaign Milestones
                    <PanelButton variant="outlined" size="small" className={classes.addMilestoneButton} onClick={() => setAddPopupOpen(true)}>
                        <SvgIcon>
                            <path d={mdiFlagPlus} />
                        </SvgIcon>
                        Add Milestone
                    </PanelButton>
                </PanelTitle>
                {milestones ? (
                    milestones.length > 0 ? (
                        <>
                            <div className={classes.milestonesTimeline} />
                            <div className={classes.milestonesWrapper}>
                                {sortObjectArrayByDate(milestones, "achievedOn").map((milestone, index) => (
                                    <div className={classes.milestone} key={milestone.achievedOn}>
                                        {!areSameDates(milestone.achievedOn, milestones[index - 1]?.achievedOn || "") && (
                                            <Typography variant="caption" className={clsx(classes.milestoneTime, classes.date)}>
                                                {moment(milestone.achievedOn).format("MMM D")}
                                            </Typography>
                                        )}
                                        <div className={classes.milestoneLine} />
                                        <div className={classes.milestoneCircle} />
                                        <div className={classes.milestoneFlagDiv}>
                                            <SvgIcon className={classes.milestoneFlag}>
                                                <path d={mdiFlag} />
                                            </SvgIcon>
                                            {/* <Tooltip arrow title={milestone.title} placement="bottom"> */}
                                            <Typography variant="body2" className={classes.milestoneTitle}>
                                                {milestone.title}
                                            </Typography>
                                        </div>
                                        <Typography variant="caption" color="textSecondary" className={classes.milestoneTime}>
                                            {formatTime(milestone.achievedOn)}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <PanelSubtitle className={classes.noMilestonesText} noUnderline>
                            (No milestones to show)
                        </PanelSubtitle>
                    )
                ) : (
                    <Skeleton height="100px" width="85%" />
                )}
            </Panel>
            <FormDialog title="Add Milestone" open={isAddPopupOpen} onClose={() => setAddPopupOpen(false)}>
                <AddMilestoneForm updateMilestones={updateMilestones} onClose={() => setAddPopupOpen(false)} />
            </FormDialog>
        </>
    );
}

export default withStyles(styles)(MilestonesPanel);
