const textElement = document.querySelector('#text');
let state = {};
const optionsButtons = document.querySelector('#options-buttons');

function startGame() {
	state = {};
	showTextNode(1);
}
function showTextNode(textNodeIndex) {
	const textNode = textNodes.find((value) => value.id === textNodeIndex);
	console.log('textNode: ', textNode.text);
	textElement.innerText = textNode.text;

	while (optionsButtons.firstChild) {
		optionsButtons.removeChild(optionsButtons.firstChild);
	}
	textNode.options.forEach((v) => {
		if (showOption(v)) {
			const button = document.createElement('button');
			button.innerText = v.text;
			button.classList.add('btn');
			button.addEventListener('click', () => selectOption(v));
			optionsButtons.appendChild(button);
		}
	});
}
function showOption(option) {
	return option.requireState == null || option.requireState(state);
}
function selectOption(option) {
	const nextTextNodeId = option.nextText;
	if (nextTextNodeId <= 0) {
		return startGame();
	}
	state = Object.assign(state, option.setState);
	showTextNode(nextTextNodeId);
}

const textNodes = [
	{
		id: 1,
		text: 'Você acorda em um lugar estranho e vê um pote de gosma azul perto de você.',
		options: [
			{
				text: 'Pegue a gosma',
				setState: { blueGoo: true },
				nextText: 2,
			},
			{
				text: 'Deixe a gosma',
				nextText: 2,
			},
		],
	},
	{
		id: 2,
		text: 'Você se aventura em busca de respostas sobre onde você está quando se depara com um mercador.',
		options: [
			{
				text: 'Trade the goo for a sword',
				requiredState: (currentState) => currentState.blueGoo,
				setState: { blueGoo: false, sword: true },
				nextText: 3,
			},
			{
				text: 'Trade the goo for a shield',
				requiredState: (currentState) => currentState.blueGoo,
				setState: { blueGoo: false, shield: true },
				nextText: 3,
			},
			{
				text: 'Ignore the merchant',
				nextText: 3,
			},
		],
	},
	{
		id: 3,
		text: 'Depois de deixar o mercador, você começa a se sentir cansado e se depara com uma pequena cidade próxima a um castelo de aparência perigosa.',
		options: [
			{
				text: 'Explore the castle',
				nextText: 4,
			},
			{
				text: 'Find a room to sleep at in the town',
				nextText: 5,
			},
			{
				text: 'Encontre um pouco de feno em um estábulo para dormir',
				nextText: 6,
			},
		],
	},
	{
		id: 4,
		text: 'Você está tão cansado que adormece enquanto explora o castelo e é morto por algum monstro terrível em seu sono.',
		options: [
			{
				text: 'Restart',
				nextText: -1,
			},
		],
	},
	{
		id: 5,
		text: 'Sem dinheiro para comprar um quarto, você invade a pousada mais próxima e adormece. Depois de algumas horas de sono, o dono da pousada o encontra e manda o guarda da cidade trancá-lo em uma cela',
		options: [
			{
				text: 'Restart',
				nextText: -1,
			},
		],
	},
	{
		id: 6,
		text: 'Você acorda bem descansado e cheio de energia pronto para explorar o castelo próximo',
		options: [
			{
				text: 'Explore the castle',
				nextText: 7,
			},
		],
	},
	{
		id: 7,
		text: 'Ao explorar o castelo, você encontra um monstro horrível em seu caminho.',
		options: [
			{
				text: 'Try to run',
				nextText: 8,
			},
			{
				text: 'Attack it with your sword',
				requiredState: (currentState) => currentState.sword,
				nextText: 9,
			},
			{
				text: 'Hide behind your shield',
				requiredState: (currentState) => currentState.shield,
				nextText: 10,
			},
			{
				text: 'Throw the blue goo at it',
				requiredState: (currentState) => currentState.blueGoo,
				nextText: 11,
			},
		],
	},
	{
		id: 8,
		text: 'Suas tentativas de correr são em vão e o monstro pega facilmente.',
		options: [
			{
				text: 'Restart',
				nextText: -1,
			},
		],
	},
	{
		id: 9,
		text: 'Você tolamente pensou que este monstro poderia ser morto com uma única espada.',
		options: [
			{
				text: 'Restart',
				nextText: -1,
			},
		],
	},
	{
		id: 10,
		text: 'The monster laughed as you hid behind your shield and ate you.',
		options: [
			{
				text: 'Restart',
				nextText: -1,
			},
		],
	},
	{
		id: 11,
		text: 'Você jogou seu pote de gosma no monstro e ele explodiu. Depois que a poeira baixou, você viu que o monstro foi destruído. Vendo sua vitória, você decide reivindicar este castelo como seu e viver o resto de seus dias lá.',
		options: [
			{
				text: 'Congratulations. Play Again.',
				nextText: -1,
			},
		],
	},
];

startGame();
