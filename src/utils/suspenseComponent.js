import { Suspense } from 'react';
import LazyLoader from 'components/shared/LazyLoader/LazyLoader';

export const suspenseComponent = (component, loader = <LazyLoader />) => (
	<Suspense fallback={loader}>{component}</Suspense>
);
