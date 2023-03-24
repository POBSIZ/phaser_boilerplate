/**
 * 캐릭터 클래스
 */

import Phaser from 'phaser';
import Orb from './item/orb';
import _ from 'underscore';

export default class Player extends Phaser.Physics.Arcade.Sprite {
	// 	초기화
	constructor(scene, x, y, items, getList, enemy) {
		super(scene, x, y);

		// 먹은 아이템 리스트
		this.getList = getList;

		// 	장면 객체 저장
		this.scene = scene;

		// 	캐릭터 설정
		this.setTexture('player');
		this.setPosition(x, y);
		this.setDepth(5);
		this.scale = 0.3;
		this.speed = 4;
		this.look = 'right';
		this.health = 50;

		// 이동키 설정(키보드)
		this.key = {
			up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
			down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
			left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
			right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
		};

		// 	장면에 추가
		scene.add.existing(this); // 장면 추가
		scene.physics.add.existing(this); // 물리엔진 추가
		scene.physics.add.collider(this);
		// this.setCollideWorldBounds(true); // 맵 밖으로 나가는거 방지

		// 오브 획득시
		scene.physics.add.overlap(this, items, this.hitOrb, null, this);

		// 피격 데미지 간격 조정
		this.hitByEnemy = _.throttle(() => {
			this.hitEnemy();
		}, 50);

		// 소주에 피격시
		scene.physics.add.overlap(this, enemy[0], this.hitByEnemy, null, this);

		// 담배에 피격시
		scene.physics.add.overlap(this, enemy[1], this.hitByEnemy, null, this);

		// 업데이트 이벤트 적용
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.handleMovement, this);
	}

	// 	갱신
	handleMovement() {
		// 	추가해둔 키가 눌리면 isDown 속성이 true로 변경 해당 speed 반영 좌표 변경됨
		if (this.key.up.isDown) {
			this.y -= this.speed;
			if (this.look === 'right') {
				this.anims.play('player_right_run', true);
			} else if (this.look === 'left') {
				this.anims.play('player_left_run', true);
			}
		}

		if (this.key.down.isDown) {
			this.y += this.speed;
			if (this.look === 'right') {
				this.anims.play('player_right_run', true);
			} else if (this.look === 'left') {
				this.anims.play('player_left_run', true);
			}
		}

		if (this.key.left.isDown) {
			this.x -= this.speed;
			this.look = 'left';
			this.play('player_left_run', true);
		}

		if (this.key.right.isDown) {
			this.x += this.speed;
			this.look = 'right';
			this.play('player_right_run', true);
		}

		if (
			!this.key.up.isDown &&
			!this.key.down.isDown &&
			!this.key.left.isDown &&
			!this.key.right.isDown
		) {
			if (this.look === 'right') {
				this.anims.play('player_right_idle', true);
			} else if (this.look === 'left') {
				this.anims.play('player_left_idle', true);
			}
		}
	}

	hitOrb(player, orb) {
		if (this.getList.findIndex((e) => e === 'red') !== -1) {
			this.getList.splice(
				this.getList.findIndex((e) => e === 'red'),
				this.getList.findIndex((e) => e === 'red') + 1
			);
		}

		if (this.getList.findIndex((e) => e === 'blue') !== -1) {
			this.getList.splice(
				this.getList.findIndex((e) => e === 'blue'),
				this.getList.findIndex((e) => e === 'blue') + 1
			);
		}

		if (!this.getList.includes(orb.type)) {
			this.getList.push(orb.type);
			this.scene.events.emit('getOrb', this.getList);
		}

		if (this.getList[1] === 'red') {
			this.scene.events.emit('getScore', this.scene.sojuGroup.getLength());
			this.scene.sojuGroup.clear(true, true);
			this.getList.splice(0, this.getList.length);
		}

		if (this.getList[1] === 'blue') {
			this.scene.events.emit('getScore', this.scene.tobaccoGroup.getLength());
			this.scene.tobaccoGroup.clear(true, true);
			this.getList.splice(0, this.getList.length);
		}

		orb.destroy();
	}

	hitEnemy(player, enemy) {
		if (this.health <= 0) {
			this.scene.cameras.main.fade(1000, 0, 0, 0);
			this.scene.scene.transition({ target: 'gameover', duration: 500 });
		} else {
			this.health -= 1;
			this.scene.events.emit('hit', this.health);
		}
	}
}