import React, { useRef, useState, useEffect } from 'react';
import styles from './ProfileCard.module.scss';
import ButtonStyles from '../Button/Button.module.scss';

import axios from '../../axios';
import { BigHead } from '@bigheads/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../Card/Card';
import Button, { ButtonRef } from '../Button/Button';
import { RootState } from '../../store';
import ButtonHandle from '../../types/handles/buttonHandle';
import FetchConnectionData from '../../types/fetchData/fetchConnectionData';
import FloatingCard from '../Card/FloatingCard/FloatingCard';
import User from '../../types/models/user';
import { ErrorMessageRef } from '../ErrorMessage/ErrorMessage';
import { showErrorMessage } from '../../utils/errors';
import ConnectionLoader from '../Loader/SkeletonLoader/ConnectionLoader/ConnectionLoader';

interface ProfileCardProps {
	name: string;
	username: string;
	email: string;
	userUrl: string;
	numFollowers: number;
	numFollowing: number;
	numSubscribers: number;
	numSubscriptions: number;
	isFollowing: boolean;
	isSubscribed: boolean;
}

type Actions = 'follow' | 'unfollow' | 'subscribe' | 'unsubscribe';

const ProfileCard = (props: ProfileCardProps) => {
	const username = useSelector<RootState, string>(
		(state) => state.auth.username
	);
	let followButton: ButtonHandle<typeof Button>;
	let subscribeButton: ButtonHandle<typeof Button>;
	const numFollowers = useRef<HTMLElement>(null);
	const numFollowing = useRef<HTMLElement>(null);
	const numSubscribers = useRef<HTMLElement>(null);
	const numSubscribing = useRef<HTMLElement>(null);
	const [isFollowing, setIsFollowing] = useState<boolean>(props.isFollowing);
	const [isSubscribed, setIsSubscribed] = useState<boolean>(
		props.isSubscribed
	);
	const [showCard, setShowCard] = useState<boolean>(false);
	const [isConnectionLoading, setIsConnectionLoading] = useState<boolean>(
		true
	);
	const [connections, setConnections] = useState<User[]>([]);
	const dispatch = useDispatch();
	const errorMessageRef = useSelector<RootState, ErrorMessageRef | null>(
		(state) => state.error.errorMessageRef
	);

	useEffect(() => {
		setIsFollowing(props.isFollowing);
	}, [props.isFollowing]);

	useEffect(() => {
		setIsSubscribed(props.isSubscribed);
	}, [props.isSubscribed]);

	const handleConnection = async (action: Actions) => {
		try {
			await axios.post(`/user/${props.username}/${action}`);
			let button: HTMLButtonElement | null = null;
			let numConnections: HTMLElement | null = null;

			if (action === 'follow' || action === 'unfollow') {
				button = followButton.button;
				numConnections = numFollowers.current;
			} else if (action === 'subscribe' || action === 'unsubscribe') {
				button = subscribeButton.button;
				numConnections = numSubscribers.current;
			}

			if (button && numConnections) {
				let connections = parseInt(numConnections.innerText);
				if (action === 'follow') {
					connections += 1;
					button.innerText = 'Unfollow';
					button.classList.add(ButtonStyles.hollow);
					setIsFollowing(true);
				} else if (action === 'unfollow') {
					connections -= 1;
					button.innerText = 'Follow';
					button.classList.remove(ButtonStyles.hollow);
					setIsFollowing(false);
				} else if (action === 'subscribe') {
					connections += 1;
					button.innerText = 'Unsubscribe';
					button.classList.add(ButtonStyles.hollow);
					setIsSubscribed(true);
				} else if (action === 'unsubscribe') {
					connections -= 1;
					button.innerText = 'Subscribe';
					button.classList.remove(ButtonStyles.hollow);
					setIsSubscribed(false);
				}
				numConnections.innerText = connections.toString();
			}
		} catch (err) {
			showErrorMessage(err, errorMessageRef, dispatch);
		}
	};

	type Connections =
		| 'followers'
		| 'following'
		| 'subscribers'
		| 'subscribing';

	const handleGetConnections = async (connection: Connections) => {
		setShowCard(true);
		setIsConnectionLoading(true);

		try {
			const connectionData = await axios.get<FetchConnectionData>(
				`/user/${props.username}/${connection}`
			);
			const connections = connectionData.data[connection];
			if (connections) {
				setConnections(connections);
				setIsConnectionLoading(false);
			}
		} catch (err) {
			showErrorMessage(err, errorMessageRef, dispatch);
		}
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

	const connectionList = connections.map((connection) => (
		<li key={connection.username}>
			<Link to={`/profile/${connection.username}`}>
				<strong>{connection.username}</strong>
				<em>{connection.name}</em>
			</Link>
		</li>
	));

	let handleFollowCallback;
	let handleSubscribeCallback;
	if (isFollowing) {
		handleFollowCallback = () => handleConnection('unfollow');
	} else {
		handleFollowCallback = () => handleConnection('follow');
	}
	if (isSubscribed) {
		handleSubscribeCallback = () => handleConnection('unsubscribe');
	} else {
		handleSubscribeCallback = () => handleConnection('subscribe');
	}

	return (
		<Card className={styles.profileCard}>
			<div className={styles.header}>
				<div className={styles.image}>{image}</div>
				<h1>{props.username}</h1>
				<p>Email: {props.email}</p>
				{!(props.username === username) && (
					<div className={styles.connectButtons}>
						<Button
							onClick={handleFollowCallback}
							ref={(f) => (followButton = f as ButtonRef)}
							style={props.isFollowing ? ['hollow'] : undefined}
						>
							{props.isFollowing ? 'Following' : 'Follow'}
						</Button>
						<Button
							onClick={handleSubscribeCallback}
							ref={(s) => (subscribeButton = s as ButtonRef)}
							style={props.isSubscribed ? ['hollow'] : undefined}
						>
							{props.isSubscribed ? 'Subscribed' : 'Subscribe'}
						</Button>
					</div>
				)}
			</div>
			<div className={styles.text}>
				<div className={styles.connections}>
					<div
						className={styles.connection}
						onClick={() => handleGetConnections('followers')}
					>
						<strong ref={numFollowers}>{props.numFollowers}</strong>
						<p>Followers</p>
					</div>
					<div
						className={styles.connection}
						onClick={() => handleGetConnections('following')}
					>
						<strong ref={numFollowing}>{props.numFollowing}</strong>
						<p>Following</p>
					</div>
					<div
						className={styles.connection}
						onClick={() => handleGetConnections('subscribers')}
					>
						<strong ref={numSubscribers}>
							{props.numSubscribers}
						</strong>
						<p>Subscribers</p>
					</div>
					<div
						className={styles.connection}
						onClick={() => handleGetConnections('subscribing')}
					>
						<strong ref={numSubscribing}>
							{props.numSubscriptions}
						</strong>
						<p>Subscriptions</p>
					</div>
				</div>
			</div>
			{username === props.username && (
				<Link to='/account/edit' className={styles.editProfile}>
					Edit Profile
				</Link>
			)}
			<FloatingCard showCard={showCard} setShowCard={setShowCard}>
				<ul
					className={styles.connectionList}
					onClick={() => setShowCard(false)}
				>
					{isConnectionLoading ? (
						<ConnectionLoader />
					) : connectionList.length > 0 ? (
						connectionList
					) : (
						<p>No user found</p>
					)}
				</ul>
			</FloatingCard>
		</Card>
	);
};

export default ProfileCard;
