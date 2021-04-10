import Enzyme from 'enzyme';
import '@testing-library/jest-dom'
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });
