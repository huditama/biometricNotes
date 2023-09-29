import renderer from 'react-test-renderer';
import { Authenticate } from '../src/screens/Authenticate';

it('renders Authenticate page correctly', () => {
  renderer.create(<Authenticate />);
});
