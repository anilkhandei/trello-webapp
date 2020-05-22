import React from 'react'

import Card from './Card'
import PropTypes from 'prop-types'

import {cardsRef,listsRef} from '../firebase'

class List extends React.Component{
    state={
            currentCards:[]
        }
    getCards=async (listId)=>{
        try{
            const cards=await cardsRef
            .where('card.listId','==',listId)
            .orderBy('card.createdAt')
            .get()
            cards.forEach(card=>{
                const data=card.data().card
                const cardObj={
                    id:card.id,
                    ...data
                }
                
                this.setState({
                    currentCards:[...this.state.currentCards,cardObj]
                })
            })
        }catch(e){
            console.error(e)
        }
        

    }
    componentDidMount(){
        this.getCards(this.props.list.id)
    }
    addCardName=React.createRef()
    createNewCard= async (e)=>{
        e.preventDefault()
        try{
        const card={
            text:this.addCardName.current.value,
            listId:this.props.list.id,
            labels:[],
            createdAt:new Date()
        }
        if(card.text && card.listId){
            const newCard=await cardsRef.add({card})
            const cardObj={
                id:newCard.id,
                ...card
            }
        }
        this.addCardName.current.value=''
        console.log('card was added '+card.text)
    }catch(err){
        console.error('an error occured while adding card:',err)
    }
    }
    deleteList=async(e)=>{
        try{
            const listId=this.props.list.id
            const cards=await cardsRef
            .where('card.listId','==',listId)
            .get()
            if(cards.docs.length!==0){
                cards.forEach(async card=>{
                    card.ref.delete()
                })
            }
            const list=await listsRef.doc(listId)
            list.delete()
        }catch(err){
            console.error('Error occured while deleting List',err)
        }
    }
    render(){
        return (
            <div className="list">
                <div className="list-header">
                  <p>  {this.props.list.title} </p>
                  <span onClick={this.deleteList}>&times;</span>
                </div>
                
                <div className="list-body">
                    {
                        this.state.currentCards.map((card)=>(
                            <Card 
                            key={card.id}
                            data={card}
                            />)
                            )
                    }
                    <form 
                    className="create-card-wrapper" 
                    onSubmit={this.createNewCard}
                    >
                     <input 
                     type="text"
                     name="name"
                     ref={this.addCardName}
                     placeholder="+ New Card"
                     />   
                    </form>
                </div>
            </div>
        )
    }
}

List.propTypes={
    list:PropTypes.object.isRequired
}

export default List