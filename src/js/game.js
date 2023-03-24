import Phaser from 'phaser';

import GUI from 'SCENE/gui';

import Main from 'SCENE/main';

const width = window.innerWidth;
const height = window.innerHeight;

const config = {
	type: Phaser.AUTO,
	width: width,
	height: height,
	transparent: true,
	// 물리엔진
	physics: {
		default: 'arcade', // 아케이드 엔진
		arcade: {
			debug: false, // 디버깅 사용
		},
	},
	scale: {
		mode: Phaser.Scale.FIT, // 자동 맞춤
		autoCenter: Phaser.Scale.CENTER_BOTH, // 가로세로 모두 맞춤
		width: width, // 비율 설정용 너비
		height: height, // 비율 설정용 높이
	},
	// 장면 설정
	//scene 여러개 설정시 좌측 scene == 초기화면
	scene: [Main, GUI],
};

const game = new Phaser.Game(config);