import React, {Component} from 'react';
import './App.css';

const tableConfig = {
	defaultFontSize: 10,
	defaultFontFamily: 'Arial, Helvetica, sans-serif'
}

const tableData = {
	'MaxPerRow': 12,
	'Rows': {
		1: [
			{
				'Text': '1',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '2',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '3',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '4',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '5',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '6',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '7',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '8',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '9',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '10',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '11',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '12',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			}
		],
		2: [
			{
				'Text': '13',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '14',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '15',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '16',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '17',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '18',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '19',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '20',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '21',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '22',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '23',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '24',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			}
		],
		3: [
			{
				'Text': '25',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '26',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '27',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '28',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '29',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '30',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '31',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '32',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '33',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '34',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '35',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '36',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			}
		],
		4: [
			{
				'Text': '37',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '38',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '39',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '40',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '41',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '42',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '43',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '44',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '45',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '46',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '47',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '48',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			}
		],
		5: [
			{
				'Text': '49',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '2',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '50',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '51',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '52',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '53',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '54',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '55',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '56',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '57',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '58',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '59',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			}
		],
		6: [
			{
				'Text': '60',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '61',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '62',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '63',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '64',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '65',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '66',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '67',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '68',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '69',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '70',
				'BackColor': '#181818',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			},
			{
				'Text': '71',
				'BackColor': '#F22E1A',
				'TextColor': 'white',
				'Size': {
					'Y': 25,
					'X': 25,
				}
			}
		]
	}
}

