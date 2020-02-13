import React, {Component} from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'

import { setSearchField, requestRobots } from '../actions'

//what states to listen and send
const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}
//what props are actions and need to be dispatched
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}


class App extends Component {
    componentDidMount(){
        this.props.onRequestRobots();
        console.log(this.props.robots)
    }

    render(){

        const {searchField, onSearchChange, robots, isPending} = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return isPending ? 
        <h1 className="tc f1">Loading</h1> :
        (
                <div className='tc'>
                    <h1 className="c1 f1">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots ? filteredRobots : robots}/>
                        </ErrorBoundry>
                    </Scroll>
                    
                </div>
                
            )
        }
    }

//connect is a higher order function: a function that returns another function.
export default connect(mapStateToProps, mapDispatchToProps)(App);