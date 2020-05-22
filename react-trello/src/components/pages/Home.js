import React from "react";
import BoardPreview from "../BoardPreview";

import PropTypes from 'prop-types'
import CreateBoardForm from '../CreateBoardForm'

export default class Home extends React.Component {
  componentDidMount() {
    this.props.getBoards()
   }
  render() {
    return (
      <div>
          <span>
            {this.props.match.params.userID}
          </span>
          <CreateBoardForm 
            createNewBoard={this.props.createNewBoard}
          />
          <div className="board-preview-wrapper">
            
          
        {
         Object.keys(this.props.boards).map((key) => (
          <BoardPreview 
          key={key} 
          board={this.props.boards[key]} 
          />
        ))}
        </div>
      </div>
    );
  }
}

Home.propTypes={
    boards:PropTypes.array.isRequired,
    createNewBoard:PropTypes.func.isRequired,
    getBoards:PropTypes.func.isRequired
}