class App extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.buildTable();
	}

	makeTableDesignRow(args) {
		this.currentIndex += 1;
		//console.log('Table row - ', args)

		this.ctx.beginPath()
		// x = left/right if - right, if normal left
		// y = top/bottom if - bottom, if top left

		this.ctx.fillStyle = args.BackColor;
		this.ctx.fillRect(this.currentX, this.currentY,
		                  args.Size.X, args.Size.Y
		)
		this.ctx.fill();

		this.ctx.closePath();

		this.shapesMap[args.Text] = {
			Text: args.Text,
			Width: args.Size.X,
			Height: args.Size.Y,
			Row: this.currentRow,
			HorzCords: this.currentX,
			VertiCords: this.currentY,
			FontFamily: args.FontFamily || tableConfig.defaultFontFamily,
			FontSize: args.FontSize || tableConfig.defaultFontSize
		}

		this.currentX += args.Size.X;
		//this.ctx.arc(args.Size.X, args.Size.Y)

		if (tableData['MaxPerRow'] == this.currentIndex) {
			this.currentRow += 1;
			this.currentX = 0;
			this.currentY += args.Size.Y;
			this.currentIndex = 0;
		}
	}

	makeTableTextRow(args) {
		this.currentIndex += 1;
		//console.log('Table row - Text - ', args)

		const fontFamily = args.FontFamily || tableConfig.defaultFontFamily
		const fontSize = args.FontSize || tableConfig.defaultFontSize;
		const moveHoriz = (
			this.currentX + (
			args.Size.X / 2
			) - (
			fontSize / 2
			)
		);
		const moveVerti = this.currentY + (
			args.Size.Y / 2
		)

		this.ctx.beginPath()

		this.ctx.moveTo(moveHoriz, moveVerti)

		this.ctx.font = fontSize + "px " + fontFamily;
		this.ctx.fillStyle = args.TextColor;
		this.ctx.textBaseline = "left";
		this.ctx.fillText(args.Text, moveHoriz, moveVerti)
		this.ctx.fill()

		this.ctx.closePath();

		this.currentX += args.Size.X;
		//this.ctx.arc(args.Size.X, args.Size.Y)

		if (tableData['MaxPerRow'] === this.currentIndex) {
			this.currentRow += 1;
			this.currentX = 0;
			this.currentY += args.Size.Y;
			this.currentIndex = 0;
		}
	}

	makeTableHighlightRow(args) {
		console.log('Table row - Highlight', args)


		const fontFamily = args.FontFamily || tableConfig.defaultFontFamily
		const fontSize = args.FontSize || tableConfig.defaultFontSize;
		const moveHoriz = (
			this.HorzCords + (
				args.Width / 2
			) - (
				fontSize / 2
			)
		);
		const moveVerti = this.CanvasVertiCords + (
			args.Height / 2
		)

		this.ctx.beginPath()
		// x = left/right if - right, if normal left
		// y = top/bottom if - bottom, if top left

		this.ctx.fillStyle = "red";
		this.ctx.fillRect(args.HorzCords, this.VertiCords,
		                  args.Width, args.Height
		)
		this.ctx.fill();


		this.ctx.moveTo(moveHoriz, moveVerti)

		this.ctx.font = fontSize + "px " + fontFamily;
		this.ctx.fillStyle = args.TextColor;
		this.ctx.textBaseline = "left";
		this.ctx.fillText(args.Text, moveHoriz, moveVerti)
		this.ctx.fill()

		this.ctx.closePath();
	}

	buildTableDesign() {
		this.currentY = 0;
		this.currentX = 0;
		this.currentRow = 0;
		this.currentIndex = 0;
		this.shapesMap = {};
		this.table = document.querySelector('#tableDesign');
		this.ctx = this.table.getContext('2d');

		Object.keys(tableData['Rows']).forEach((curRow, index) => {
			tableData['Rows'][curRow].map(this.makeTableDesignRow.bind(this))
		})
	}

	buildTableText() {
		this.currentY = 0;
		this.currentX = 0;
		this.currentRow = 0;
		this.currentIndex = 0;
		this.table = document.querySelector('#tableText');
		this.ctx = this.table.getContext('2d');

		Object.keys(tableData['Rows']).forEach((curRow, index) => {
			tableData['Rows'][curRow].map(this.makeTableTextRow.bind(this))
		})
	}

	buildTableHighlight(event) {
		this.currentY = 0;
		this.currentX = 0;
		this.currentRow = 1;
		this.currentIndex = 0;
		this.currentMouseX = event.clientX;
		this.currentMouseY = event.clientY;
		this.table = document.querySelector('#tableHighlight');
		this.ctx = this.table.getContext('2d');

		const shapeMapped = this.shapesMap;

		if(Object.keys(shapeMapped).length > 0) {
			Object.keys(shapeMapped).forEach((curRow, index) => {
				const shapeWidth = shapeMapped[curRow].Width;
				const shapeHeight = shapeMapped[curRow].Height;
				const shapeHorizPos = shapeMapped[curRow].HorzCords;
				const shapeVertiPos = shapeMapped[curRow].VertiCords;
				const tableBindings = this.table.getBoundingClientRect();


				if(shapeMapped[curRow].Text == "60") {
					console.log('Text', shapeMapped[curRow].Text,
					            'X:', tableBindings.x,
					            'Y', tableBindings.y,
								'X Still inside ',tableBindings.x, shapeHorizPos + shapeWidth,
					            'Y Still inside ', tableBindings.y, shapeVertiPos + shapeHeight,
					            shapeHorizPos,
					            shapeVertiPos,
					            tableBindings,
					            shapeMapped[curRow].Row,
					            this.currentRow
					)
				}

				if(
					shapeMapped[curRow].Row == this.currentRow

					&& tableBindings.x <= (shapeHorizPos)
					&& tableBindings.y <= (shapeVertiPos)
					||
					shapeMapped[curRow].Row == this.currentRow
					&& tableBindings.x <= (shapeHorizPos + shapeWidth)
					&& tableBindings.y <= (shapeVertiPos + shapeHeight)
				){
					this.makeTableHighlightRow(shapeMapped[curRow])
				}
			})
		}
	}

	buildTable() {
		this.buildTableDesign();
		this.buildTableText();
	}

	refreshTable(){
		this.buildTableDesign();
		this.buildTableText();
	}

	render() {
		return (
			<div className="App">
				<canvas id="tableDesign" className="canvas canvas-design"></canvas>
				<canvas id="tableText" className="canvas canvas-text"></canvas>
				<canvas id="tableHighlight" className="canvas canvas-highlight"
				        onMouseLeave={this.refreshTable.bind(this)}
				        onClick={this.buildTableHighlight.bind(this)}
				        onMouseMove={this.buildTableHighlight.bind(this)}
				></canvas>
			</div>
		);
	}
}

export default App;
