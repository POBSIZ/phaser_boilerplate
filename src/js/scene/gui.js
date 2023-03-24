/**
 * GUI 화면
 */

import Phaser from 'phaser';

import _ from 'underscore';

import guiLoadAssets from 'ASSETS/gui';

export default class GUI extends Phaser.Scene {
	constructor() {
		super({ key: 'gui', active: true });
	}

	// 초기화
	init() {}

	// 사전 설정
	preload() {
		guiLoadAssets(this);
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

		// 그래픽 인스턴스 생성
		this.graphics = this.add.graphics();

		// 카드 패드 생성
		const card_pad_width = width * 0.8;
		const card_pad_config = {
			x: (width - card_pad_width) / 2,
			y: (center.y * 8) / 5,
			width: card_pad_width,
			height: 100,
			border: 8,
			fill: 0x505050,
			opacity: 1,
		};
		this.graphics.fillStyle(card_pad_config.fill, card_pad_config.opacity);
		this.graphics.fillRoundedRect(
			card_pad_config.x,
			card_pad_config.y,
			card_pad_config.width,
			card_pad_config.height,
			card_pad_config.border
		);
		this.graphics.setInteractive({
			useHandCursor: true,
			hitArea: new Phaser.Geom.Rectangle(
				card_pad_config.x,
				card_pad_config.y,
				card_pad_config.width,
				card_pad_config.height
			),
			hitAreaCallback: Phaser.Geom.Rectangle.Contains,
		});
		this.graphics.on(
			'pointerdown',
			(ptr) => {
				console.log(ptr);
			},
			this
		);
	}

	// 변경(갱신)
	update() {}
}