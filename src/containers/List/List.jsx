import React from "react";
import "./List.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
  FaPlus,
  FaSort,
  FaTasks,
  FaTools,
  FaPen,
  FaTrash,
  FaArrowLeft
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { capitalize, sortTable } from "../../functions/functions";
import { loadList } from "../../redux/actions/getTasks";
import { deleteTask } from "../../redux/actions/deleteTask";
import { connect } from "react-redux";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  handleSubmit = async id => {
    this.props.deleteTask(id);
    await this.getTasks();
    sortTable(0);
  };

  submit = id => {
    confirmAlert({
      title: "Delete task?",
      buttons: [
        {
          label: <FaArrowLeft />
        },
        {
          label: <FaTrash />,
          onClick: () => this.handleSubmit(id)
        }
      ]
    });
  };

  createTable = size => {
    let table = [];
    if (size > 0) {
      for (let i = 0; i < size; i++) {
        let children = [];
        let id = this.props.list[i].Id.S;
        let name = this.props.list[i].Name.S;
        children.push(
          <td key={id} id="id">
            {id}
          </td>
        );
        children.push(
          <td key={name} className="task">
            <Link to={"task/" + id}>{capitalize(name)}</Link>
          </td>
        );
        children.push(
          <td key="icons" id="icons">
            {
              <Link to={"edit/" + id}>
                <FaPen size="3vh" color="#decc45" />
              </Link>
            }
            {
              <FaTrash
                size="3vh"
                color="#de4545"
                onClick={() => this.submit(id)}
              />
            }
          </td>
        );
        table.push(<tr key={"task" + id}>{children}</tr>);
      }
    } else {
      let children = [];
      children.push(<td key={"id"} id="id"></td>);
      children.push(<h1>Hurray! Nothing to do yet!</h1>);
      table = children;
    }
    return table;
  };

  getTasks = async () => {
    this.props.loadList();
  };

  componentDidMount() {
    this.getTasks();
  }

  render() {
    const { isLoaded } = this.props;
    return (
      <div className="Wrapper">
        <div className="List">
          <div id="addTask">
            <Link to="/react-todo-list/new">
              <Button variant="outline-success" size="lg" block>
                <FaPlus />
              </Button>
            </Link>
          </div>
          <Table striped hover responsive id="myTable">
            <thead>
              <tr>
                <th id="num">
                  <FaSort className="small-icon" onClick={() => sortTable(0)} />
                </th>
                <th>
                  <FaTasks className="small-icon" />
                </th>
                <th id="actions">
                  <FaTools className="small-icon" />
                </th>
              </tr>
            </thead>
            {isLoaded ? (
              <tbody>
                {!!this.state.tasks
                  ? this.createTable(this.props.list.length)
                  : ""}
                
              </tbody>
            ) : (
              <h1>Loading...</h1>
            )}
          </Table>
        </div>
      </div>
    );
  }
}

//Redux
function mapState(state) {
  return {
    list: state.tasksReducer.list,
    isLoaded: state.tasksReducer.isLoaded
  };
}

const mapDispatch = { loadList, deleteTask };

export default connect(mapState, mapDispatch)(List);
