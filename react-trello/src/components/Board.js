import React, { Fragment } from 'react'
import List from './List'
import {listsRef,boardsRef} from '../firebase'


class Board extends React.Component{
    state={
        currentBoard:{},
        currentLists:[]
    }
    componentDidMount(){
        this.getBoard(this.props.match.params.boardId)
        this.getList(this.props.match.params.boardId)
    }
    getBoard=async boardId=>{
        try{
            const board=await boardsRef.doc(boardId).get()
            this.setState({
                currentBoard:board.data().board
            })
        }catch(err){
            console.error('An error getting board',err)
        }
    }
    getList=async (boardId)=>{
        try{
            const lists=await listsRef
            .where('list.board','==',boardId)
            .orderBy('list.createdAt')
            .get()
            lists.forEach(list=>{
                const data=list.data().list
                const listObj={
                    id:list.id,
                    ...data
                }
                this.setState({
                    currentLists:[...this.state.currentLists,listObj]
                })
            })
        }
        catch(err){
            console.error(err);
        }
    }
    addBoardInput=React.createRef();
    createNewList=async (e)=>{
        e.preventDefault();
        try{
            
        console.log(this.addBoardInput)
        const list={
            title: this.addBoardInput.current.value,
            board: this.props.match.params.boardId,
            createdAt:new Date()
        }
        
        if(list.title && list.board){
            const newList=await listsRef.add({list})
            const listObj={
                id:newList.id,
                ...list
            }
            // this.setState(prevState=>{
            //     return {currentLists:[...prevState.currentLists,listObj]}
            // }
        // )    
        }
    }
    catch(error){
        console.error('An error occured while adding list:',error)
    }
        
    }
    render(props){
        return (
            <div className="board-wrapper" style={{backgroundColor:this.state.currentBoard.background}}>
                <div className="board-header">
                    <h3> {this.state.currentBoard.title}</h3>
                    <button >Delete Board</button>
                </div>
            <div className="lists-wrapper">
                    {this.state.currentLists.map((list,key)=>{
                        return (<List 
                        key={this.state.currentLists[key].id} 
                        list={list}
                        />)
                    })}
          
            </div>
            <form onSubmit={this.createNewList} className="new-list-wrapper">
                    <input 
                    name="name" 
                    ref={this.addBoardInput} 
                    type="text" 
                    placeholder="+ New List"/>
            </form>
            </div >

        )
    }
}


export default Board