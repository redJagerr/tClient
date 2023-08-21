import { useEffect } from 'react';
export function useOnClickOutside(
	ref,
	handler,
	elementState,
	exceptionRef = null
) {
	useEffect(() => {
		const listener = event => {
			if (elementState) return;
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			if (exceptionRef && exceptionRef.current.contains(event.target)) return;
			handler(event);
		};
		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler, elementState, exceptionRef]);
}
