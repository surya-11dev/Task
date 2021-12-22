const hexColorCode = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	"a",
	"b",
	"c",
	"d",
	"e",
	"f"
];

const mainSection = document.getElementById("mainSection");
const pickColor = document.getElementById("pickColor");
const pickButton = document.getElementById("pickButton");
const copyButton = document.getElementById("copyButton");

pickButton.addEventListener("click", () => {
	let hexColorName = "#";

	for (let i = 0; i < 6; i++) {
		hexColorName += hexColorCode[getRandomArray()];
	}

	pickColor.style.color = hexColorName;
	pickColor.textContent = hexColorName;
	mainSection.style.backgroundColor = hexColorName;
});

const getRandomArray = () => {
	return Math.floor(Math.random() * hexColorCode.length);
};


copyButton.addEventListener("click", () => {
	const useRange = document.createRange();
	const useSelection = window.getSelection();

	useRange.selectNodeContents(pickColor);
	useSelection.removeAllRanges();
	useSelection.addRange(useRange);
	document.execCommand("copy");
});


