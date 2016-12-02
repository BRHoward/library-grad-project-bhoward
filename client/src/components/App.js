import React, { Component } from 'react';
import BookListContainer from '../containers/BookListContainer';
import ReservationListContainer from '../containers/ReservationListContainer';

class App extends Component {
    render() {
        return ( 
            <div>
               <BookListContainer/>
               <ReservationListContainer/>
            </div>
        )
    }
}

export default App;