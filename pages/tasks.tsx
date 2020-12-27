import React, { useState } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { resetServerContext } from "react-beautiful-dnd";

import PageLayout from "src/components/layouts/MainLayout";
import { UserSessionObject, withUserSession } from "utils/session";
import { TasksTopBar, TaskBoards } from "src/pages/tasks";
import { Task, MuiStyles } from "src/utils/interfaces";
import { getAllUsers } from "server/db/user/controller";
import { getAllTasks } from "server/db/task/controller";
import TasksContext from "src/pages/tasks/context";

const styles = createStyles({
    root: {
        width: "100%",
        minWidth: 725,
        padding: 15,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        // minHeight: 400,
    },
    panelsWrapper: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        flexGrow: 1,
    },
});

type TasksProps = MuiStyles & { user: UserSessionObject; tasks?: Task[]; users?: UserSessionObject[] };

function Tasks({ classes, user, users = [], tasks = [] }: TasksProps): JSX.Element {
    const [searchString, setSearchString] = useState("");

    const [showOwnTasksOnly, setShowOwnTasks] = useState(false);
    const toggleShowOwnFilter = () => setShowOwnTasks((prevState) => !prevState);

    const [allTasks, setTasks] = useState(tasks);

    const addTask = (newTask: Task) => setTasks((prevState) => [...prevState, newTask]);

    function replaceTask(task: Task) {
        setTasks((prevState) => [...prevState.filter((a) => a.id !== task.id), task]);
    }

    function deleteTask(taskId: string) {
        setTasks((prevState) => prevState.filter((a) => a.id !== taskId));
    }

    const filteredSortedTasks = allTasks
        .filter((task) => {
            // filter by own-tasks filter
            if (showOwnTasksOnly && task.assignee?.username !== user.username) return false;

            // filter by search string
            if (searchString && !Object.values(task).some((p: unknown) => p && typeof p === "string" && p.match(searchString))) return false;

            return true;
        })
        .reverse();

    return (
        <PageLayout noPadding user={user}>
            <div className={classes.root}>
                <TasksContext.Provider value={{ user, users, addTask, replaceTask, deleteTask }}>
                    <TasksTopBar
                        height="45px"
                        searchString={searchString}
                        onSearch={setSearchString}
                        toggleShowOwnFilter={toggleShowOwnFilter}
                        showOwnTasksOnly={showOwnTasksOnly}
                    />
                    <div className={classes.panelsWrapper}>
                        <TaskBoards tasks={filteredSortedTasks} replaceTask={replaceTask} deleteTask={deleteTask} />
                    </div>
                </TasksContext.Provider>
            </div>
        </PageLayout>
    );
}

export default withStyles(styles)(Tasks);

export const getServerSideProps = withUserSession(async () => {
    const props: Omit<TasksProps, "user" | "classes"> = {};

    const allUsersPromise = getAllUsers()
        .then((data) => {
            props.users = data;
        })
        .catch(() => {
            props.users = undefined;
        });

    const allTasksPromise = getAllTasks()
        .then((data) => {
            props.tasks = data;
        })
        .catch(() => {
            props.tasks = undefined;
        });

    await Promise.all([allUsersPromise, allTasksPromise]);

    // this shit is called to prevent errors from react-beautiful-dnd library,
    // which is used to animate the task drag-and-drop
    resetServerContext();

    return { props };
});
