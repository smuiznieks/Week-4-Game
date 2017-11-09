var yourCharacterActivated = false;
var enemyActivated = false;

var yourCharacter = {
	name: '',
	healthPoints: '',
	attackPower: '',
	counterAttackPower: 0,
};

var currentDefender = {
	name: '',
	healthPoints: '',
	attackPower: '',
};

var	Korr = {
	name: 'Korr',
	healthPoints: 100,
	attackPower: 4,
	//enemy: true,
};

var Maz = {
	name: 'Maz',
	healthPoints: 120,
	attackPower: 8,
	//enemy: true,
};
	
var Rey = {
	name: 'Rey',
	healthPoints: 150,
	attackPower: 12,
	//enemy: true,
};

var Leia = {
	name: 'Leia',
	healthPoints: 180,
	attackPower: 16,
	//enemy: true,
};

var availableCharacters = [Korr, Maz, Rey, Leia];

$('.character').on('click', function() {
	$('.duelStats').empty();
	if (enemyActivated === true) {
	}
	else if (yourCharacterActivated === true) {
		currentDefender.name = $(this).attr('id');
		for (i = 0; i < availableCharacters.length; i++)  {
			if (currentDefender.name === availableCharacters[i].name) {
				$('.defender').append($(this));
				enemyActivated = true;
				currentDefender.healthPoints = availableCharacters[i].healthPoints;
				currentDefender.attackPower = availableCharacters[i].attackPower;
				console.log(currentDefender);
			}
		}
	}
	if (yourCharacterActivated === false) {
		$('#enemies').append('Enemies Available to Attack:');
		yourCharacter.name = $(this).attr('id');
		for (i = 0; i < availableCharacters.length; i++) {
			if (yourCharacter.name === availableCharacters[i].name) {
				$('.activeCharacter').append($(this));
				yourCharacterActivated = true;
				//availableCharacters[i].enemy = false;
				yourCharacter.healthPoints = availableCharacters[i].healthPoints;
				yourCharacter.attackPower = availableCharacters[i].attackPower;
				console.log(yourCharacter); 
			}
			else {
				$('.availableEnemies').append($('.roster'));
			}
		}
	}
});

var wins = 0;

$('.attack').on('click', function() {
	if (yourCharacterActivated === false) {
		$('.duelStats').empty();
		$('.duelStats').append('<br>' + 'Select your character.');
	}
	else if (enemyActivated === false) {
		$('.duelStats').empty();
		$('.duelStats').append('<br>' + 'Select your opponent.');
	}
	else {
		yourCharacter.counterAttackPower++;
		var currentPower = (yourCharacter.counterAttackPower * yourCharacter.attackPower);
		$('.duelStats').empty();
		$('.duelStats').append('<br>' + 'You attacked ' + currentDefender.name + ' for ' + (currentPower) + ' points.' + '<br>');
		$('.duelStats').append(currentDefender.name + ' attacked  you for ' + currentDefender.attackPower + ' points.');
		yourCharacter.healthPoints = (yourCharacter.healthPoints - currentDefender.attackPower);
		currentDefender.healthPoints = (currentDefender.healthPoints - currentPower);
		
		if (currentDefender.healthPoints < 1) {
			$('.defender').empty();
			$('.duelStats').append('<br>' + 'You have defeated ' + currentDefender.name + '!');
			enemyActivated = false;
			wins++;
		}

		else if (yourCharacter.healthPoints < 1) {
			$('.activeCharacter').empty();
			$('.duelStats').append('<br>' + 'You have been defeated by ' + currentDefender.name + '. Try again.');
		}

		else {
			$('.duelStats').append('<br>' + 'Your Health Points: ' + yourCharacter.healthPoints);
			$('.duelStats').append('<br>' + currentDefender.name + ' Health Points: ' + currentDefender.healthPoints);
		}
	}
});
