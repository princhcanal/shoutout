import React, {
	forwardRef,
	useImperativeHandle,
	Ref,
	useEffect,
	useState,
} from 'react';
import styles from './FloatingCard.module.scss';

import Card, { CardRef } from '../Card';
import CardHandle from '../../../types/cardHandle';
import Backdrop, { BackdropRef } from '../../Backdrop/Backdrop';
import BackdropHandle from '../../../types/backdropHandle';

export interface FloatingCardProps {
	children: any;
	className?: string;
	showCard: boolean;
	setShowCard: any;
}

export interface FloatingCardRef {
	card: HTMLDivElement | null;
}

const FloatingCard = forwardRef(
	(props: FloatingCardProps, ref: Ref<FloatingCardRef>) => {
		let cardRef: CardHandle<typeof Card>;
		let backdropRef: BackdropHandle<typeof Backdrop>;
		const classNames = [styles.floatingCard];
		const [showCard, setShowCard] = useState<boolean>(false);

		if (props.className) {
			classNames.push(...props.className.split(' '));
		}

		useImperativeHandle(ref, () => ({
			card: cardRef.card,
			backdrop: backdropRef.backdrop,
		}));

		useEffect(() => {
			setShowCard(props.showCard);
		}, [props.showCard, setShowCard]);

		return (
			<>
				<Card
					className={classNames.join(' ')}
					ref={(c) => (cardRef = c as CardRef)}
				>
					{props.children}
				</Card>
				<Backdrop
					ref={(b) => (backdropRef = b as BackdropRef)}
					showBackdrop={showCard}
					onHide={() => {
						if (cardRef && cardRef.card) {
							cardRef.card.classList.remove(styles.center);
						}
						props.setShowCard(false);
					}}
					onShow={() => {
						if (cardRef && cardRef.card) {
							cardRef.card.classList.add(styles.center);
						}
					}}
				/>
			</>
		);
	}
);

export default FloatingCard;
