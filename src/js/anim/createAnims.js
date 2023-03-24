export default function createAnims(scene) {
	// player right idle 애니메이션 생성
	scene.anims.create({
		key: 'player_right_idle',
		frames: scene.anims.generateFrameNumbers('player_right_idle', {
			start: 0,
			end: 4,
		}),
		frameRate: 5,
		repeat: -1,
	});

	// player_left_idle 애니메이션 생성
	scene.anims.create({
		key: 'player_left_idle',
		frames: scene.anims.generateFrameNumbers('player_left_idle', {
			start: 0,
			end: 4,
		}),
		frameRate: 5,
		repeat: -1,
	});

	// player_right_run 애니메이션 생성
	scene.anims.create({
		key: 'player_right_run',
		frames: scene.anims.generateFrameNames('player_right_run', {
			start: 0,
			end: 4,
		}),
		frameRate: 5,
		repeat: -1,
	});

	// player_left_run 애니메이션 생성
	scene.anims.create({
		key: 'player_left_run',
		frames: scene.anims.generateFrameNames('player_left_run', {
			start: 0,
			end: 4,
		}),
		frameRate: 5,
		repeat: -1,
	});

	// soju_run 애니메이션 생성
	scene.anims.create({
		key: 'soju_run',
		frames: scene.anims.generateFrameNames('soju', {
			start: 0,
			end: 7,
		}),
		frameRate: 5,
		repeat: -1,
	});

	// tobacco_right_run 애니메이션 생성
	scene.anims.create({
		key: 'tobacco_right_run',
		frames: scene.anims.generateFrameNames('tobacco_right_run', {
			start: 0,
			end: 2,
		}),
		frameRate: 5,
		repeat: -1,
	});

	// tobacco_right_run 애니메이션 생성
	scene.anims.create({
		key: 'tobacco_left_run',
		frames: scene.anims.generateFrameNames('tobacco_left_run', {
			start: 2,
			end: 0,
		}),
		frameRate: 5,
		repeat: -1,
	});
}