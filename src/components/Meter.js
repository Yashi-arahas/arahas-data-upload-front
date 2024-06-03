import React from 'react';

export default function Meter(props) {
	const data = props.data;

	const total = Object.values(data).reduce((acc, curr) => acc + curr, 0);

	const generateRandomColor = () => {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		const hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		return hexColor;
	};

	const percentCalculator = (value) => {
		return (value / total) * 100;
	};

	const values = Object.entries(data).map(([key, value]) => {
		return {
			label: key,
			value: percentCalculator(value),
			color: generateRandomColor(),
		};
	});

	return (
		<div className='card-box d-flex w-100 justify-content-evenly' style={{padding:"0.5vw" }} >
			<div className='d-flex flex-column w-100'>
				{values.map((obj) => (
					<div className='mb-2' key={obj.label} style={{ fontSize:"0.9vw"}}>
						<div className='d-flex justify-content-between align-items-center'>
							<span className='d-inline-flex align-items-center'>
								<span
									className='d-inline-flex justify-content-center align-items-center text-center mr-2'
									style={{
										width: '1rem',
										height: '1rem',
										borderRadius: '50%',
										backgroundColor: obj.color
									}}
								></span>
								<span>{obj.label}</span>
							</span>
							<span>({Math.round(obj.value)}%)</span>
						</div>
						<div className='progress' style={{ height: '0.5vw' }}>
							<div
								className='progress-bar'
								role='progressbar'
								style={{ width: `${obj.value}%`, backgroundColor: obj.color }}
								aria-valuenow={obj.value}
								aria-valuemin='0'
								aria-valuemax='100'
							></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
