import React, {Component} from 'react';
import * as PIXI from 'pixi.js';
import './App.css';


// Mouse & touch events are normalized into
// the pointer* events for handling different
// button events.
//    .on('pointerdown', alert(this.currentX))
//    .on('pointerup', alert(this.currentX))
//    .on('pointerupoutside', alert(this.currentX))
//    .on('pointertap', () => console.log(this.currentY))
//    .on('pointerover', alert(this.currentX))
//    .on('pointerout', alert(this.currentX));

// Use mouse-only events
// .on('mousedown', onButtonDown)
// .on('mouseup', onButtonUp)
// .on('mouseupoutside', onButtonUp)
//.on('mouseover', alert(this.currentX))
// .on('mouseout', onButtonOut)

// Use touch-only events
//.on('touchstart', alert(this.currentX))
// .on('touchend', onButtonUp)
// .on('touchendoutside', onButtonUp)

const tableConfig = {
    defaultBorderSize: 1,
    defaultFontSize: 10,
    defaultFontFamily: 'Arial, Helvetica, sans-serif',
    defaultFontThickness: 0,
    defaultFontWeight: 'normal',
    defaultHoverBackColor: '#4D4DFF',
    defaultHoverBorderColor: '#4D4DFF',
}

const tableData = {
    'MaxPerRow': 12,
    'Rows': {
        1: [
            {
                'Text': '1',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#f9fbf5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '2',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '3',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '4',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '5',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '6',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '7',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '8',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '9',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '10',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '11',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '12',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            }
        ],
        2: [
            {
                'Text': '13',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '14',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '15',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '16',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '17',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '18',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '19',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '20',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '21',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '22',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '23',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '24',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            }
        ],
        3: [
            {
                'Text': '25',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '26',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '27',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '28',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '29',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '30',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '31',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '32',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '33',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '34',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '35',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '36',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            }
        ],
        4: [
            {
                'Text': '37',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '38',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '39',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '40',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '41',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '42',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '43',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '44',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '45',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '46',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '47',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '48',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            }
        ],
        5: [
            {
                'Text': '49',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '2',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '50',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '51',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '52',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '53',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '54',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '55',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '56',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '57',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '58',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '59',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            }
        ],
        6: [
            {
                'Text': '60',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '61',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '62',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '63',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '64',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '65',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '66',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '67',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '68',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '69',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '70',
                'BackColor': '#181818',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
                }
            },
            {
                'Text': '71',
                'BackColor': '#F22E1A',
                'TextColor': 'white',
                'Border': '#F9FBF5',
                'Size': {
                    'Y': 60,
                    'X': 60,
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
        this.allowAlert = false;
        this.pixiTableDesign = new PIXI.Application(900, 315);
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        const TableContainer = document.querySelector('#App')

        const TableDesign = this.makeCanvas(this.pixiTableDesign, 'tableDesign', ['canvas', 'canvas-design']);

        // Make Design Canvas
        TableContainer.appendChild(TableDesign.view);

        this.buildTable();
    }

    getChipValue() {
        return this.chipValue;
    }

    setChipValue(chipValue) {
        this.chipValue = chipValue;
    }

    onShapeHoverIN(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const Shape = shapeMap.Shape.Graphic;

        Shape.beginFill(shapeMap.Shape.HoverBackColor, 1);
        Shape.lineStyle(shapeMap.Shape.HoverBorderSize, shapeMap.Shape.HoverBorderColor);
        Shape.drawRect(shapeMap.Shape.X, shapeMap.Shape.Y, shapeMap.Shape.Width, shapeMap.Shape.Height);
        Shape.endFill();
    }

    onShapeHoverOUT(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const Shape = shapeMap.Shape.Graphic;

        Shape.beginFill(shapeMap.Shape.NormalBackColor, 1);
        Shape.lineStyle(shapeMap.Shape.NormalBorderSize, shapeMap.Shape.NormalBorderColor);
        Shape.drawRect(shapeMap.Shape.X, shapeMap.Shape.Y, shapeMap.Shape.Width, shapeMap.Shape.Height);
        Shape.endFill();
    }

    onShapeClick(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const Shape = shapeMap.Shape.Graphic;

        Shape.beginFill(shapeMap.Shape.HoverBackColor, 1);
        Shape.lineStyle(shapeMap.Shape.HoverBorderSize, shapeMap.Shape.HoverBorderColor);
        Shape.drawRect(shapeMap.Shape.X, shapeMap.Shape.Y, shapeMap.Shape.Width, shapeMap.Shape.Height);
        Shape.endFill();
    }

    makeTableDesignRow(args) {
        this.currentIndex += 1;
        const actualWidth = args.Size.X - tableConfig.defaultBorderSize;
        const actualHeight = args.Size.Y - tableConfig.defaultBorderSize;
        const fontSize = args.FontSize || tableConfig.defaultFontSize;
        const fontFamily = args.FontFamily || tableConfig.defaultFontFamily;
        const fontThickness = args.FontThickness || tableConfig.defaultFontThickness;
        const fontWeight = args.FontWeight || tableConfig.defaultFontWeight;
        const borderSize = args.BorderSize || tableConfig.defaultBorderSize;
        const hoverBackColor = args.HoverBackColor || tableConfig.defaultHoverBackColor;
        const hoverBorderColor = args.HoverBorderColor || tableConfig.defaultHoverBorderColor;

        const shapeStr = args.Text || "";
        const textHoriz = (this.currentX + ((actualWidth + ((fontSize + fontThickness) / 2)) / 2))
        const textVerti = this.currentY + (actualHeight / 2)
        const textConfig = {
            fontWeight: fontWeight,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fill: args.TextColor,
            align: 'center',
            stroke: args.TextColor,
            strokeThickness: fontThickness
        }

        const Shape = new PIXI.Graphics();
        const shapeText = new PIXI.Text(shapeStr, textConfig);

        // Make Shape
        Shape.beginFill('0x' + args.BackColor.replace('#', ''), 1);
        Shape.lineStyle(borderSize, '0x' + args.Border.replace('#', ''));
        Shape.drawRect(this.currentX, this.currentY, actualWidth, actualHeight);
        Shape.endFill();

        // Make Text inside shape
        shapeText.anchor.set(0.5);
        shapeText.x = textHoriz;
        shapeText.y = textVerti;


        // Create Interactivity
        shapeText.interactive = true;
        shapeText.buttonMode = true;
        Shape.interactive = true;
        Shape.buttonMode = true;


        // Event Handlers
        Shape
            .on('pointerover', this.onShapeHoverIN.bind(this));
        shapeText
            .on('pointerover', this.onShapeHoverIN.bind(this));

        Shape
            .on('pointerout', this.onShapeHoverOUT.bind(this));
        shapeText
            .on('pointerout', this.onShapeHoverOUT.bind(this));

        this.pixiTableDesign.stage.addChild(Shape);
        this.pixiTableDesign.stage.addChild(shapeText);

        // This is required to map all shapes
        this.shapesMap[String(args.Text)] = {
            Shape: {
                Width: actualWidth,
                Height: actualHeight,
                X: this.currentX,
                Y: this.currentY,
                NormalBorderSize: borderSize,
                NormalBorderColor: '0x' + args.Border.replace('#', ''),
                NormalBackColor: '0x' + args.BackColor.replace('#', ''),
                HoverBorderSize: borderSize,
                HoverBackColor: '0x' + hoverBackColor.replace('#', ''),
                HoverBorderColor: '0x' + hoverBorderColor.replace('#', ''),
                Graphic: Shape
            },
            Text: {
                String: shapeStr,
                X: textHoriz,
                Y: textVerti,
                TextObj: shapeText,
            },
            Row: this.currentRow,
            Index: this.currentIndex
        }

        // This is required to access it on event handler
        Shape.shapeMap = this.shapesMap[String(args.Text)];
        shapeText.shapeMap = this.shapesMap[String(args.Text)];

        // Next X cord ->
        this.currentX += actualWidth;

        if (tableData['MaxPerRow'] == this.currentIndex) {
            this.pixiTableDesign.view.setAttribute('width', this.currentX + "px");
            this.pixiTableDesign.view.setAttribute('height', (this.currentY + (borderSize * tableData['MaxPerRow'])) + "px");
            this.currentRow += 1;
            this.currentY += actualHeight;
            this.currentX = 0;
            this.currentIndex = 0;
        }
    }

    buildTableDesign() {
        this.currentY = 0;
        this.currentX = 0;
        this.currentRow = 0;
        this.currentIndex = 0;
        this.shapesMap = {};

        Object.keys(tableData['Rows']).forEach((curRow, index) => {
            tableData['Rows'][curRow].map(this.makeTableDesignRow.bind(this))
        })
    }

    buildTable() {
        this.setChipValue(100);
        this.buildTableDesign();
        //this.buildTableText();
    }

    refreshTable() {
        this.buildTableDesign();
        //this.buildTableText();
    }

    makeCanvas(app, canvasId, canvasClassList) {
        app.view.setAttribute('id', canvasId)
        canvasClassList.map(className => app.view.classList.add(className))

        return app;
    }

    render() {
        return (
            <div id="App" className="App"></div>
        );
    }
}


export default App;
