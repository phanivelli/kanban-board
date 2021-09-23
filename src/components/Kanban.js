import React, { Component } from "react";
import {
  Paper,
  Grid,
  Typography,
  Card,
  Button,
  TextField,
  FormControl,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const styles = () => ({
  button: {
    display: "inline-block",
    padding: 0,
    minHeight: 0,
    minWidth: 0,
  },
  textAlign: {
    float: "left",
    margin: "1px 0px 0px 10px !important",
  },
  namet: {
    float: "left",
  },
  btnSec: {
    float: "right",
  },
  cardStyle: {
    margin: "4px 10px",
  },
  buttonDel: {
    color: "#ff0000 !important",
  },
  textField: {
    top: "30px",
    position: "relative",
  },
  cards: {
    position: "absolute",
    top: "90px",
    left: "57px",
  },
  btnSubmit: {
    left: "10px !important",
  },
});

class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { name: "Kiran", stage: 0 },
        { name: "Kumar", stage: 0 },
      ],
      inputValue: "",
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
  }
  addTask = () => {
    if (this.state.inputValue) {
      const tasks = this.state.tasks;
      tasks.push({ name: this.state.inputValue, stage: 0 });

      this.setState({ tasks: tasks, inputValue: "" });
    }
  };
  deleteTask = (name) => {
    const data = this.state.tasks.filter((item) => item.name !== name);
    this.setState({ tasks: data });
  };
  forward = (name) => {
    let tasks = this.state.tasks.map((task) => {
      if (task.name == name)
        return { name: task.name, stage: task.stage == 3 ? 3 : task.stage + 1 };
      else return task;
    });
    this.setState({ tasks: tasks });
  };
  back = (name) => {
    let tasks = this.state.tasks.map((task) => {
      if (task.name == name)
        return {
          name: task.name,
          stage: task.stage == 0 ? 0 : task.stage - 1,
        };
      else return task;
    });
    this.setState({ tasks: tasks });
  };
  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };
  render() {
    const { tasks } = this.state;
    const { classes } = this.props;
    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      console.log(task.stage);
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }
    return (
      <>
        <Grid item xs={12} className={classes.textField}>
          <Grid container justifyContent="center" spacing={2}>
            <TextField
              label="New Task"
              color="secondary"
              focused
              value={this.state.inputValue}
              onChange={this.handleChange}
            />
            <Button variant="contained" onClick={this.addTask}>
              Submit
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.cards}>
          <Grid container justifyContent="center" spacing={2}>
            {stagesTasks.map((tasks, i) => {
              return (
                <Grid item>
                  <Paper sx={{ height: 332, width: 300 }}>
                    <Typography variant="h6" component="h2">
                      {this.stagesNames[i]}
                    </Typography>
                    {tasks.map((task, i) => (
                      <Card
                        sx={{ maxWidth: 275 }}
                        className={classes.cardStyle}
                      >
                        <div className={classes.namet}>
                          <Typography
                            variant="h6"
                            component="h6"
                            className={classes.textAlign}
                          >
                            {task["name"]}{" "}
                          </Typography>
                        </div>
                        <div className={classes.btnSec}>
                          <Button onClick={this.back.bind(this, task.name)}>
                            <ArrowBackIcon />
                          </Button>
                          <Button onClick={this.forward.bind(this, task.name)}>
                            <ArrowForwardIcon />
                          </Button>

                          <Button
                            onClick={this.deleteTask.bind(this, task.name)}
                            className={classes.buttonDel}
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                      </Card>
                    ))}
                    {/* <span>{JSON.stringify(data, null, 2)}</span> */}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </>
    );
  }
}
export default withStyles(styles)(KanbanBoard);
