import { Component } from "react"
import Landing from "./Landing";
import reducer from "./reducer";
import saga from "./saga";
import injectSaga from "../../utils/injectSaga";
import injectReducer from "../../utils/injectReducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { getFilterOptions, isLoggedIn } from "./selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Navbar from "./Navbar";

const key = "HomePage";

class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    componentDidMount(){
        let loggedIn = sessionStorage.getItem('loggedIn');
        if(!loggedIn){
            this.props.history.push('/login');
        }
    }
    componentDidUpdate(prevProps,prevState){

    }
    render() {
        

        return (
            <div className="homePage">
                <Navbar loggedIn={this.props.loggedIn} page="homepage"/>
                <Landing filterOptions={this.props.selected} />
                
            </div>
        )
    }
}
const mapStateToProps = createStructuredSelector({
        loggedIn:isLoggedIn(),
        selected:getFilterOptions()
});
const mapDispatchToProps = (dispatch) => {
    return {
    }
  }
const withConnect = connect(mapStateToProps,mapDispatchToProps);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default (compose(withConnect,withRouter, withReducer, withSaga)(HomePage));