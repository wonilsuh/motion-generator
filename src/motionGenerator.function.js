/*-----------------------------------------------------
 *	generates motion parameters based on the distance (amount og change) of the motion.
 *	@param 		{float}		distance - the distance or amount of change in pixels, or percent in the case of fade.
 *	@param 		{float} 	size - the size (area) of the element to be animated, in px^2. passing 20 will result in the standard speed.
 *	@param 		{string} 	mode - ["move"|"scale"|"fade"]. 
 * 	@param 		{int}		version - NOT USED IN THIS VERSION
 *	@param 		{object} 	params - NOT USED IN THIS VERSION
 *	@returns	{object}	an example return object structure is as follows
							{
								"meta":{
									"version":6,
									"params":{}
								},
								"input":{
									"distance":100
									"size":20
								},
								"natural":{
									"curves":{
										"easeInOut":"cubic-bezier(0.4, 0.14, 0.3, 1)",
										"easeIn":"cubic-bezier(0.4, 0.14, 1, 1)",
										"easeOut":"cubic-bezier(0, 0, 0.3, 1)"
									},
									"speed":1600,
									"duration":80
								},
								"mechanical":{
									"curves":{
										"easeInOut":'cubic-bezier(0.2, 0.2, 0.38, 0.9)',
										"easeIn":'cubic-bezier(0.2, 0, 1, 0.9)',
										"easeOut":'cubic-bezier(0, 0, 0.38, 0.9)'
									},
									"speed":2100,
									"duration":60
								},
								speedUnit:'px/s',
								durationUnit:'ms'
							}
							* passing null for @param:mode will return a slightly different object that contains motion definitions for all three modes.
 */
