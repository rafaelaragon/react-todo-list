import React from "react";
import axios from "axios";
import "./New.css";
import Button from "react-bootstrap/Button";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { addTask } from "../../redux/actions/addTask";
import { connect } from "react-redux";

class New extends React.Component {
  state = {
    name: "",
    desc: ""
  };

  componentDidMount() {
    axios
      .get(
        `https://4e19jgnd02.execute-api.us-east-1.amazonaws.com/default/getTasks`
      )
      .then(res => {
        let copy = [];
        let tasksCount = res.data.Items.length;
        let id = tasksCount + 1;

        for (let i = 0; i < tasksCount; i++)
          copy.push(parseInt(res.data.Items[i].Id.S, 10));

        let i = 1;
        do {
          // eslint-disable-next-line
          !copy.includes(i) ? ((id = i), (i = tasksCount + 1)) : "";
          i++;
        } while (i <= tasksCount);
        this.setState({ taskId: id });
      });
  }

  handle1stChange = event => {
    this.setState({ name: event.target.value });
  };
  handle2ndChange = event => {
    this.setState({ desc: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const task = {
      id: this.state.taskId,
      name: this.state.name,
      desc: this.state.desc
    };

    await this.props.addTask(task.id, task.name, task.desc);
    this.props.history.push("/tasks");
  };

  render() {
    return (
      <div className="New">
        <div className="return">
          <Link to="/home">
            <Button variant="outline-warning" size="lg" block>
              <FaArrowLeft />
            </Button>
          </Link>
        </div>
        <div id="form">
          <Form>
            <Form.Group controlId="form.TaskName">
              <h1>Name</h1>
              <Form.Control
                placeholder="Clean the garage"
                onChange={this.handle1stChange}
              />
            </Form.Group>
            <Form.Group controlId="form.TaskDesc">
              <h1>Description</h1>
              <Form.Control
                as="textarea"
                rows="2"
                placeholder="I should clean the garage because..."
                onChange={this.handle2ndChange}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="send">
          <Button
            variant="outline-success"
            size="lg"
            block
            onClick={this.handleSubmit}
          >
            <FaCheck />
          </Button>
        </div>
      </div>
    );
  }
}

//Redux
const mapDispatch = { addTask };

export default withRouter(connect(null, mapDispatch)(New));
