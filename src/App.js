import React, { Component } from 'react'
import List from "./List";
import "./App.css";
import {library } from "@fortawesome/fontawesome-svg-core";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

export default class App extends Component {
  todoData;
  constructor(props) {
    super(props)
  
    this.state = {
       items:[],
       currentItem:{
         text:"",
         key:""
       }
    }
  }
  handleChange=(e)=>{
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  handleClick=(e)=>{
    // e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text: "",
        key:""
      }
    }) 
    }
  }

  deleteItem=(key)=>{
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
  setUpdate=(text,key)=>{
    
    const items = this.state.items;
    items.map(item=>{      
      
      if(item.key===key){
       
        item.text= text;
      }
      
    })
   
    this.setState({
      items: items
    })
    
   
  }

  componentDidMount(){
    this.todoData= JSON.parse(localStorage.getItem("mushii"));
    if(localStorage.getItem("mushii")){
      this.setState({
        currentItem: this.todoData.currentItem,
        items: this.todoData.items
      })
      
    }
    else{
        this.setState({
          items:"",
          currentItem:""
        })
    }

  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem("mushii", JSON.stringify(nextState));
  }

  render() {
    return (  
      <div className="App">
          <h1 align="center">My First Todo App</h1>
          <hr/>
          <hr/>
          <input 
          className="input"
          type="text" 
          placeholder="What to do"
          value={this.state.currentItem.text}
          onChange={this.handleChange}
          />
          <button 
          className="AddButton"
          type="submit"
          onClick={this.handleClick}
          >Add</button>
          <hr/>
        <p>{this.state.items.text}</p>
        <List
        items={this.state.items}
        deleteItem={this.deleteItem} 
        setUpdate={this.setUpdate}
    
        />
      </div>
    )
  }
}