import { CircularProgress } from '@mui/material';

const LazyLoader = () => (
	<div className='lazy-loader__container'>
		<CircularProgress color='inherit' size={50} />
	</div>
);

export default LazyLoader;
