import React from "react";
import "./Edit.css";
import Button from "react-bootstrap/Button";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { editTask } from "../../redux/actions/editTask";
import { connect } from "react-redux";

class Edit extends React.Component {
  state = {
    name: "",
    desc: ""
  };

  handle1stChange = event => {
    this.setState({ name: event.target.value });
    console.log(this.props.match.params.taskId);
  };
  handle2ndChange = event => {
    this.setState({ desc: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    let id = this.props.match.params.taskId;
    const task = {
      id: id,
      name: this.state.name,
      desc: this.state.desc
    };

    this.props.editTask(task.id, task.name, task.desc);
    this.props.history.push("/tasks");
  };

  render() {
    return (
      <div className="Edit">
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
                required
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
          <Link to="/home">
            <Button
              type="submit"
              variant="outline-success"
              size="lg"
              block
              onClick={this.handleSubmit}
            >
              <FaCheck />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

//Redux
const mapDispatch = { editTask };

export default withRouter(connect(null, mapDispatch)(Edit));
