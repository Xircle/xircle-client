/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useId as generateID} from '../../hooks/useId';
import { forwardRef, InputHTMLAttributes, memo, Ref, useState } from 'react';
// import { visuallyHidden } from 'utils/emotion/visually-hidden';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean;
  type?: 'checkbox';
}

const ControlledCheckbox = forwardRef(function ControlledCheckbox(
  { id = generateID('checkbox-'), type = 'checkbox', className, checked, onChange, ...rest }: Props,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div
      className={className}
      css={css`
        overflow: hidden;
        & + & {
          margin-top: 8px;
        }
      `}
    >
      <input
        ref={ref}
        type={type}
        id={id}
        checked={checked}
        onChange={value => {
          onChange?.(value);
        }}
        css={css`
          position: fixed;
          width: 20px;
          height: 20px;
          padding: 0;
          border: 0;
          margin: -20px;
          overflow: hidden;
          clip: rect(10px, 0, 0, 0);
        `}
        {...rest}
      />
    </div>
  );
});

const UncontrolledCheckbox = forwardRef(function UncontrolledCheckbox(
  { onChange, defaultChecked, ...props }: Props,
  ref: Ref<HTMLInputElement>
) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <ControlledCheckbox
      ref={ref}
      checked={isChecked}
      onChange={event => {
        setIsChecked(event.currentTarget.checked);
        onChange?.(event);
      }}
      {...props}
    />
  );
});

const Checkbox = forwardRef(function Checkbox(props: Props, ref: Ref<HTMLInputElement>) {
  if (props.checked != null) {
    return <ControlledCheckbox {...props} />;
  } else {
    return <UncontrolledCheckbox {...props} />;
  }
});

export default memo(Checkbox);
