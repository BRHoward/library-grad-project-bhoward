import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import App from '../../components/App';
import BookListContainer from '../../containers/BookListContainer';
import ReservationListContainer from '../../containers/ReservationListContainer';

describe('<App/>', () => {
	it('renders without crashing', () => {
	  shallow(<App />);
	});
	it('renders a <BookListContainer/>', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(BookListContainer).length).toBe(1);
	});
	it('renders a <ReservationListContainer/>', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(ReservationListContainer).length).toBe(1);
	});
});


