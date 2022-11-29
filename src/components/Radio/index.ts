import { RadioButton as RadioButtonComponent } from './Radio';
import RadioButtonGroup from './RadioButtonGroup';

const RadioButton = Object.assign(
  // @component ./RadioButton.tsx
  RadioButtonComponent,
  {
    // @component ./RadioButtonGroup.tsx
    Group: RadioButtonGroup,
  }
);

export default RadioButton;
