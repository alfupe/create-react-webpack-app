/**
 * Extra jest-dom asserts
 */
import '@testing-library/jest-dom/extend-expect';

/**
 * Configure Enzyme
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
