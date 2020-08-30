import React, {
	useRef,
	ForwardRefExoticComponent,
	RefAttributes,
	useState,
	useEffect,
} from 'react';
import styles from './ProfileCard.module.scss';
import ButtonStyles from '../Button/Button.module.scss';

import axios from '../../axios';
import { BigHead } from '@bigheads/core';

import Card from '../Card/Card';
import Button, { ButtonRef, ButtonProps } from '../Button/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ProfileCardProps {
	name: string;
	username: string;
	email: string;
	userUrl: string;
	numFollowers: number;
	numFollowing: number;
	numSubscribers: number;
	numSubscriptions: number;
	following: boolean;
	subscribed: boolean;
}

export type Handle<T> = T extends ForwardRefExoticComponent<
	ButtonProps & RefAttributes<infer T2>
>
	? T2
	: never;

const ProfileCard = (props: ProfileCardProps) => {
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);
	let followButton: Handle<typeof Button>;
	let subscribeButton: Handle<typeof Button>;
	const numFollowers = useRef<HTMLElement>(null);
	const numFollowing = useRef<HTMLElement>(null);
	const numSubscribers = useRef<HTMLElement>(null);
	const numSubscribing = useRef<HTMLElement>(null);
	const [isFollowing, setIsFollowing] = useState<boolean>(props.following);
	const [isSubscribed, setIsSubscribed] = useState<boolean>(props.subscribed);

	useEffect(() => {
		setIsFollowing(props.following);
		setIsSubscribed(props.subscribed);
	}, [props.following, props.subscribed]);

	const handleFollow = async () => {
		try {
			await axios.post(`/user/${props.username}/follow`);
			if (followButton.button && numFollowers.current) {
				const followers = parseInt(numFollowers.current.innerText) + 1;
				followButton.button.innerText = 'Following';
				followButton.button.classList.add(ButtonStyles.hollow);
				numFollowers.current.innerText = followers.toString();
				setIsFollowing(true);
			}
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	const handleUnFollow = async () => {
		try {
			await axios.post(`/user/${props.username}/unfollow`);
			if (followButton.button && numFollowers.current) {
				const followers = parseInt(numFollowers.current.innerText) - 1;
				followButton.button.innerText = 'Follow';
				followButton.button.classList.remove(ButtonStyles.hollow);
				numFollowers.current.innerText = followers.toString();
				setIsFollowing(false);
			}
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	const handleSubscribe = async () => {
		try {
			await axios.post(`/user/${props.username}/subscribe`);
			if (subscribeButton.button && numSubscribers.current) {
				const subscribers =
					parseInt(numSubscribers.current.innerText) + 1;
				subscribeButton.button.innerText = 'Subscribed';
				subscribeButton.button.classList.add(ButtonStyles.hollow);
				numSubscribers.current.innerText = subscribers.toString();
				setIsSubscribed(true);
			}
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	const handleUnsubscribe = async () => {
		try {
			await axios.post(`/user/${props.username}/unsubscribe`);
			if (subscribeButton.button && numSubscribers.current) {
				const subscribers =
					parseInt(numSubscribers.current.innerText) - 1;
				subscribeButton.button.innerText = 'Subscribe';
				subscribeButton.button.classList.remove(ButtonStyles.hollow);
				numSubscribers.current.innerText = subscribers.toString();
				setIsSubscribed(false);
			}
		} catch (err) {}
	};

	const image = (
		<BigHead
			accessory='roundGlasses'
			body='chest'
			circleColor='blue'
			clothing='shirt'
			clothingColor='blue'
			eyebrows='angry'
			eyes='happy'
			faceMask
			faceMaskColor='black'
			facialHair='stubble'
			graphic='react'
			hair='short'
			hairColor='black'
			hat='none3'
			hatColor='red'
			lashes
			lipColor='red'
			mask
			mouth='lips'
			skinTone='light'
		/>
	);

	return (
		<Card className={styles.profileCard}>
			<div className={styles.header}>
				<div className={styles.image}>{image}</div>
				<h1>{props.username}</h1>
				<p>Email: {props.email}</p>
				{!(props.username === username) && (
					<div className={styles.connectButtons}>
						<Button
							onClick={
								isFollowing ? handleUnFollow : handleFollow
							}
							ref={(f) => (followButton = f as ButtonRef)}
							style={props.following ? 'hollow' : undefined}
						>
							{props.following ? 'Following' : 'Follow'}
						</Button>
						<Button
							onClick={
								isSubscribed
									? handleUnsubscribe
									: handleSubscribe
							}
							ref={(s) => (subscribeButton = s as ButtonRef)}
							style={props.subscribed ? 'hollow' : undefined}
						>
							{props.subscribed ? 'Subscribed' : 'Subscribe'}
						</Button>
					</div>
				)}
			</div>
			<div className={styles.text}>
				<div className={styles.connections}>
					<div className={styles.connection}>
						<strong ref={numFollowers}>{props.numFollowers}</strong>
						<p>Followers</p>
					</div>
					<div className={styles.connection}>
						<strong ref={numFollowing}>{props.numFollowing}</strong>
						<p>Following</p>
					</div>
					<div className={styles.connection}>
						<strong ref={numSubscribers}>
							{props.numSubscribers}
						</strong>
						<p>Subscribers</p>
					</div>
					<div className={styles.connection}>
						<strong ref={numSubscribing}>
							{props.numSubscriptions}
						</strong>
						<p>Subscriptions</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default ProfileCard;
