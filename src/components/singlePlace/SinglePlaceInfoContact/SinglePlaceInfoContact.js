import React from 'react';
import { v4 } from 'uuid';

const SinglePlaceInfoContact = ({ name, phone }) => (
	<li className='single-place-info__phone-item' key={v4()}>
		<span className='single-place-info__phone-name'>{name}</span>
		<div className='single-place-info__link'>
			<a
				href={`tel: ${phone}`}
				className='link single-place-info__phone-number'
			>
				{phone}
			</a>
		</div>
	</li>
);

export default SinglePlaceInfoContact;
