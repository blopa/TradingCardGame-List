import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Header} from './Header';
import {Home} from './routes/Home';
import '../styles/Root.css';
import PropTypes from 'prop-types';
import {API_URL} from '../helper/define';
import {fetchData} from '../helper/functions';

class Root extends React.Component {
  componentDidMount() {
    this.fetchQuestions();
  }
  fetchQuestions() {
    const p = d => {
      this.updateQuestions(d);
      this.setState({
        loadedData: true
      });
    };
    const ep = () => {
      this.setState({
        requestFailed: true
      });
    };
    fetchData(`${API_URL}/questions`, p, ep);
  }
  constructor(props) {
    super(props);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.addNewQuestion = this.addNewQuestion.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
    this.removeAllQuestions = this.removeAllQuestions.bind(this);
    this.state = {
      storeData: {},
      requestFailed: false,
      loadedData: false
    };
  }
  updateQuestions(questions) {
    this.props.updateQuestions(questions);
  }
  addNewQuestion(question) {
    this.props.addNewQuestion(question);
  }
  sortQuestions() {
    this.props.sortQuestions();
  }
  removeAllQuestions() {
    this.props.removeQuestions();
  }
  renderHome(props) {
    return (<Home
      questions={this.props.storeData.questions} {...props}
      addNewQuestion={this.addNewQuestion}
      removeAllQuestions={this.removeAllQuestions}
      sortQuestions={this.sortQuestions}
      loadedData={this.state.loadedData}
    />);
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={props => this.renderHome(props)}/>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({storeData: state});
const mapDispatchToProps = dispatch => (
  {
    addNewQuestion: question => (
      dispatch(
        {
          type: 'ADD',
          payload: {
            question: question
          }
        }
      )
    ),
    updateQuestions: questions => (
      dispatch(
        {
          type: 'UPDATE',
          payload: {
            questions: questions
          }
        }
      )
    ),
    sortQuestions: () => (
      dispatch(
        {
          type: 'SORT',
          payload: {}
        }
      )
    ),
    removeQuestions: () => (
      dispatch(
        {
          type: 'REMOVE_ALL',
          payload: {}
        }
      )
    )
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Root);

Root.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  storeData: PropTypes.object,
  sortQuestions: PropTypes.func,
  removeQuestions: PropTypes.func,
  addNewQuestion: PropTypes.func,
  updateQuestions: PropTypes.func
};
