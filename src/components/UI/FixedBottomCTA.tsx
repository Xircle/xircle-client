/** @jsxImportSource @emotion/react */
import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';
import Button from './Button';
import { PortalConsumer } from '../../providers/PortalProviders';
import { css } from '@emotion/react';

const FixedBottomCTA = forwardRef(function FixedBottomCTA(
	props: ComponentPropsWithoutRef<typeof Button>,
	forwardedRef: Ref<HTMLButtonElement>,
) {
	return (
		<PortalConsumer>
			<div
				css={css`
					position: fixed;
					left: 0;
					bottom: 0;
					width: 100%;
				`}
			>
				<div
					css={css`
						padding: 0 20px 28px;
						text-align: center;
					`}
				>
					<Button fullWidth={false} {...props} ref={forwardedRef} />
				</div>
			</div>
		</PortalConsumer>
	);
});

export default FixedBottomCTA;
