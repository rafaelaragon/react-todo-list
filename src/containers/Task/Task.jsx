import React from "react";
import "./Task.css";
import Button from "react-bootstrap/Button";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { capitalize } from "../../functions/functions";
import { getTask } from "../../redux/actions/getTask";
import { connect } from "react-redux";

class Task extends React.Component {

  componentDidMount = async () => {
    let id = this.props.match.params.taskId;
    await this.props.getTask(id);
  };

  render() {
    const { task, isLoaded } = this.props;
    let id = this.props.match.params.taskId;
    console.log("TCL: Task -> render -> id", id);

    return (
      <div className="Task">
        <div id="return">
          <Link to="/home">
            <Button variant="outline-warning" size="lg" block>
              <FaArrowLeft />
            </Button>
          </Link>
        </div>
        {isLoaded ? (
          <div id="info">
            <h1>{!!task[id] ? task[id].Id.S : ""}</h1>
            <h2>{!!task[id] ? capitalize(task[id].Name.S) : ""}</h2>
            <h3>{!!task[id] ? capitalize(task[id].Description.S) : ""}</h3>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
 
}

//Redux
function mapState(state) {
  console.log("TCL: mapState -> state", state.taskReducer.task);
  return {
    task: state.taskReducer.task,
    isLoaded: state.taskReducer.isLoaded
  };
}

const mapDispatch = { getTask };

export default connect(mapState, mapDispatch)(Task);