import "babel-polyfill";
const motionGenerator = (distance, size = 20, mode = 'move', version = 7, params = {}) => {
	// console.log('npm:motionCalc:motionGenerator...', params.sizeFactorAdjuster);

	let ret;

	switch(version){

		default:
		case 6:{
			const 
				MODES = ['move', 'scale', 'fade'],
				SIZE_BASE = 20,
				M_MIN = 80,
				N_MIN = 110
			;
			
			let 
				sizeFactorNatural = Math.min(1.5, Math.pow(SIZE_BASE /size, 0.1 *params.sizeFactorAdjuster || 1)),
				sizeFactorMechanical = Math.min(1.5, Math.pow(SIZE_BASE /size, 0.05 *params.sizeFactorAdjuster || 1))
			;

			distance = parseFloat(distance);
			size = parseFloat(size);
			params.sizeFactorAdjuster = parseFloat(params.sizeFactorAdjuster);

			ret = {
				'meta':{
					version,
					params
				},
				'input':{
					distance,
					size,
					sizeFactorAdjuster:params.sizeFactorAdjuster
				},
				'move':{
					natural:{
						curves:{
							easeInOut:'cubic-bezier(0.4, 0.14, 0.3, 1)',
							easeIn:'cubic-bezier(0.4, 0.14, 1, 1)',
							easeOut:'cubic-bezier(0, 0, 0.3, 1)'
						},
						speed:3 *distance +1200 *sizeFactorNatural
					},
					mechanical:{
						curves:{
							easeInOut:'cubic-bezier(0.2, 0.2, 0.38, 0.9)',
							easeIn:'cubic-bezier(0.2, 0, 1, 1)',
							easeOut:'cubic-bezier(0, 0, 0.38, 0.9)'
						},
						speed:5 *distance +2500 *sizeFactorMechanical
					},
					speedUnit:'px/s',
					durationUnit:'ms'
				},
				'scale':{
					natural:{
						curves:{
							easeInOut:'cubic-bezier(0.4, 0.14, 0.3, 1)',
							easeIn:'cubic-bezier(0.4, 0.14, 1, 1)',
							easeOut:'cubic-bezier(0, 0, 0.3, 1)'
						},
						speed:3 *distance +1200 *sizeFactorNatural
					},
					mechanical:{
						curves:{
							easeInOut:'cubic-bezier(0.2, 0.2, 0.38, 0.9)',
							easeIn:'cubic-bezier(0.2, 0, 1, 1)',
							easeOut:'cubic-bezier(0, 0, 0.38, 0.9)'
						},
						speed:5 *distance +2500 *sizeFactorMechanical
					},
					speedUnit:'px/s',
					durationUnit:'ms'
				},
				'fade':{
					natural:{
						curves:{
							easeInOut:'cubic-bezier(0.4, 0.14, 0.3, 1)',
							easeIn:'cubic-bezier(0.4, 0.14, 1, 1)',
							easeOut:'cubic-bezier(0, 0, 0.3, 1)'
						},
						duration:Math.max(6, 0.01 *distance +5.4285714284) / 60 * 1000 /sizeFactorNatural
					},
					mechanical:{
						curves:{
							easeInOut:'cubic-bezier(0.2, 0.2, 0.38, 0.9)',
							easeIn:'cubic-bezier(0.2, 0, 1, 0.9)',
							easeOut:'cubic-bezier(0, 0, 0.38, 0.9)'
						},
						duration:Math.max(6, 0.005357142857 *distance +3.257142857) /sizeFactorMechanical
					}
				}
			};

			ret.move.natural.duration = Math.max(N_MIN, distance /ret.move.natural.speed *1000);
			ret.move.mechanical.duration = Math.max(M_MIN, distance /ret.move.mechanical.speed *1000);
			ret.scale.natural.duration = Math.max(N_MIN, distance /ret.scale.natural.speed *1000);
			ret.scale.mechanical.duration = Math.max(M_MIN, distance /ret.scale.mechanical.speed *1000);
			ret.fade.natural.speed = distance / ret.fade.natural.duration *1000;
			ret.fade.mechanical.speed = distance / ret.fade.mechanical.duration *1000;

			// if(
			// 	mode != null
			// 	&& MODES.find( entry => entry === mode) != null
			// ) ret = {
			// 	meta:{
			// 		...ret.meta,
			// 		mode
			// 	},
			// 	input:ret.input,
			// 	...ret[mode]
			// }
			break;
		}

		case 7:{

			const 
				MODES = ['move', 'scale', 'fade'],
				SIZE_BASE = 20,
				M_MIN = 100,
				N_MIN = 110
			;
			
			let 
				sizeFactorNatural = Math.min(1.5, Math.pow(SIZE_BASE /size, 0.1 *params.sizeFactorAdjuster || 1)),
				sizeFactorMechanical = Math.min(1.5, Math.pow(SIZE_BASE /size, 0.05 *params.sizeFactorAdjuster || 1))
			;

			distance = parseFloat(distance);
			size = parseFloat(size);
			params.sizeFactorAdjuster = parseFloat(params.sizeFactorAdjuster);

			ret = {
				'meta':{
					version,
					params
				},
				'input':{
					distance,
					size,
					sizeFactorAdjuster:params.sizeFactorAdjuster
				},
				'move':{
					natural:{
						curves:{
							easeInOut:'cubic-bezier(0.4, 0.14, 0.3, 1)',
							easeIn:'cubic-bezier(0.4, 0.14, 1, 1)',
							easeOut:'cubic-bezier(0, 0, 0.3, 1)'
						}
					},
					mechanical:{
						curves:{
							easeInOut:'cubic-bezier(0.2, 0.2, 0.38, 0.9)',
							easeIn:'cubic-bezier(0.2, 0.1, 1, 1)',
							easeOut:'cubic-bezier(0, 0, 0.38, 0.9)'
						}
					},
					speedUnit:'px/s',
					durationUnit:'ms'
				},
				'scale':{
					natural:{
						curves:{
							easeInOut:'cubic-bezier(0.4, 0.14, 0.3, 1)',
							easeIn:'cubic-bezier(0.4, 0.14, 1, 1)',
							easeOut:'cubic-bezier(0, 0, 0.3, 1)'
						}
					},
					mechanical:{
						curves:{
							easeInOut:'cubic-bezier(0.2, 0.2, 0.38, 0.9)',
							easeIn:'cubic-bezier(0.4, 0.1, 1, 1)',
							easeOut:'cubic-bezier(0, 0, 0.38, 0.9)'
						}
					},
					speedUnit:'px/s',
					durationUnit:'ms'
				},
				'fade':{
					natural:{
						curves:{
							easeInOut:'cubic-bezier(0.4, 0.14, 0.3, 1)',
							easeIn:'cubic-bezier(0.4, 0.14, 1, 1)',
							easeOut:'cubic-bezier(0, 0, 0.3, 1)'
						},
						duration:Math.max(6, 0.01 *distance +5.4285714284) / 60 * 1000 /sizeFactorNatural
					},
					mechanical:{
						curves:{
							easeInOut:'cubic-bezier(0.2, 0.2, 0.38, 0.9)',
							easeIn:'cubic-bezier(0.2, 0, 1, 0.9)',
							easeOut:'cubic-bezier(0, 0, 0.38, 0.9)'
						},
						duration:Math.max(6, 0.005357142857 *distance +3.257142857) /sizeFactorMechanical
					}
				}
			};

			// generate duration and speed for move
			ret.move.natural.duration = Math.max(
				Math.min(0.1 *distance +112, 142),
				distance /(3 *distance +1200 *sizeFactorNatural) *1000
			);
			// ret.move.natural.speed = distance /ret.move.natural.duration;

			ret.move.mechanical.duration = Math.max(
				Math.min(0.03 *distance +95, 140),
				distance /(5 *distance +2500 *sizeFactorMechanical) *1000
			);
			// ret.move.natural.speed = distance /ret.move.mechanical.duration;

			// copy move durationa and speed over to scale
			ret.scale.natural.speed = ret.scale.natural.speed;
			ret.scale.natural.duration = ret.scale.natural.duration;
			ret.scale.mechanical.speed = ret.scale.mechanical.speed;
			ret.scale.mechanical.duration = ret.scale.mechanical.duration;

			ret.fade.natural.speed = distance / ret.fade.natural.duration *1000;
			ret.fade.mechanical.speed = distance / ret.fade.mechanical.duration *1000;

			// if(
			// 	mode != null
			// 	&& MODES.find( entry => entry === mode) != null
			// ) ret = {
			// 	meta:{
			// 		...ret.meta,
			// 		mode
			// 	},
			// 	input:ret.input,
			// 	...ret[mode]
			// };
		}
	}

	return {
		meta:{
			...ret.meta,
			mode
		},
		input:ret.input,
		...ret[mode]
	};
}

export default motionGenerator;