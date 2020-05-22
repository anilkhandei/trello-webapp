import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components/Board";
import data from "./sampleData";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";


import {boardsRef} from './firebase'

import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  state = {
    boards: [],
  };
 
  getBoards=async()=>{
    try{
      this.setState({
        boards:[

        ]
      })
      const boards=await boardsRef.get()
      boards.forEach(board=>{
        const data=board.data().board;
        const boardObj={
          id:board.id,
          ...data
        }
        this.setState({
          boards:[...this.state.boards,boardObj]
        })
      })
    }catch(er){
      console.error('error fetching boards:',er)
    }
  }
  createNewBoard = async board => {
    try{
      const newBoard=await boardsRef.add({board})
    const boardObj={
      id:newBoard.id,
      ...board
    }
    this.setState({
      boards: [...this.state.boards, boardObj],
    });
    }
    catch(error){
      console.error('Error creating new board:',error)
    }
    
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={PageNotFound} />
            <Route
              path="/:userID/boards"
              render={(props) => (
                <Home
                  {...props}
                  getBoards={this.getBoards}
                  boards={this.state.boards}
                  createNewBoard={this.createNewBoard}
                />
              )}
            />
            <Route 
            path="/board/:boardId" 
            render={(props)=>{
              return (<Board 
                {...props}
              />)
            }

            }
            />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
