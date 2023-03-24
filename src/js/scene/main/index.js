import Phaser from 'phaser';

import _ from 'underscore';

import mainLoadAssets from 'ASSETS/main';

export default class Main extends Phaser.Scene {
	constructor() {
		super('main');
	}

	// 초기화
	init() {}

	// 사전 설정
	preload() {
		mainLoadAssets(this);
	}

	// 생성
	create() {
		// 메인 카메라의 x, y, 높이, 폭 가져오기
		const { x, y, width, height } = this.cameras.main;

		// 중앙 좌표 가져오기
		const center = {
			x: x + width / 2,
			y: y + height / 2,
		};
		
		// this.add.image(0, 0, 'bg')
		// 	.setOrigin(0, 0);
	}

	// 변경(갱신)
	update() {}
}