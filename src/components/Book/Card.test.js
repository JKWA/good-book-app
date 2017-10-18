import React from 'react';
import { shallow } from 'enzyme';
import BookCard from './BookCard';

it('BookCard renders', () => {
  shallow(<BookCard bookId="testId"/>);
});