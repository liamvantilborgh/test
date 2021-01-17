import React, { Component } from 'react'
import './App.css';
import SearchProduct from './SearchProduct.js';
import AddProduct from './AddProduct.js';
import ListProduct from './ListProduct.js';
import DeleteProduct from './DeleteProduct.js';
import EditProduct from './EditProduct.js'
import Login from './Login.js';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {  
    super(props)
    this.state = { authenticated: false }
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    if(localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      this.setState({ authenticated: user.authenticated })
    }
  }

  logout() {
    localStorage.removeItem('user')
    window.location.reload()
  }

  render() {
    if(this.state.authenticated === true) {
      return (
        <div className = 'container'>
        <BrowserRouter>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav'>
                  <li className='nav-item active'>
                    <Link to={ '/list' } className='nav-link'>List</Link>
                  </li>
                  <li className='nav-item active'>
                    <Link to={ '/add' } className='nav-link'>Add</Link>
                  </li>
                  <li className='nav-item active'>
                    <Link to={ '/search' } className='nav-link'>Search</Link>
                  </li>
                  <li className='nav-item active'>
                    <Link to={ '/delete' } className='nav-link'>Delete</Link>
                  </li>
                  <li className='nav-item active'>
                    <Link to={ '' } onClick={ this.logout } className='nav-link'>Logout</Link>
                  </li>
              </ul>
              </div>
            </nav>
            <br/><br/>
            <Switch>
              <Route exact path='/list'><ListProduct/></Route>
              <Route exact path='/add' component={ AddProduct }></Route>
              <Route exact path='/edit/:product' component={ EditProduct }/>
              <Route exact path='/search'><SearchProduct/></Route>
              <Route path='/delete/:product' component={ DeleteProduct }/>
              <Route path='/delete'><DeleteProduct/></Route>
              <Route exact path='/login' component={ Login }/>
              <Route path='*'><ListProduct/></Route>
            </Switch>  
        </BrowserRouter>
        </div> 
      )
    }
    else {
      return (
            <BrowserRouter>
              <Route path='*' component={ Login }/>
            </BrowserRouter>)
    }
  }
}
// if match is used in component use component={component} in route tag instead of a new tag <component>

export default App
