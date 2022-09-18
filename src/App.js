import './App.css';
import { Segment, Button, Icon, Grid } from 'semantic-ui-react';
import { useState } from 'react';

const pointToText = [
	'♥',
	'15',
	'30',
	'40',
	'AD',
	'GAME',
];

function App() {
	const [homeGames, setHomeGames] = useState(0);
	const [homePoints, setHomePoints] = useState(0);
	const [homeText, setHomeText] = useState('♥');
	const [awayGames, setAwayGames] = useState(0);
	const [awayPoints, setAwayPoints] = useState(0);
	const [awayText, setAwayText] = useState('♥');
	const [call, setCall] = useState('-');
	const [callDir, setCallDir] = useState(-1);

	function resetAll() {
		setHomeGames(0);
		setHomePoints(0);
		setHomeText('♥');
		setAwayGames(0);
		setAwayPoints(0);
		setAwayText('♥');
		setCall('-');
		setCallDir(-1);
	}

	function resetCalls() {
		setCall('-');
		setCallDir(-1);
	}

	function addPoint(team) {

		//Copy states
		let pointHome = homePoints;
		let pointAway = awayPoints;
		let gameHome = homeGames;
		let gameAway = awayGames;
		let newCall = '-';
		let newCallDir = -1;

		//Update points
		if (team === 0)
			pointHome++;
		else
			pointAway++;

		//Update high-stake points
		if (pointHome >= 3 && pointAway >= 3) {

			//Deuce
			if (pointHome === 3 && pointAway === 3) {
				newCall = 'Deuce';
			}

			//Advantage Home
			if (pointHome === 4 && pointAway === 3) {
				newCall = 'Advantage';
				newCallDir = 0;
			}

			//Advantage Away
			if (pointHome === 3 && pointAway === 4) {
				newCall = 'Advantage';
				newCallDir = 1;
			}
		}

		//Game Home
		if (pointHome >= 4 && pointHome >= pointAway + 2) {
			pointHome = 0;
			pointAway = 0;
			gameHome++;
			newCall = 'Game';
			newCallDir = 0;
			setTimeout(resetCalls, 2000);
		}

		//Game Away
		if (pointAway >= 4 && pointAway >= pointHome + 2) {
			pointHome = 0;
			pointAway = 0;
			gameAway++;
			newCall = 'Game';
			newCallDir = 1;
			setTimeout(resetCalls, 2000);
		}

		//Back to Deuce
		if (pointHome === 4 && pointAway === 4) {
			pointHome = 3;
			pointAway = 3;
			newCall = 'Deuce';
		}

		//Update states
		setHomePoints(pointHome);
		setAwayPoints(pointAway);
		setHomeGames(gameHome);
		setAwayGames(gameAway);
		setHomeText(pointToText[pointHome]);
		setAwayText(pointToText[pointAway]);
		setCall(newCall);
		setCallDir(newCallDir);

	}

	return (
		<div className="flex justify-center mt-[400px]">
			<div className="w-2/4">
				<Grid>
					<Grid.Row>
						<Grid.Column width={2} className="p-2">
							<Button
								fluid
								content="+"
								size="massive"
								color="green"
								onClick={() => addPoint(0)}
							/>
						</Grid.Column>
						<Grid.Column width={2} className="p-2">
							<Segment className="p-4 text-center text-2xl">
								{homeGames}
							</Segment>
						</Grid.Column>
						<Grid.Column width={2} className="p-2">
							<Segment className="p-4 text-center text-2xl">
								{homeText}
							</Segment>
						</Grid.Column>
						<Grid.Column width={4} className="p-2">
							<Segment className="p-4 text-center text-2xl">
								<Grid className=''>
									<Grid.Row>
										<Grid.Column width={4}>
											{callDir === 0 && <Icon name="arrow left" />}
										</Grid.Column>
										<Grid.Column width={8}>
											{call}
										</Grid.Column>
										<Grid.Column width={4}>
											{callDir === 1 && <Icon name="arrow right" />}
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Segment>
						</Grid.Column>
						<Grid.Column width={2} className="p-2">
							<Segment className="p-4 text-center text-2xl">
								{awayText}
							</Segment>
						</Grid.Column>
						<Grid.Column width={2} className="p-2">
							<Segment className="p-4 text-center text-2xl">
								{awayGames}
							</Segment>
						</Grid.Column>
						<Grid.Column width={2} className="p-2">
							<Button
								fluid
								content="+"
								size="massive"
								color="green"
								onClick={() => addPoint(1)}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Button
					className="mt-[400px]"
					fluid
					content="Reset"
					size="massive"
					color="red"
					onClick={() => resetAll()}
				/>
			</div>
		</div>
	);
}

export default App;